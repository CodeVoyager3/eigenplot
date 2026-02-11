'use client';

import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSignUp, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const { isSignedIn } = useAuth()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.push('/dashboard')
        }
    }, [isLoaded, isSignedIn, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        setIsPending(true)
        setError('')

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setPendingVerification(true)
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors?.[0]?.message || 'Error creating account')
        } finally {
            setIsPending(false)
        }
    }

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        setIsPending(true)
        setError('')

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId })
                router.push('/dashboard')
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
                setError('Verification failed.')
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2))
            setError(err.errors?.[0]?.message || 'Invalid verification code')
        } finally {
            setIsPending(false)
        }
    }

    const handleOAuth = (strategy: 'oauth_google' | 'oauth_microsoft') => {
        if (!isLoaded) return
        signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/dashboard',
        })
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            {pendingVerification ? (
                <form
                    onSubmit={handleVerify}
                    className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                    <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                        <div className="text-center">
                            <LogoIcon className="mx-auto" />
                            <h1 className="mb-1 mt-4 text-xl font-semibold">Verify Email</h1>
                            <p className="text-sm">Enter the code sent to {email}</p>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="code"
                                    className="block text-sm">
                                    Verification Code
                                </Label>
                                <Input
                                    type="text"
                                    required
                                    name="code"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="123456"
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <Button className="w-full" disabled={isPending}>
                                {isPending ? 'Verifying...' : 'Verify Email'}
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                    <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                        <div className="text-center">
                            <Link
                                href="/"
                                aria-label="go home"
                                className="mx-auto block w-fit">
                                <LogoIcon />
                            </Link>
                            <h1 className="mb-1 mt-4 text-xl font-semibold">Sign Up for EigenPlot</h1>
                            <p className="text-sm">Welcome! Sign up to get started</p>
                        </div>

                        <div className="mt-6 space-y-6">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="firstname"
                                        className="block text-sm">
                                        Firstname
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        name="firstname"
                                        id="firstname"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="lastname"
                                        className="block text-sm">
                                        Lastname
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        name="lastname"
                                        id="lastname"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="block text-sm">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    required
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="pwd"
                                        className="text-sm">
                                        Password
                                    </Label>
                                </div>
                                <Input
                                    type="password"
                                    required
                                    name="pwd"
                                    id="pwd"
                                    className="input sz-md variant-mixed"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}

                            <Button className="w-full" disabled={isPending || !isLoaded}>
                                {isPending ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </div>

                        <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                            <hr className="border-dashed" />
                            <span className="text-muted-foreground text-xs">Or continue With</span>
                            <hr className="border-dashed" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOAuth('oauth_google')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="0.98em"
                                    height="1em"
                                    viewBox="0 0 256 262">
                                    <path
                                        fill="#4285f4"
                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                    <path
                                        fill="#34a853"
                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                    <path
                                        fill="#fbbc05"
                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                    <path
                                        fill="#eb4335"
                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                </svg>
                                <span>Google</span>
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleOAuth('oauth_microsoft')}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 256 256">
                                    <path
                                        fill="#f1511b"
                                        d="M121.666 121.666H0V0h121.666z"></path>
                                    <path
                                        fill="#80cc28"
                                        d="M256 121.666H134.335V0H256z"></path>
                                    <path
                                        fill="#00adef"
                                        d="M121.663 256.002H0V134.336h121.663z"></path>
                                    <path
                                        fill="#fbbc09"
                                        d="M256 256.002H134.335V134.336H256z"></path>
                                </svg>
                                <span>Microsoft</span>
                            </Button>
                        </div>
                    </div>

                    <div className="p-3">
                        <p className="text-accent-foreground text-center text-sm">
                            Already have an account ?
                            <Button
                                asChild
                                variant="link"
                                className="px-2">
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </p>
                    </div>
                </form>
            )}
        </section>
    )
}
