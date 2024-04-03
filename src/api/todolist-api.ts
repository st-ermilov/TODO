import axios from 'axios'
import {TodoListDomainType} from "../state/todolists-reducer";
import {TasksType} from "../state/tasks-reducer";



type CreateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: {
        item: TodoListDomainType
    }
}

type UpdateTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: {}
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: {}
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldErrors: FieldErrorType[]
    data: D
}

export type FieldErrorType = {
    error: string,
    field: string
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': 'a805cb90-1ec3-43aa-b08b-e6c92ac3fb7b',
    },
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{item: TodoListDomainType}>>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },
    getTodoList() {
        const promise = instance.get<TodoListDomainType>(
            `todo-lists`)
        return promise
    },
    createTodoList(title: string) {
        const promise = instance.post<ResponseType>(
            `todo-lists`,
            {title: title}
        )
        return promise
    },
    deleteTodoList(todoListId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todoListId}`
        )
        return promise
    },
    getTasks(todoListId: string) {
        const promise = instance.get<ResponseType>(
            `todo-lists/${todoListId}/tasks`)
        return promise
    },
    deleteTask(todoListId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todoListId}/tasks/${taskId}`,
        )
        return promise
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todoListId}/tasks/${taskId}`,
            {title: title}
        )
        return promise
    },
    createTask(todoListId: string, title: string) {
        const promise = instance.post<ResponseType<TasksType>>(
            `todo-lists/${todoListId}/tasks`,
            {title: title}
        )
        return promise
    },
}