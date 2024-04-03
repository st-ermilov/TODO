
import {v1} from 'uuid'

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

type ActionType = AddTodoListActionType
    | DeleteTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType


type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}

type DeleteTodoListActionType = {
    type: 'DELETE-TODOLIST'
    todoListId: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    newValue: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todoListId: string
    newFilter: FilterValuesType
}

const initialState: TodoListDomainType[] = []

export function todoListsReducer(state: TodoListDomainType[] = initialState, action: ActionType): TodoListDomainType[] {
    switch (action.type) {
        case 'CHANGE-TODOLIST-TITLE':
            const wanted = [...state].find(item => item.id === action.todoListId)
            if (wanted && action.newValue) {
                wanted.title = action.newValue
            }
            return [...state]

        case 'ADD-TODOLIST':
            return [{id: action.todoListId, title: action.title ? action.title : '', filter: 'all', addedDate: '', order: 0}, ...state]

        case 'DELETE-TODOLIST':
            return state.filter(item => item.id !== action.todoListId)

        case 'CHANGE-TODOLIST-FILTER':
            const changeFilter = [...state].find(item => item.id === action.todoListId)
            if (changeFilter && action.newFilter) {
                changeFilter.filter = action.newFilter
            }
            return [...state]

        default:
           return state
    }

}

export function addTodolistAC(title: string, todoListId: string): AddTodoListActionType {
    return {type: "ADD-TODOLIST", title: title, todoListId: todoListId}
}

export function deleteTodolistAC(todoListId: string): DeleteTodoListActionType {
    return {type: "DELETE-TODOLIST", todoListId: todoListId}
}

export function changeTodolistTitleAC(todoListId: string, newValue: string): ChangeTodoListTitleActionType {
    return {type: "CHANGE-TODOLIST-TITLE", todoListId: todoListId, newValue: newValue}
}

export function changeTodolistFilterAC(todoListId: string, newFilter: FilterValuesType): ChangeTodoListFilterActionType {
    return {type: "CHANGE-TODOLIST-FILTER", todoListId: todoListId, newFilter: newFilter}
}