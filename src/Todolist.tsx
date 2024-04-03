import React, {ChangeEvent} from 'react';
import AddForm from "./components/AddForm/AddForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import {Button, Icon, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {v1} from "uuid";
import {TaskStatuses, TasksType, TaskType} from "./state/tasks-reducer";
import Task from "./components/Task/Task";
import {FilterValuesType} from "./state/todolists-reducer";


type PropsType = {
    todoListId: string
    title: string
    tasks: TasksType
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    changeTask: (todoListId: string, taskId: string, newValue: string) => void
    changeTodoListTitle: (todoList: string, newValue: string) => void
    addTask: (todoListId: string, title: string, id: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void


}

export default React.memo(function Todolist(props: PropsType) {
    console.log('Todolist render' + props.todoListId)

    let tasksForTodolist = props.tasks[props.todoListId];


    if (props.filter === "active") {
        tasksForTodolist = props.tasks[props.todoListId].filter(t => t.status === TaskStatuses.InProgress);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks[props.todoListId].filter(t => t.status === TaskStatuses.Completed);
    }
    const onAllClickHandler = React.useCallback(() =>
        props.changeFilter(props.todoListId, "all"), [props.changeFilter, props.todoListId]);
    const onActiveClickHandler = React.useCallback(() =>
        props.changeFilter(props.todoListId, "active"), [props.changeFilter, props.todoListId]);
    const onCompletedClickHandler = React.useCallback(() =>
        props.changeFilter(props.todoListId, "completed"), [props.changeFilter, props.todoListId]);

    function deleteTodolist() {
        props.deleteTodoList(props.todoListId)
    }

    const addTask = React.useCallback((title: string) => {
        props.addTask(props.todoListId, v1(), title)
    }, [props.addTask, props.todoListId])

    function changeTodoListTitle(newValue: string) {
        props.changeTodoListTitle(props.todoListId, newValue)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={changeTodoListTitle}/>
            <IconButton onClick={deleteTodolist}>
                <Icon>
                    <Delete/>
                </Icon>
            </IconButton>
        </h3>
        <AddForm callBack={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todoListId, t.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
                    }

                    const changeTask = (newValue: string) => {
                        props.changeTask(props.todoListId, t.id, newValue)
                    }

                    return <Task key={t.id}
                                 taskId={t.id}
                                 taskTitle={t.title}
                                 taskIsDone={t.status}
                                 onChangeHandler={onChangeHandler}
                                 changeTask={changeTask}
                                 onClickHandler={onClickHandler}/>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})
