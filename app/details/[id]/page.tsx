'use client'

import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useParams } from 'next/navigation'

interface TodoList {
    id: number
    title: string
    description: string
    createdAt: Date
    updatedAt: Date
}

const todosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export default function Details() {
    const router = useRouter()
    const params = useParams()
    const { id } = params

    const queryClient = useQueryClient()

    const fetchTodoById = (): Promise<TodoList[]> =>
        todosApi.get(`/todos/${id}`).then((res) => res.data)

    const { data, isLoading } = useQuery({
        queryKey: ['todo'],
        queryFn: fetchTodoById,
    })

    // const deleteTodo = useMutation((id) => {
    //     return axios.delete(`http://localhost:3000/api/todos/${id}`).then()
    // })
    const deleteTodo = (id: number): Promise<void> =>
        todosApi.delete(`/todos/${id}`).then((res) => res.data)

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
                <button
                    disabled={isLoading}
                    type="button"
                    className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                >
                    Update
                </button>
                <button
                    disabled={isLoading}
                    type="button"
                    className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                    onClick={() => mutate(data.id)}
                >
                    Delete
                </button>
            </div>
        </main>
    )
}
