'use client';

import { ReactNode } from 'react';

interface DashboardShellProps {
    children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
            {children}
        </div>
    );
}
