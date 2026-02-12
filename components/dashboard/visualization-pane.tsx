'use client';

import { Share2, Download, Plus, Minus, Home, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GraphCanvas } from "@/components/graph/graph-canvas";
import { useTheme } from "next-themes";

import { useGraph } from '@/hooks/use-graph';

export function VisualizationPane() {
    const { setTheme, theme } = useTheme();
    const { zoom, setViewport } = useGraph();

    const handleZoomIn = () => zoom(0.8);
    const handleZoomOut = () => zoom(1.25);
    const handleReset = () => setViewport({ xMin: -10, xMax: 10, yMin: -10, yMax: 10 });

    return (
        <div className="flex-1 flex flex-col h-full bg-[#F9FAFB] dark:bg-background relative">
            {/* Top Bar Area (Right Side) */}
            <div className="h-16 flex items-center justify-end px-6 gap-3">
                <Button variant="outline" size="sm" className="h-9 gap-2 bg-white dark:bg-background border-gray-200 dark:border-border shadow-xs hover:shadow-md transition-all text-gray-600 dark:text-gray-300">
                    <Share2 className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Share</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-2 bg-white dark:bg-background border-gray-200 dark:border-border shadow-xs hover:shadow-md transition-all text-gray-600 dark:text-gray-300">
                    <Download className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Export</span>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 bg-white dark:bg-background border-gray-200 dark:border-border shadow-xs hover:shadow-md transition-all text-gray-600 dark:text-gray-300"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 p-6 pt-0 overflow-hidden">
                <div className="h-full w-full rounded-[2rem] border border-gray-200 dark:border-border/50 bg-white dark:bg-card/20 flex flex-col relative shadow-[0_2px_16px_rgba(0,0,0,0.04)] dark:shadow-inner overflow-hidden">

                    {/* Graph Header overlay */}
                    <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
                        <span className="text-sm font-medium text-gray-500 dark:text-foreground/80 bg-white/50 dark:bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
                            Graph View
                        </span>
                    </div>

                    {/* Canvas Container */}
                    <div className="flex-1 relative">
                        <GraphCanvas theme={theme} />

                        {/* Right Side Controls */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                            <div className="bg-white/90 dark:bg-card/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-xl p-1 flex flex-col gap-1 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-primary/10 dark:text-gray-400 dark:hover:text-primary transition-colors cursor-pointer"
                                    onClick={handleZoomIn}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-primary/10 dark:text-gray-400 dark:hover:text-primary transition-colors cursor-pointer"
                                    onClick={handleZoomOut}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <div className="h-px w-full bg-gray-100 dark:bg-white/10 my-0.5"></div>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-8 w-8 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-primary/10 dark:text-gray-400 dark:hover:text-primary transition-colors cursor-pointer"
                                    onClick={handleReset}
                                >
                                    <Home className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Bottom Right Controls - MOVED/REMOVED Settings */}
                        {/* Previously Settings was here. User asked to remove it. */}
                        {/* Leaving empty container or removing entirely if no other controls. */}
                        {/* The user only asked to "remove setting icon", so I will remove the entire block as it only contained the settings button. */}

                    </div>

                    {/* Watermark/Note */}
                    <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none opacity-50">
                        <span className="text-[10px] text-muted-foreground font-handwriting">
                            High-performance WASM rendering canvas
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
