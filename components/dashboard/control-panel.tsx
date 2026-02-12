'use client';

import { useRef } from 'react';
import { Calculator, ChevronRight, Settings, Plus, Sparkles, Trash2 } from 'lucide-react'; // Removing unused icons
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Assuming we have this or use a custom one
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useGraph } from '@/hooks/use-graph';

export function ControlPanel() {
    const { equations, addEquation, removeEquation, updateEquation, updateEquationColor, toggleVisibility } = useGraph();
    const inputRef = useRef<HTMLInputElement>(null);

    const COLORS = [
        '#2563eb', // blue-600
        '#dc2626', // red-600
        '#16a34a', // green-600
        '#9333ea', // purple-600
        '#ea580c', // orange-600
        '#0891b2', // cyan-600
    ];

    const cycleColor = (id: string, currentColor: string) => {
        const currentIndex = COLORS.indexOf(currentColor);
        const nextIndex = (currentIndex + 1) % COLORS.length;
        updateEquationColor(id, COLORS[nextIndex]);
    };

    const handleAIPrompt = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            // TODO: Implement AI Prompt Logic here
            console.log("AI Prompt:", inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAIPrompt();
        }
    };

    return (
        <aside className="w-96 md:w-[28rem] dark:border-border bg-transparent dark:bg-black/20 h-full flex flex-col relative z-20 ml-24">
            {/* Header */}
            <div className="p-6 pb-2">
                <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-foreground text-center">
                    Expressions
                </h2>
            </div>

            <div className="flex-1 flex flex-col px-4 pb-4 gap-4 overflow-hidden min-h-0">

                {/* AI Input */}
                <div className="relative group mt-2">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur-sm"></div>
                    <div className="relative bg-white dark:bg-card rounded-xl p-1 flex items-center shadow-sm border border-blue-100 dark:border-white/5">
                        <div className="pl-3 pr-2 text-blue-500">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder="Ask EigenPlot to plot something..."
                            className="flex-1 bg-transparent border-none h-10 text-sm focus:outline-none placeholder:text-gray-400 dark:placeholder:text-muted-foreground/70 text-gray-900 dark:text-foreground"
                        />
                    </div>
                </div>

                {/* Equation List */}
                <div className="flex-1 mt-2 -mx-4 px-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="space-y-4 pb-20">
                        {equations.map((eq, index) => (
                            <div key={eq.id} className="group relative bg-white dark:bg-muted/30 hover:shadow-md transition-all rounded-xl p-4 border border-gray-200 dark:border-white/10 flex items-center gap-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/10">
                                <span className="text-sm font-medium text-gray-400 dark:text-muted-foreground w-4 text-right">
                                    {index + 1}.
                                </span>

                                <input
                                    type="text"
                                    value={eq.expression}
                                    onChange={(e) => updateEquation(eq.id, e.target.value)}
                                    placeholder="Enter expression..."
                                    className="flex-1 min-w-0 bg-transparent border-none text-sm font-mono focus:outline-none text-gray-900 dark:text-foreground placeholder:text-gray-300 dark:placeholder:text-muted-foreground/30"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            addEquation('');
                                        }
                                        if (e.key === 'Backspace' && eq.expression === '') {
                                            removeEquation(eq.id);
                                        }
                                    }}
                                />

                                <div className="flex items-center gap-2">
                                    {/* Color Indicator (Click to cycle) */}
                                    <div
                                        className="h-5 w-5 rounded-md border border-gray-100 dark:border-white/10 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                                        style={{ backgroundColor: eq.color }}
                                        onClick={() => cycleColor(eq.id, eq.color)}
                                    ></div>

                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={() => toggleVisibility(eq.id)}
                                        className={`w-10 h-6 rounded-full p-1 transition-colors relative ${eq.visible ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-slate-600'}`}
                                    >
                                        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${eq.visible ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => removeEquation(eq.id)}
                                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Small Plus Button at the end */}
                        <div className="flex justify-center pt-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full hover:bg-blue-50 dark:hover:bg-primary/20 text-gray-400 dark:text-muted-foreground hover:text-blue-600 dark:hover:text-primary transition-colors cursor-pointer"
                                            onClick={() => addEquation('')}
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Add expression</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
