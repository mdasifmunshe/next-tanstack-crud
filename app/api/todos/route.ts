import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create
export async function POST(request: Request) {
    const { title, description } = await request.json()

    try {
        const createdTodo = await prisma.todo.create({
            data: { title, description },
        })

        return NextResponse.json(createdTodo, { status: 201 })
    } catch (error) {
        return NextResponse.json(
            { data: 'No Todo Found', error },
            { status: 400 }
        )
    }
}

// Read
export async function GET() {
    try {
        const allTodos = await prisma.todo.findMany()

        return NextResponse.json(allTodos, { status: 200 })
    } catch (error) {
        return NextResponse.json(
            { data: 'No Todos Found', error },
            { status: 400 }
        )
    }
}

// Update
export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
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
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

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
