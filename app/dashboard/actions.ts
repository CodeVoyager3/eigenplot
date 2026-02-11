'use server'

// import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export async function createProject(formData: FormData) {
    const name = formData.get('name') as string

    const { userId } = await auth()

    if (!userId) {
        redirect('/login')
    }

    // TODO: Implement call to external Java API
    console.log('Creating project:', name, 'for user:', userId)

    // const project = await prisma.project.create({
    //     data: {
    //         name,
    //         userId
    //     }
    // })

    revalidatePath('/dashboard')
    // redirect(`/dashboard/${project.id}`)
    redirect('/dashboard') // Fallback redirect
}
