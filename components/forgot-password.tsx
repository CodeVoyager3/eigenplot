'use client';

import { LogoIcon } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
    const { isLoaded, signIn, setActive } = useSignIn()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')
    const [isPending, setIsPending] = useState(false)
    const router = useRouter()

    const create = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        setIsPending(true)
        setError('')

        try {
            await signIn?.create({
                strategy: 'reset_password_email_code',
                identifier: email,
            })
            setSuccessfulCreation(true)
        } catch (err: any) {
            console.error('error', err.errors[0].longMessage)
            setError(err.errors[0].longMessage)
        } finally {
            setIsPending(false)
        }
    }

    const reset = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!isLoaded) return

        setIsPending(true)
        setError('')

        try {
            const result = await signIn?.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })

            if (result.status === 'complete') {
                await setActive({ session: result.createdSessionId })
                setComplete(true)
                setTimeout(() => {
                    router.push('/dashboard')
                }, 2000)
            } else {
                console.log(result)
                setError('Failed to reset password.')
            }
        } catch (err: any) {
            console.error('error', err.errors[0].longMessage)
            setError(err.errors[0].longMessage)
        } finally {
            setIsPending(false)
        }
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={!successfulCreation ? create : reset}
                className="bg-muted m-auto h-fit w-full max-w-sm overflow-hidden rounded-[calc(var(--radius)+.125rem)] border shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="bg-card -m-px rounded-[calc(var(--radius)+.125rem)] border p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mx-auto block w-fit">
                            <LogoIcon />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Recover Password</h1>
                        <p className="text-sm">
                            {!successfulCreation
                                ? "Enter your email to receive a reset link"
                                : "Enter the code and your new password"}
                        </p>
                    </div>

                    <div className="mt-6 space-y-6">
                        {!successfulCreation ? (
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
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="code" className="block text-sm">Code</Label>
                                    <Input
                                        type="text"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="123456"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="block text-sm">New Password</Label>
                                    <Input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}
                        {complete && (
                            <p className="text-green-500 text-sm">Password reset successfully! Redirecting...</p>
                        )}

                        <Button className="w-full" disabled={isPending}>
                            {isPending
                                ? 'Processing...'
                                : !successfulCreation
                                    ? 'Send Reset Code'
                                    : 'Reset Password'}
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        {!successfulCreation ? (
                            <p className="text-muted-foreground text-sm">We'll send you a code to reset your password.</p>
                        ) : null}
                    </div>
                </div>

                <div className="p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Remembered your password?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/login">Log in</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}
