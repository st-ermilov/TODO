import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API',
}

const settings = {
    withCredentials: true,
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodoList()
            .then((response) => setState(response.data))
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodoList('TypeScript')
            .then(response => setState(response))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = '555fe85f-1db4-4fc1-869b-6549e67ddc55'
    useEffect(() => {
        todolistAPI.deleteTodoList(todoListId)
            .then(response => setState(response))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todoListId = 'd4ddd94e-6eb4-4a93-a8ed-63f778361ce8'
    useEffect(() => {
        todolistAPI.updateTodolist(todoListId, 'CSS')
            .then(response => setState(response.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'd4ddd94e-6eb4-4a93-a8ed-63f778361ce8'
        todolistAPI.getTasks(todoListId)
            .then((response) => {
                setState(response.data)
                console.log(state)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const AddTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'd4ddd94e-6eb4-4a93-a8ed-63f778361ce8'
        todolistAPI.createTask(todoListId, 'how can i do this')
            .then((response) => {
                setState(response.data)
                console.log(state)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'd4ddd94e-6eb4-4a93-a8ed-63f778361ce8'
        const taskId = 'a5258e25-decd-4b63-96bc-f9811c519a0e'
        todolistAPI.updateTask(todoListId, taskId, 'i know can i do this')
            .then((response) => {
                setState(response.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'd4ddd94e-6eb4-4a93-a8ed-63f778361ce8'
        const taskId = 'f6a90b00-316a-475d-950b-910a5b347da9'
        todolistAPI.deleteTask(todoListId, taskId)
            .then((response) => {
                setState(response.data)
                console.log(state)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    }, [])
    return <div>{JSON.stringify(state)}</div>
}