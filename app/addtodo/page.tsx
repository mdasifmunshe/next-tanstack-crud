'use client'

import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const todosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export default function AddTodo() {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { register, handleSubmit } = useForm()

    const addTodos = (values): Promise<void> =>
        todosApi.post('/todos', values).then((res) => res.data)

    const { isLoading, mutate } = useMutation({
        mutationFn: (values) => addTodos(values),
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']), router.push('/dashboard')
        },
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            <div className="flex flex-col gap-2 rounded-xl border border-blue-400 p-4 shadow-lg">
                <div className="flex flex-row justify-center">
                    <div className="text-center text-xl font-bold">
                        Add Todo Form
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(mutate)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title" className="text-lg font-bold">
                            Title
                        </label>
                        <input
                            {...register('title')}
                            className="rounded-xl border border-slate-600"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="description"
                            className="text-lg font-bold"
                        >
                            Description
                        </label>
                        <input
                            {...register('description')}
                            className="rounded-xl border border-slate-600"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                    >
                        Add Todo
                    </button>
                </form>
            </div>
        </main>
    )
}
