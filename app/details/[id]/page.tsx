'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { getTodoById, deleteTodo, TodoList } from '@/lib/todo'

export default function Details() {
    const router = useRouter()
    const params = useParams()
    const { id } = params
    const paramsID = id

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery<TodoList[]>({
        queryKey: ['todo'],
        queryFn: () => getTodoById(paramsID),
    })

    const { mutate } = useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['todo']), router.push('/dashboard')
        },
    })

    if (isLoading || !data) return <main>Loading...</main>

    return (
        <main className="flex min-h-screen flex-col items-center justify-start gap-8 p-12">
            <div
                className="flex flex-col rounded-xl border border-blue-400 p-4 shadow-lg"
                key={data.id}
            >
                <div className="text-lg font-bold">{data.title}</div>
                <div>{data.description}</div>
            </div>
            <div className="flex flex-row justify-between">
                <Link
                    href={`/updatetodo/${data.id}`}
                    type="button"
                    className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                >
                    Update
                </Link>
                <button
                    disabled={isLoading}
                    onClick={() => mutate(data.id)}
                    type="button"
                    className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                >
                    Delete
                </button>
            </div>
        </main>
    )
}
