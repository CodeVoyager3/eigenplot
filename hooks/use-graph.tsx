'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface Equation {
    id: string;
    expression: string;
    color: string;
    visible: boolean;
}

export interface Viewport {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

interface GraphContextType {
    equations: Equation[];
    viewport: Viewport;
    addEquation: (expression: string) => void;
    removeEquation: (id: string) => void;
    updateEquation: (id: string, expression: string) => void;
    updateEquationColor: (id: string, color: string) => void;
    toggleVisibility: (id: string) => void;
    setViewport: (viewport: Viewport) => void;
    pan: (dx: number, dy: number) => void;
    zoom: (factor: number, centerX?: number, centerY?: number) => void; // Center in math coordinates
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

const DEFAULT_VIEWPORT: Viewport = {
    xMin: -10,
    xMax: 10,
    yMin: -10,
    yMax: 10,
};

const COLORS = [
    '#2563eb', // blue-600 (Primary)
    '#dc2626', // red-600
    '#16a34a', // green-600
    '#9333ea', // purple-600
    '#ea580c', // orange-600
    '#0891b2', // cyan-600
];

import { addEquationAction, removeEquationAction, toggleVisibilityAction } from '@/app/dashboard/[projectId]/actions';

export function GraphProvider({ children, initialEquations = [], projectId }: { children: ReactNode, initialEquations?: Equation[], projectId?: string }) {
    const defaultState: Equation[] = [];

    const [equations, setEquations] = useState<Equation[]>(initialEquations.length > 0 || projectId ? initialEquations : defaultState);

    const [viewport, setViewportState] = useState<Viewport>(DEFAULT_VIEWPORT);

    const addEquation = useCallback(async (expression: string) => {
        const tempId = Math.random().toString(36).substr(2, 9);
        const color = COLORS[equations.length % COLORS.length];
        const newEq: Equation = {
            id: tempId,
            expression,
            color,
            visible: true,
        };

        setEquations(prev => [...prev, newEq]);

        if (projectId) {
            const { data, error } = await addEquationAction(projectId, expression, color);
            if (error) {
                console.error("Failed to save equation:", error);
                setEquations(prev => prev.filter(eq => eq.id !== tempId));
            } else if (data) {
                setEquations(prev => prev.map(eq => eq.id === tempId ? { ...eq, id: data.id } : eq));
            }
        }
    }, [equations.length, projectId]);

    const removeEquation = useCallback(async (id: string) => {
        setEquations(prev => prev.filter(eq => eq.id !== id));
        if (projectId) {
            await removeEquationAction(id);
        }
    }, [projectId]);

    const toggleVisibility = useCallback(async (id: string) => {
        const eq = equations.find(e => e.id === id);
        if (!eq) return;

        const newVisible = !eq.visible;
        setEquations(prev => prev.map(e => e.id === id ? { ...e, visible: newVisible } : e));

        if (projectId) {
            await toggleVisibilityAction(id, newVisible);
        }
    }, [equations, projectId]);

    const setViewport = useCallback((newViewport: Viewport) => {
        setViewportState(newViewport);
    }, []);

    const pan = useCallback((dx: number, dy: number) => {
        setViewportState(prev => ({
            xMin: prev.xMin - dx,
            xMax: prev.xMax - dx,
            yMin: prev.yMin - dy,
            yMax: prev.yMax - dy,
        }));
    }, []);

    const zoom = useCallback((factor: number, centerX?: number, centerY?: number) => {
        setViewportState(prev => {
            // Zoom Limits
            const MIN_ZOOM_RANGE = 1e-12;
            const MAX_ZOOM_RANGE = 1e12;

            const currentWidth = prev.xMax - prev.xMin;
            const currentHeight = prev.yMax - prev.yMin;

            // Check what the new width would be
            let effectiveFactor = factor;
            const projectedWidth = currentWidth * factor;

            // Clamp factor if limits exceeded
            if (projectedWidth < MIN_ZOOM_RANGE) {
                effectiveFactor = MIN_ZOOM_RANGE / currentWidth;
            } else if (projectedWidth > MAX_ZOOM_RANGE) {
                effectiveFactor = MAX_ZOOM_RANGE / currentWidth;
            }

            // If no center provided, zoom around the center of the viewport
            const cx = centerX ?? (prev.xMin + prev.xMax) / 2;
            const cy = centerY ?? (prev.yMin + prev.yMax) / 2;

            return {
                xMin: cx - (cx - prev.xMin) * effectiveFactor,
                xMax: cx + (prev.xMax - cx) * effectiveFactor,
                yMin: cy - (cy - prev.yMin) * effectiveFactor,
                yMax: cy + (prev.yMax - cy) * effectiveFactor,
            };
        });
    }, []);

    const updateEquation = useCallback((id: string, expression: string) => {
        setEquations(prev => prev.map(eq => eq.id === id ? { ...eq, expression } : eq));
    }, []);

    const updateEquationColor = useCallback((id: string, color: string) => {
        setEquations(prev => prev.map(eq => eq.id === id ? { ...eq, color } : eq));
    }, []);

    return (
        <GraphContext.Provider value={{
            equations,
            viewport,
            addEquation,
            removeEquation,
            updateEquation,
            updateEquationColor,
            toggleVisibility,
            setViewport,
            pan,
            zoom
        }}>
            {children}
        </GraphContext.Provider>
    );
}

export function useGraph() {
    const context = useContext(GraphContext);
    if (context === undefined) {
        throw new Error('useGraph must be used within a GraphProvider');
    }
    return context;
}
