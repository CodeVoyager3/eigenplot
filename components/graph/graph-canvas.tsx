'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useGraph } from '@/hooks/use-graph';
import * as math from 'mathjs';

export function GraphCanvas({ theme }: { theme?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { equations, viewport, pan, zoom } = useGraph();

    // Handle Resize
    const handleResize = useCallback(() => {
        if (!canvasRef.current || !containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Multiply by dpr for sharp rendering
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    // Coordinate Mapping
    const toPx = (x: number, y: number, width: number, height: number, vp: typeof viewport) => {
        const px = ((x - vp.xMin) / (vp.xMax - vp.xMin)) * width;
        const py = height - ((y - vp.yMin) / (vp.yMax - vp.yMin)) * height;
        return { px, py };
    };

    const toMath = (px: number, py: number, width: number, height: number, vp: typeof viewport) => {
        const x = vp.xMin + (px / width) * (vp.xMax - vp.xMin);
        const y = vp.yMin + ((height - py) / height) * (vp.yMax - vp.yMin);
        return { x, y };
    };

    // Math Evaluation
    const evaluateEquation = (ctx: CanvasRenderingContext2D, expr: string, color: string, width: number, height: number, vp: typeof viewport) => {
        let code: math.EvalFunction;
        let isImplicit = false;

        // 1. Determine if Implicit or Explicit
        // Heuristic: If it contains '=', it's implicit.
        if (expr.includes('=')) {
            isImplicit = true;
            const parts = expr.split('=');
            // f(x,y) = LHS - RHS
            // We need to parse both sides to handle them safely?
            // Actually mathjs compile strings are robust.
            // "lhs - (rhs)"
            try {
                code = math.compile(`(${parts[0]}) - (${parts[1]})`);
            } catch (e) {
                return; // Skip invalid
            }
        } else {
            // No equals. 
            // Check if 'y' is a variable in the expression node?
            // "x^2 + y^2" (implicit circle, usually = radius, but if just expression, maybe means z?)
            // If user types "x+y", we can't plot it as a line unless "=0".
            // Assumption: If no '=', assume explicit y = f(x).
            try {
                code = math.compile(expr);
            } catch (e) {
                return;
            }
        }

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        if (isImplicit) {
            // Implicit Plotting via Marching Squares
            // Dynamic Grid resolution for consistent visual quality regardless of zoom
            // Step every ~6 pixels
            const stepPx = 6;
            const resX = Math.ceil(width / stepPx);
            const resY = Math.ceil(height / stepPx);

            const dx = (vp.xMax - vp.xMin) / resX;
            const dy = (vp.yMax - vp.yMin) / resY;

            // Values grid
            const values: number[][] = [];
            for (let i = 0; i <= resX; i++) {
                values[i] = [];
                const x = vp.xMin + i * dx;
                for (let j = 0; j <= resY; j++) {
                    const y = vp.yMin + j * dy;
                    try {
                        const val = code.evaluate({ x, y });
                        values[i][j] = val;
                    } catch (e) {
                        values[i][j] = NaN;
                    }
                }
            }

            // Marching Squares Algorithm
            for (let i = 0; i < resX; i++) {
                for (let j = 0; j < resY; j++) {
                    const x = vp.xMin + i * dx;
                    const y = vp.yMin + j * dy;

                    const v00 = values[i][j];
                    const v10 = values[i + 1][j];
                    const v11 = values[i + 1][j + 1];
                    const v01 = values[i][j + 1];

                    // Determine "case" (binary mask of signs)
                    // sign(v) > 0 bit=1, else 0
                    if (isNaN(v00) || isNaN(v10) || isNaN(v11) || isNaN(v01)) continue;

                    let caseIdx = 0;
                    if (v00 > 0) caseIdx |= 1;
                    if (v10 > 0) caseIdx |= 2;
                    if (v11 > 0) caseIdx |= 4;
                    if (v01 > 0) caseIdx |= 8;

                    if (caseIdx === 0 || caseIdx === 15) continue; // All positive or all negative -> no line

                    // Interpolation helper
                    // Returns normalized offset 0..1 along the edge
                    const interp = (v1: number, v2: number) => {
                        // Protect against div by zero?
                        if (Math.abs(v2 - v1) < 1e-9) return 0.5;
                        return (0 - v1) / (v2 - v1);
                    }

                    // Vertices relative to grid cell (0..1)
                    // P0: Bottom edge (between v00 and v10). x = x + dx*t
                    // P1: Right edge (between v10 and v11). y = y + dy*t
                    // P2: Top edge (between v01 and v11). x = x + dx*t
                    // P3: Left edge (between v00 and v01). y = y + dy*t

                    const getP0 = () => ({ x: x + dx * interp(v00, v10), y: y });
                    const getP1 = () => ({ x: x + dx, y: y + dy * interp(v10, v11) });
                    const getP2 = () => ({ x: x + dx * interp(v01, v11), y: y + dy });
                    const getP3 = () => ({ x: x, y: y + dy * interp(v00, v01) });

                    const drawLine = (pA: { x: number, y: number }, pB: { x: number, y: number }) => {
                        const start = toPx(pA.x, pA.y, width, height, vp);
                        const end = toPx(pB.x, pB.y, width, height, vp);
                        ctx.moveTo(start.px, start.py);
                        ctx.lineTo(end.px, end.py);
                    };

                    // Lookup table for Lines
                    switch (caseIdx) {
                        case 1: drawLine(getP3(), getP0()); break;
                        case 2: drawLine(getP0(), getP1()); break;
                        case 3: drawLine(getP3(), getP1()); break;
                        case 4: drawLine(getP1(), getP2()); break;
                        case 5: drawLine(getP3(), getP2()); drawLine(getP0(), getP1()); break; // Saddle
                        case 6: drawLine(getP0(), getP2()); break;
                        case 7: drawLine(getP3(), getP2()); break;
                        case 8: drawLine(getP2(), getP3()); break;
                        case 9: drawLine(getP0(), getP2()); break;
                        case 10: drawLine(getP0(), getP3()); drawLine(getP1(), getP2()); break; // Saddle
                        case 11: drawLine(getP1(), getP2()); break;
                        case 12: drawLine(getP3(), getP1()); break;
                        case 13: drawLine(getP0(), getP1()); break;
                        case 14: drawLine(getP3(), getP0()); break;
                    }
                }
            }
            ctx.stroke();

        } else {
            // Explicit Plotting (y = f(x))
            // Optimized for performance

            let firstPoint = true;
            let lastPy = 0;
            const stepPixels = 2;
            const xRange = vp.xMax - vp.xMin;

            for (let px = 0; px <= width; px += stepPixels) {
                const x = vp.xMin + (px / width) * xRange;
                try {
                    const scope = { x };
                    const y = code.evaluate(scope);

                    if (typeof y === 'number' && isFinite(y)) {
                        const py = height - ((y - vp.yMin) / (vp.yMax - vp.yMin)) * height;

                        if (firstPoint) {
                            ctx.moveTo(px, py);
                            firstPoint = false;
                        } else {
                            // Discontinuity check: Don't connect if jump is absurdly large (asymptote)
                            // A jump larger than the entire canvas height usually indicates a discontinuity (e.g. 1/x, tan(x))
                            if (Math.abs(py - lastPy) > height) {
                                ctx.moveTo(px, py);
                            } else {
                                ctx.lineTo(px, py);
                            }
                        }
                        lastPy = py;
                    } else {
                        firstPoint = true; // Break line on NaN/Infinity
                    }
                } catch (e) {
                    firstPoint = true;
                }
            }
            ctx.stroke();
        }
    };

    // Draw Grid
    const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, vp: typeof viewport) => {
        const dpr = window.devicePixelRatio || 1;
        ctx.clearRect(0, 0, width, height);

        // Background style check from Globals? N/A using standard styling within canvas for now.
        // Using simple "grid" look.

        ctx.lineWidth = 1;

        // Determine grid step (power of 10 or 2,5,10)
        // Roughly grid line every 100px
        const zoomLevel = width / (vp.xMax - vp.xMin);
        const stepTargetPixels = 100 * dpr;
        const stepMath = stepTargetPixels / zoomLevel;

        // Find nice round number for stepMath
        // e.g. 0.1, 0.2, 0.5, 1, 2, 5, 10
        const magnitude = Math.pow(10, Math.floor(Math.log10(stepMath)));
        let niceStep = magnitude;
        if (stepMath / magnitude >= 2) niceStep = magnitude * 2;
        if (stepMath / magnitude >= 5) niceStep = magnitude * 5;

        // Draw Vertical Lines
        ctx.strokeStyle = '#E5E7EB'; // (Light mode: Gray-200 for "Major" grid lines)
        if (theme === 'dark') {
            ctx.strokeStyle = '#27272a'; // zinc-800 (Dark mode)
        }

        ctx.font = `${10 * dpr}px monospace`;
        ctx.fillStyle = '#9ca3af'; // zinc-400 (Softer text)
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        const startX = Math.floor(vp.xMin / niceStep) * niceStep;
        for (let x = startX; x <= vp.xMax; x += niceStep) {
            const { px } = toPx(x, 0, width, height, vp);
            ctx.beginPath();
            // Axis color?
            if (Math.abs(x) < 1e-10) {
                ctx.strokeStyle = '#374151'; // Gray-700 (Softer than black for Axes)
                if (theme === 'dark') {
                    ctx.strokeStyle = '#e2e8f0'; // bright for dark mode
                }
                ctx.lineWidth = 1.5; // Slightly finer
            } else {
                ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#E5E7EB';
                ctx.lineWidth = 1;
            }

            ctx.moveTo(px, 0);
            ctx.lineTo(px, height);
            ctx.stroke();

            // Label
            if (Math.abs(x) > 1e-10) {
                ctx.fillText(x.toLocaleString(), px, height - (20 * dpr));
            }
        }

        // Draw Horizontal Lines
        const startY = Math.floor(vp.yMin / niceStep) * niceStep;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let y = startY; y <= vp.yMax; y += niceStep) {
            const { py } = toPx(0, y, width, height, vp);
            ctx.beginPath();
            if (Math.abs(y) < 1e-10) {
                ctx.strokeStyle = '#374151'; // Gray-700
                if (theme === 'dark') {
                    ctx.strokeStyle = '#e2e8f0';
                }
                ctx.lineWidth = 1.5;
            } else {
                ctx.strokeStyle = theme === 'dark' ? '#27272a' : '#E5E7EB';
                ctx.lineWidth = 1;
            }

            ctx.moveTo(0, py);
            ctx.lineTo(width, py);
            ctx.stroke();

            // Label
            if (Math.abs(y) > 1e-10) {
                ctx.fillText(y.toLocaleString(), width - (10 * dpr), py);
            }
        }
    };

    // Main Render Loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const width = canvas.width;
            const height = canvas.height;

            drawGrid(ctx, width, height, viewport);

            equations.forEach(eq => {
                if (eq.visible) {
                    evaluateEquation(ctx, eq.expression, eq.color, width, height, viewport);
                }
            });

            // We actually don't need a constant loop if static, but inputs change it.
            // For smooth Pan/Zoom, we might need it. 
            // But standard React re-render involves prop changes (viewport change -> render).
            // So we can just rely on useEffect dependencies!
            // No requestAnimationFrame loop *needed* per se unless animating unrelated stuff.
            // However, if we want 60fps panning during a drag, standard React state update might be laggy?
            // State updates trigger this useEffect. That is fine for now.
        };

        render();

        // cleanup
        return () => {
            // cancelAnimationFrame(animationFrameId);
        };
    }, [equations, viewport, theme]); // Re-render when these change


    // Interactions
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const onMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;
        if (!canvasRef.current) return;

        const dxPx = e.clientX - lastMousePos.current.x;
        const dyPx = e.clientY - lastMousePos.current.y;

        // Convert Pixel Delta to Math Delta
        // Scale factor = (Math Range) / (Pixel Width)
        // But we need to be careful with resize scaling
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = (viewport.xMax - viewport.xMin) / rect.width;
        const scaleY = (viewport.yMax - viewport.yMin) / rect.height;

        // Pan expects math delta
        // Dragging RIGHT (dx > 0) means we want to move viewport LEFT (subtract dx)
        // Actually if I drag paper right, I see what's on the left.
        // So xMin decreases.
        pan(dxPx * scaleX, -dyPx * scaleY); // Y pixel axis is inverted relative to math (page up is -y pixels, but +y math)

        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
        isDragging.current = false;
    };

    const onWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        // Zoom
        const zoomIntensity = 0.1;
        const factor = e.deltaY > 0 ? 1 + zoomIntensity : 1 - zoomIntensity; // Scroll DOWN (pos) -> Zoom OUT (factor > 1)

        // Zoom toward cursor
        // Warning: Standard wheel events might bubble document scroll if not careful.
        // Wrapper needs overflow hidden.

        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // To Math
        const { x, y } = toMath(mouseX, mouseY, rect.width, rect.height, viewport);

        zoom(factor, x, y);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full cursor-move"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
