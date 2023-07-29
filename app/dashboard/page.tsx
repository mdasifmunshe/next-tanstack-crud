'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface TodoList {
    id: number
    title: string
    description: string
}

const todosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export default function Home() {
    const fetchTodos = (): Promise<TodoList[]> =>
        todosApi.get('/todos').then((res) => res.data)

    const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    })

    if (isLoading || !data) return <main>Loading...</main>

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-col gap-2">
                {data.map((todo) => (
                    <div
                        className="flex flex-col rounded-xl border border-blue-400 p-4 shadow-lg"
                        key={todo.id}
                    >
                        <div className="text-lg font-bold">{todo.title}</div>
                        <div>{todo.description}</div>
                    </div>
                ))}
            </div>
        </main>
    )
}
