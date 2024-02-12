import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddForm from "./components/AddForm/AddForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTask: (todoListId: string, taskId: string, newValue: string) => void
    changeTodoListTitle: (todoList: string, newValue: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void


}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    function deleteTodolist() {
        props.deleteTodoList(props.id)
    }

    function addTask(title: string) {
        props.addTask(props.id, title)
    }

    function changeTodoListTitle(newValue: string) {
        props.changeTodoListTitle(props.id, newValue)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={changeTodoListTitle}/>
            <button onClick={deleteTodolist}>x</button>
        </h3>
        <AddForm callBack={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.id, t.id, e.currentTarget.checked);
                    }

                    const changeTask = (newValue: string) => {
                        props.changeTask(props.id, t.id, newValue)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callBack={changeTask}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
