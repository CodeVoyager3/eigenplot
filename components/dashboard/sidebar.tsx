'use client';

import {
    Calculator,
    Folder,
} from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { SignedIn, UserButton, ClerkLoading } from "@clerk/nextjs";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, LogoIcon } from '@/components/logo';

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-50 h-[calc(100vh-2rem)] w-20 hover:w-64 m-4 flex flex-col bg-white dark:bg-card/50 backdrop-blur-md rounded-[2rem] border-r border-gray-200 dark:border-border transition-all duration-300 group overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.04)] dark:shadow-2xl">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center group-hover:justify-start group-hover:px-6 transition-all duration-300 border-b border-border/50">
                <Link href="/" className="flex items-center gap-3 w-full cursor-pointer justify-center group-hover:justify-start">
                    <div className="flex items-center justify-center shrink-0 w-10 h-10 group-hover:hidden">
                        <LogoIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="hidden group-hover:block">
                        <Logo className="h-8 w-auto" uniColor={true} />
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-2 flex flex-col items-center group-hover:items-stretch transition-all duration-300">
                <NavItem icon={Folder} label="Projects" href="/dashboard" active={pathname === '/dashboard'} />
                <NavItem icon={Calculator} label="Calculator" href="/calculator" active={pathname === '/calculator'} />
            </nav>

            <Separator className="bg-border/50" />

            {/* User Profile */}
            <div className="p-4 flex justify-center group-hover:justify-start">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-muted/50 transition-colors cursor-pointer overflow-hidden whitespace-nowrap">
                    <SignedIn>
                        <UserButton
                            showName={false}
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-9 w-9", // Slightly smaller
                                }
                            }}
                        />
                    </SignedIn>
                    {/* Fallback for loading state */}
                    <ClerkLoading>
                        <div className="h-9 w-9 rounded-full bg-muted animate-pulse shrink-0" />
                    </ClerkLoading>

                    <div className="hidden group-hover:flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-medium text-sm text-gray-700 dark:text-foreground">Account</span>
                        <span className="text-xs text-muted-foreground">Manage settings</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ icon: Icon, label, active = false, href = '#' }: { icon: any, label: string, active?: boolean, href?: string }) {
    return (
        <Link
            href={href}
            className={`
                relative flex items-center h-10 rounded-xl transition-all duration-200 group/item overflow-hidden
                ${active
                    ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/20"
                    : "text-gray-500 dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted/80 hover:text-gray-900 dark:hover:text-foreground"
                }
                w-10 justify-center group-hover:w-full group-hover:justify-start group-hover:px-4 mx-auto
            `}
        >
            <Icon className={`h-5 w-5 shrink-0 ${!active && 'group-hover/item:scale-105 transition-transform'}`} />

            <span className={`
                absolute left-12 opacity-0 group-hover:opacity-100 group-hover:static group-hover:ml-3 
                transition-all duration-300 text-sm font-medium whitespace-nowrap
            `}>
                {label}
            </span>
        </Link>
    );
}
