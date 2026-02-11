'use client';

import { Share2, Download, Bell, Plus, Minus, Home, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GraphCanvas } from "@/components/graph/graph-canvas";

export function VisualizationPane() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background/95 relative">
            {/* Top Bar Area (Right Side) */}
            <div className="h-16 border-b border-border/40 flex items-center justify-end px-6 gap-3">
                <Button variant="outline" size="sm" className="h-9 gap-2 bg-background/50 hover:bg-muted/50 transition-colors">
                    <Share2 className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Share</span>
                </Button>
                <Button variant="outline" size="sm" className="h-9 gap-2 bg-background/50 hover:bg-muted/50 transition-colors">
                    <Download className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Export</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                </Button>
            </div>

            {/* Main Graph Area */}
            <div className="flex-1 p-6 overflow-hidden">
                <div className="h-full w-full rounded-3xl border border-border/50 bg-card/30 flex flex-col relative shadow-inner overflow-hidden">

                    {/* Graph Header overlay */}
                    <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-start pointer-events-none">
                        <span className="text-sm font-medium text-foreground/80 bg-background/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
                            Graph View
                        </span>
                    </div>

                    {/* Canvas Container */}
                    <div className="flex-1 relative">
                        <GraphCanvas />

                        {/* Right Side Controls */}
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                            <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-1.5 flex flex-col gap-1 shadow-lg">
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <div className="h-px w-full bg-border/50 my-0.5"></div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                                    <Home className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Bottom Right Controls */}
                        <div className="absolute right-6 bottom-6 flex flex-col gap-2">
                            <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-1.5 shadow-lg">
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary">
                                    <Settings className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
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
