import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    todoListsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodoListType} from '../AppWithRedux'
let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist added', () => {

    const endState = todoListsReducer(startState, addTodolistAC('What to play', v1()))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to play')
})

test('correct todolist change title', () => {

    const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistId1, 'What to play'))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to play')
})


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'


    const endState = todoListsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})
