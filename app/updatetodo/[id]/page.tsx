'use client'

import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useParams } from 'next/navigation'
import { getTodoById, updatetodo, TodoList } from '@/lib/todo'

export default function UpdateTodo() {
    const router = useRouter()
    const params = useParams()
    const { id } = params
    const paramsID = id

    const queryClient = useQueryClient()
    const { register, handleSubmit } = useForm()

    const { data } = useQuery<TodoList[]>({
        queryKey: ['utodo'],
        queryFn: () => getTodoById(id),
    })

    const { isLoading, mutate } = useMutation({
        mutationFn: (values) => updatetodo(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries(['todos']), router.push('/dashboard')
        },
    })

    if (data) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-between p-12">
                <div className="flex flex-col gap-2 rounded-xl border border-blue-400 p-4 shadow-lg">
                    <div className="flex flex-row justify-center">
                        <div className="text-center text-xl font-bold">
                            Update Todo Form
                        </div>
                    </div>
                    <form
                        onSubmit={handleSubmit(mutate)}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-lg font-bold"
                            >
                                Title
                            </label>
                            <input
                                {...register('title')}
                                defaultValue={data.title}
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
                                defaultValue={data.description}
                                className="rounded-xl border border-slate-600"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-full border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white"
                        >
                            Update Todo
                        </button>
                    </form>
                </div>
            </main>
        )
    }
    return <main>loading...</main>
}
