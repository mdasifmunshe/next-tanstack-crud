import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Read
export async function GET(request: Request) {
    const { pathname } = new URL(request.url)
    const id = pathname.split('/')[3]

    try {
        const todoById = await prisma.todo.findUnique({
            where: { id: Number(id) },
        })

        return NextResponse.json(todoById, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { data: 'No Todo Found', error },
            { status: 400 }
        )
    }
}

// Update
export async function PUT(request: Request) {
    const { pathname } = new URL(request.url)
    const id = pathname.split('/')[3]
    const { title, description } = await request.json()

    try {
        const updatedUser = await prisma.todo.update({
            where: { id: Number(id) },
            data: { title, description },
        })

        return NextResponse.json(updatedUser, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { data: 'No Todo Found', error },
            { status: 400 }
        )
    }
}

// Delete
export async function DELETE(request: NextResponse) {
    const { pathname } = new URL(request.url)
    const id = pathname.split('/')[3]

    try {
        const deletedTodo = await prisma.todo.delete({
            where: { id: Number(id) },
        })

        return NextResponse.json(
            { msg: `${deletedTodo.title} has been successfully deleted` },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { data: 'No Todo Found', error },
            { status: 400 }
        )
    }
}
