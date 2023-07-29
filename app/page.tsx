'use client'

import { useQuery } from '@tanstack/react-query'

interface TodoList {
    id: number
    title: string
    description: string
}

export default function Home() {
    const { data, isLoading } = useQuery<TodoList[]>({
        queryKey: ['todos'],
        queryFn: () =>
            fetch('http://localhost:3000/api/todos').then((res) => res.json()),
    })

    if (isLoading || !data) return <main>Loading...</main>

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="text-lg font-bold">Todos</div>
            {data.map((todo) => (
                <div className="flex flex-row" key={todo.id}>
                    <div className="text-lg font-bold">{todo.title}</div>
                    <div>{todo.description}</div>
                </div>
            ))}
        </main>
    )
}
