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
