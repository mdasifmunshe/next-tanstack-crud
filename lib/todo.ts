import axios from 'axios'

export interface TodoList {
    id: number
    title: string
    description: string
}

const todosApi = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const getAllTodos = (): Promise<TodoList[]> =>
    todosApi.get('/todos').then((res) => res.data)

export const getTodoById = (id): Promise<TodoList[]> =>
    todosApi.get(`/todos/${id}`).then((res) => res.data)

export const addTodo = (values): Promise<TodoList[]> =>
    todosApi.post('/todos', values).then((res) => res.data)

export const updatetodo = (id, values): Promise<TodoList[]> =>
    todosApi.put(`/todos/${id}`, values).then((res) => res.data)

export const deleteTodo = (id: number): Promise<void> =>
    todosApi.delete(`/todos/${id}`).then((res) => res.data)
