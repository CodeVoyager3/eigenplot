'use server'

// import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

export async function addEquationAction(projectId: string, expression: string, color: string) {
    const { userId } = await auth()

    if (!userId) return { error: 'Unauthorized' }

    try {
        // TODO: Implement call to external Java API
        const data = {
            id: 'mock-id',
            projectId,
            expression,
            color,
            visible: true
        }
        return { data }
    } catch (e: any) {
        return { error: e.message }
    }
}

export async function removeEquationAction(equationId: string) {
    // Note: We should ideally verify user owns the project containing this equation, 
    // but without projectId passed here, we'd need to fetch equation first.
    // Let's assume fetching it to check auth.
    const { userId } = await auth()
    if (!userId) return { error: 'Unauthorized' }

    try {
        // TODO: Implement call to external Java API
        console.log('Removing equation:', equationId)
        return { success: true }
    } catch (e: any) {
        return { error: e.message }
    }
}

export async function toggleVisibilityAction(equationId: string, visible: boolean) {
    const { userId } = await auth()
    if (!userId) return { error: 'Unauthorized' }

    try {
        // TODO: Implement call to external Java API
        console.log('Toggling visibility for:', equationId, 'to:', visible)
        return { success: true }
    } catch (e: any) {
        return { error: e.message }
    }
}
