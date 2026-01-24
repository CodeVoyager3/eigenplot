import { cn } from '@/lib/utils'

export const Logo = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            viewBox="0 0 140 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('text-foreground h-8 w-auto', className)}>
            {/* Icon Part: Mathematical Grid + Plot Line */}
            <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
            <path
                d="M8 24L14 16L20 20L26 8"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="26" cy="8" r="2" fill={uniColor ? 'currentColor' : '#2BC8B7'} />
            
            {/* Text Part: EigenPlot */}
            <text
                x="40"
                y="22"
                fill="currentColor"
                style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 700,
                    fontSize: '20px',
                    letterSpacing: '-0.02em'
                }}>
                Eigen<tspan stopColor="url(#logo-gradient)" className="text-muted-foreground font-medium">Plot</tspan>
            </text>

            <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="2"
                    y1="8"
                    x2="28"
                    y2="24"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop offset="1" stopColor="#2BC8B7" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const LogoIcon = ({ className, uniColor }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-8', className)}>
            {/* Minimalist Grid Icon */}
            <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2" opacity="0.1"/>
            <path
                d="M8 24L14 16L20 20L26 8"
                stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
             <defs>
                <linearGradient
                    id="logo-gradient"
                    x1="2"
                    y1="8"
                    x2="28"
                    y2="24"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop offset="1" stopColor="#2BC8B7" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const LogoStroke = ({ className }: { className?: string }) => {
    return (
        <svg
            className={cn('size-7 w-auto', className)}
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* A Sine Wave / Mathematical Waveform for decorative use */}
            <path
                d="M0 20C10 5 15 5 25 20C35 35 40 35 50 20C60 5 65 5 75 20C85 35 90 35 100 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                fill="none"
            />
        </svg>
    )
}