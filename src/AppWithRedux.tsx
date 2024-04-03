import React from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';
import AddForm from "./components/AddForm/AddForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    TodoListDomainType,
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTodoListAC,
    TaskPriorities,
    TaskStatuses,
    TasksType,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


function App() {

    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    const removeTask = React.useCallback ((todoListId: string, id: string)=>  {
        const action = removeTaskAC(id, todoListId)
        dispatch(action)
    }, [])

    const addTask = React.useCallback ((todoListId: string, taskId: string, title: string) => {
        const action = addTaskAC(todoListId, taskId, title)
        dispatch(action)
    }, [])

    const changeTask = React.useCallback ((todoListId: string, taskId: string, newValue: string) => {
        const action = changeTaskTitleAC(taskId, newValue, todoListId)
        dispatch(action)
    }, [])

    const changeStatus = React.useCallback ((todoListId: string, taskId: string, status: TaskStatuses) =>  {
        const action = changeTaskStatusAC(taskId, status, todoListId)
        dispatch(action)
    }, [])

    const changeFilter = React.useCallback((todoListId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatch(action)
    }, [])

    const deleteTodoList = React.useCallback((todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatch(action)
    }, [])

    const addTodoList = React.useCallback((title: string, todoListId: string) => {
        const action = addTodolistAC(title, todoListId)
        dispatch(action)
    }, [])

    const changeTodoListTitle = React.useCallback((todoListId: string, newValue: string) => {
        const action = changeTodolistTitleAC(todoListId, newValue)
        dispatch(action)
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: '10px 0'}}>
                    <Grid item>
                        <AddForm callBack={addTodoList}/>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(item => {

                            return <Grid key={item.id} item justifyContent={'start'}>
                                <Paper style={{padding: '20px'}}>
                                    <Todolist key={item.id}
                                              todoListId={item.id}
                                              title={item.title}
                                              tasks={tasks}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              filter={item.filter}
                                              deleteTodoList={deleteTodoList}
                                              changeTask={changeTask}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }</Grid>
            </Container>
        </div>
    );
}

export default App;
