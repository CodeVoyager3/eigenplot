'use client';

import { useRef } from 'react';
import { Sparkles, Plus, Eye, EyeOff } from 'lucide-react'; // Removing unused icons
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch"; // Assuming we have this or use a custom one
import { useGraph } from '@/hooks/use-graph';

export function ControlPanel() {
    const { equations, addEquation, removeEquation, toggleVisibility } = useGraph();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            addEquation(inputRef.current.value);
            inputRef.current.value = '';
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <aside className="w-80 md:w-96 border-r border-border bg-card/60 backdrop-blur-xl h-full flex flex-col relative z-20 shadow-2xl">
            {/* Header */}
            <div className="p-6 pb-2">
                <h2 className="text-lg font-semibold tracking-tight text-foreground/90">
                    Expressions & AI
                </h2>
            </div>

            <div className="flex-1 flex flex-col px-4 pb-4 gap-4 overflow-hidden">

                {/* AI Input */}
                <div className="relative group mt-2">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl opacity-75 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                    <div className="relative bg-card rounded-xl p-1 flex items-center">
                        <div className="pl-3 pr-2 text-primary">
                            <Sparkles className="h-4 w-4" />
                        </div>
                        <input
                            ref={inputRef}
                            onKeyDown={handleKeyDown}
                            type="text"
                            placeholder="Ask EigenPlot to plot something..."
                            className="flex-1 bg-transparent border-none h-10 text-sm focus:outline-none placeholder:text-muted-foreground/70"
                        />
                    </div>
                </div>

                {/* Equation List */}
                <ScrollArea className="flex-1 -mx-2 px-2 mt-2">
                    <div className="space-y-3 pb-20">
                        {equations.map((eq, index) => (
                            <div key={eq.id} className="group relative bg-muted/30 hover:bg-muted/50 transition-colors rounded-xl p-3 border border-border/50 flex items-center gap-3">
                                <span className="text-sm font-medium text-muted-foreground w-4 text-right">
                                    {index + 1}.
                                </span>

                                <div className="flex-1 font-mono text-sm text-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                    {eq.expression}
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Color Indicator */}
                                    {/* In a real app this would be a color picker */}
                                    <div
                                        className="h-5 w-5 rounded-md border border-white/10 shadow-sm cursor-pointer hover:scale-110 transition-transform"
                                        style={{ backgroundColor: eq.color }}
                                    ></div>

                                    {/* Visibility Toggle */}
                                    <button
                                        onClick={() => toggleVisibility(eq.id)}
                                        className={`w-10 h-6 rounded-full p-1 transition-colors relative ${eq.visible ? 'bg-emerald-500' : 'bg-slate-600'}`}
                                    >
                                        <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${eq.visible ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Math Expression Input (Hidden visuals, acts as the + button target effectively if we wanted) 
                             For now, let's keep the manual input separate or reuse the AI input as a dual input?
                             The image shows a + button at the bottom. 
                             Let's assume the user might want a manual input entry. 
                             I'll add a 'New Expression' placeholder item or just the input at the bottom? 
                             Actually, let's make the + button focus an invisible input or show a dialog. 
                             For simplicity/demo, I'll add a simple input field at the bottom of the list or 
                             just assume the top input works for both for now (as "Ask...").
                             BUT, the prompt implies "Type '{ activeProject: string; }'...".
                             The current code I'm replacing had a math input.
                             I'll add the math input functionality back into the "AI Input" for now, or add a secondary input?
                             Image has "AI Input handles natural language" AND "1. y=sin(x)...".
                             I'll wire the "Ask EigenPlot" input to `handleSubmit` so it works.
                        */}
                    </div>
                </ScrollArea>

                {/* Floating Add Button */}
                <div className="absolute bottom-6 right-6 z-30">
                    <Button
                        size="icon"
                        className="h-12 w-12 rounded-2xl bg-card border border-border/50 shadow-xl hover:bg-muted transition-all hover:scale-105 active:scale-95"
                        onClick={() => {
                            if (inputRef.current) inputRef.current.focus();
                        }}
                    >
                        <Plus className="h-6 w-6 text-foreground" />
                    </Button>
                </div>

                {/* Hidden input for the functionality if we want to separate it, 
                    but I'll put the ref on the main input above and use it for math too for this demo.
                    Wait, the main input above is "Ask EigenPlot".
                    I will update that input to use the ref and handle keydown.
                 */}
            </div>

            {/* We need to re-attach the ref to the input I rendered above. 
                 I'll correct the input implementation in the content string below.
             */}
        </aside>
    );
}
