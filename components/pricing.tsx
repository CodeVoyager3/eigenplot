import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Sparkles } from 'lucide-react'

export default function Pricing() {
    return (
        <section className="py-16 md:py-32 bg-background">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h2 className="text-center text-4xl font-semibold lg:text-5xl tracking-tight">
                        Power Your Research with <span className="text-primary">EigenPlot</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Choose the plan that fits your analytical needs. From student explorers to professional research labs, we provide the computational intelligence to visualize your discoveries.
                    </p>
                </div>

                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    {/* Student Plan */}
                    <Card className="flex flex-col border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                        <CardHeader>
                            <CardTitle className="font-medium">Student</CardTitle>
                            <span className="my-3 block text-4xl font-bold">$0</span>
                            <CardDescription className="text-sm">Free forever for personal use</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed border-border" />
                            <ul className="list-outside space-y-3 text-sm text-muted-foreground">
                                {[
                                    'Standard 2D/3D Graphing',
                                    '100 AI Semantic Prompts/mo',
                                    'Implicit Function Plotting',
                                    'Public Link Sharing',
                                    'Save up to 10 Projects'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/signup">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Researcher Plan */}
                    <Card className="relative flex flex-col border-primary shadow-2xl shadow-primary/10 bg-card z-10 scale-105 md:scale-105">
                        <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground ring-1 ring-inset ring-white/20">
                            <Sparkles className="mr-1 size-3" />
                            Recommended
                        </span>

                        <div className="flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="font-medium text-primary">Pro Researcher</CardTitle>
                                <div className="flex items-baseline gap-1 my-3">
                                    <span className="text-4xl font-bold">$12</span>
                                    <span className="text-muted-foreground text-sm">/ mo</span>
                                </div>
                                <CardDescription className="text-sm italic">Unlock the full intelligence layer</CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <hr className="border-dashed border-border" />
                                <ul className="list-outside space-y-3 text-sm text-foreground">
                                    {[
                                        'Unlimited AI Semantic Input',
                                        'Advanced Vision OCR Digitization',
                                        'Vector Field & ODE Analysis',
                                        'High-Precision WASM Engine',
                                        'Unlimited Project Storage',
                                        'Export to High-Res SVG/LaTeX',
                                        'Priority Computational Queue'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <Check className="size-3 text-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="mt-auto">
                                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                                    <Link href="/signup?plan=pro">Go Pro</Link>
                                </Button>
                            </CardFooter>
                        </div>
                    </Card>

                    {/* Lab/Enterprise Plan */}
                    <Card className="flex flex-col border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                        <CardHeader>
                            <CardTitle className="font-medium">Lab & Team</CardTitle>
                            <div className="flex items-baseline gap-1 my-3">
                                <span className="text-4xl font-bold">$39</span>
                                <span className="text-muted-foreground text-sm">/ mo</span>
                            </div>
                            <CardDescription className="text-sm">Up to 5 seats included</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <hr className="border-dashed border-border" />
                            <ul className="list-outside space-y-3 text-sm text-muted-foreground">
                                {[
                                    'Everything in Pro Researcher',
                                    'Shared Workspace & Folders',
                                    'Collaborative Graph Annotations',
                                    'Custom API Integration',
                                    'SSO & Admin Controls',
                                    'Dedicated Support Engineer'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <Check className="size-3 text-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/contact-sales">Contact Sales</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}