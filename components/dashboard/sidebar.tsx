'use client';

import {
    Calculator,
    Folder,
    Sparkles,
    Database,
    Settings,
    Camera,
    ScanLine,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, ClerkLoading } from "@clerk/nextjs";

interface SidebarProps {
    activeProject?: string;
}

export function Sidebar({ activeProject }: SidebarProps) {
    return (
        <aside className="w-20 md:w-64 flex flex-col border-r border-border bg-card/50 backdrop-blur-md relative z-10 transition-all duration-300">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3v18h18" />
                            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                        </svg>
                    </div>
                    <span className="hidden md:block font-bold text-lg tracking-tight">
                        Eigen<span className="text-primary">Plot</span>
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                <NavItem icon={Calculator} label="Calculator" href="/calculator" active={activeProject === 'calculator'} />
                <NavItem icon={Folder} label="Projects" href="/dashboard" active={!activeProject || activeProject !== 'calculator'} />
                <NavItem icon={Sparkles} label="AI Tools" href="#" />
                <NavItem icon={Database} label="Datasets" href="#" />
                <NavItem icon={Settings} label="Settings" href="/dashboard/settings" />
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 space-y-3">
                <Button className="w-full justify-start gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 border border-indigo-500/20 text-indigo-400 hover:text-indigo-300">
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden md:inline">New AI Prompt</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 border-dashed">
                    <ScanLine className="h-4 w-4" />
                    <span className="hidden md:inline">Scan with OCR</span>
                </Button>
            </div>

            <Separator className="bg-border/50" />

            {/* User Profile */}
            <div className="p-4">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                    <SignedIn>
                        <UserButton
                            showName
                            appearance={{
                                elements: {
                                    userButtonBox: "flex-row-reverse",
                                    userButtonOuterIdentifier: "font-medium text-sm text-foreground",
                                }
                            }}
                        />
                    </SignedIn>
                    {/* Fallback for loading state or signed out if somehow visible */}
                    <ClerkLoading>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                        </div>
                    </ClerkLoading>
                </div>
            </div>
        </aside>
    );
}

import Link from 'next/link';

function NavItem({ icon: Icon, label, active = false, href = '#' }: { icon: any, label: string, active?: boolean, href?: string }) {
    const content = (
        <>
            <Icon className={`h-5 w-5 ${!active && 'group-hover:scale-110 transition-transform'}`} />
            <span className="hidden md:block ml-3 text-sm font-medium">
                {label}
            </span>
        </>
    );

    const baseClasses = "w-full flex items-center justify-center md:justify-start p-3 rounded-xl transition-all duration-200 group relative overflow-hidden";
    const activeClasses = "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20";
    const inactiveClasses = "text-muted-foreground hover:bg-muted hover:text-foreground";

    const className = `${baseClasses} ${active ? activeClasses : inactiveClasses}`;

    return (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}
