import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BrainCircuit, LineChart, Binary, SquareFunction, Share2, MousePointer2 } from 'lucide-react'
import { ReactNode } from 'react'

export default function Features() {
    return (
        <section id="features" className="py-16 md:py-32">
            <div className="@container mx-auto max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl tracking-tight">
                        Built for Modern Mathematics
                    </h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        EigenPlot goes beyond standard calculators by combining a high-performance math engine 
                        with intuitive AI tools to help you visualize complex concepts instantly.
                    </p>
                </div>
                
                {/* Feature Grid */}
                <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
                    
                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <BrainCircuit className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">AI Semantic Input</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Describe complex functions in natural language. Type "show a decaying sine wave" and let our engine handle the LaTeX conversion.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Binary className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">Implicit Plotting</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Handle complex relations like x² + y² = r² with ease. Our Marching Squares algorithm renders implicit shapes with pixel perfection.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <LineChart className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">Real-time Analysis</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Instant intersection finding, root detection, and area calculation. Move sliders and watch the calculus update at 60fps.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <Share2 className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">Universal Sharing</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Pack your entire graph state into a single compressed URL. No database required for light sharing—just copy and send.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <SquareFunction className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">Vector Fields</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Visualize direction fields and differential equations. Perfect for physics students and engineering researchers.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="group border-0 bg-transparent shadow-none">
                        <CardHeader className="pb-3">
                            <CardDecorator>
                                <MousePointer2 className="size-6" aria-hidden />
                            </CardDecorator>
                            <h3 className="mt-6 font-semibold">Precision Controls</h3>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Snap-to-grid, coordinate locking, and LaTeX-enabled labels ensure your graphs are ready for publication.
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[18px_18px] dark:opacity-50"
        />

        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t shadow-sm">
            {children}
        </div>
    </div>
)