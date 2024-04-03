import {v1} from "uuid";

export type TasksType = {
    [key: string]: TaskType[]

}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3

}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgent = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddNewTodoListActionType
    | DeleteTodoListActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todoListId: string
    taskId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    todoListId: string
    taskId: string
    title: string

}

type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    taskId: string
    todoListId: string
    status: TaskStatuses
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE'
    todoListId: string
    taskId: string
    newTitle: string
}

type AddNewTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type DeleteTodoListActionType = {
    type: 'DELETE-TODOLIST'
    todoListId: string
}

const initialState: TasksType = {}

export function tasksReducer(state: TasksType = initialState, action: ActionType): TasksType {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(item => item.id !== action.taskId)}
        case 'ADD-TASK': {
            const stateCopy = {...state}
            console.log('stateCopy' + stateCopy)
            const newTask: TaskType = {
                id: action.taskId,
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListId, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
            console.log('newTask' + newTask)
            const tasks = stateCopy[action.todoListId];
            console.log('tasks' + tasks)
            const newTasks = [newTask, ...tasks];
            console.log(newTasks)
            stateCopy[action.todoListId] = newTasks;
            console.log('stateCopy[action.todoListId]' + stateCopy[action.todoListId])
            return stateCopy;
        }
        case 'CHANGE-STATUS':
            let todoListTasks = state[action.todoListId]
            let wantedArr = todoListTasks.map(item => item.id === action.taskId
                ? {...item, status: action.status}
                : item)
            state[action.todoListId] = [...wantedArr]
            return ({...state})
        // return {
        //     ...state, [action.todoListId]: state[action.todoListId].map(item => item.id === action.taskId
        //         ? {...item, isDone: action.isDone}
        //         : item)
        // }
        case 'CHANGE-TITLE':
            let todoList = state[action.todoListId]
            let newArr = todoList.map(item => item.id === action.taskId
                ? {...item, title: action.newTitle}
                : item)
            state[action.todoListId] = [...newArr]
            return ({...state})
        // return {
        //     ...state, [action.todoListId]: state[action.todoListId].map(item => item.id === action.taskId
        //         ? {...item, title: action.newTitle}
        //         : item)
        // }
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todoListId]: []
            }
        case 'DELETE-TODOLIST':
            const copy = {...state}
            delete copy[action.todoListId]
            return copy
        default:
            return state

    }
}

export function removeTaskAC(taskId: string, todoListId: string): RemoveTaskActionType {
    return {type: 'REMOVE-TASK', taskId: taskId, todoListId: todoListId}
}

export function addTaskAC(todoListId: string, taskId: string, title: string): AddTaskActionType {
    return {
        type: "ADD-TASK",
        todoListId: todoListId,
        taskId: taskId,
        title: title
    }
}

export function changeTaskStatusAC(taskId: string, status: TaskStatuses, todoListId: string): ChangeTaskStatusActionType {
    return {type: "CHANGE-STATUS", taskId: taskId, status: status, todoListId: todoListId}
}

export function changeTaskTitleAC(taskId: string, newTitle: string, todoListId: string): ChangeTaskTitleActionType {
    return {type: "CHANGE-TITLE", taskId: taskId, newTitle: newTitle, todoListId: todoListId}
}

export function addNewTodoListAC(title: string, todoListId: string): AddNewTodoListActionType {
    return {type: "ADD-TODOLIST", title: title, todoListId: todoListId}
}

export function removeTodoListAC(todoListId: string): DeleteTodoListActionType {
    return {type: "DELETE-TODOLIST", todoListId: todoListId}
}