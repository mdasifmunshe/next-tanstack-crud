'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getAllTodos } from '@/lib/todo'

export default function Home() {
    const { data, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: getAllTodos,
    })

    if (isLoading || !data) return <main>Loading...</main>

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-col gap-2">
                {data.map((todo) => (
                    <Link
                        className="flex flex-col rounded-xl border border-blue-400 p-4 shadow-lg"
                        key={todo.id}
                        href={`/details/${todo.id}`}
                    >
                        <div className="text-lg font-bold">{todo.title}</div>
                        <div>{todo.description}</div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
