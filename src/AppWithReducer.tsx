export {}
// import React from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
// import {v1} from 'uuid';
// import AddForm from "./components/AddForm/AddForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
// import {Menu} from "@mui/icons-material";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     todoListsReducer
// } from "./state/todolists-reducer";
// import {
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC, removeTodoListAC,
//     tasksReducer,
// } from "./state/tasks-reducer";
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// export type TodoListType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// function App() {
//
//     const firstTodoListId = v1()
//     const secondTodoListId = v1()
//     let [tasks, dispatchTasks] = React.useReducer(tasksReducer,
//         {
//             [firstTodoListId]: [
//                 {id: v1(), title: "HTML&CSS", isDone: true},
//                 {id: v1(), title: "JS", isDone: true},
//                 {id: v1(), title: "ReactJS", isDone: false},
//                 {id: v1(), title: "Rest API", isDone: false},
//                 {id: v1(), title: "GraphQL", isDone: false},
//             ],
//             [secondTodoListId]: [
//                 {id: v1(), title: "Vue", isDone: true},
//                 {id: v1(), title: "TS", isDone: false},
//                 {id: v1(), title: "Angular", isDone: false},
//                 {id: v1(), title: "Rest API", isDone: true},
//                 {id: v1(), title: "SQL", isDone: false},
//             ]
//         }
//     );
//     const [todoLists, dispatchTodoLists] = React.useReducer(todoListsReducer, [
//         {id: firstTodoListId, title: 'What to learn', filter: 'all'},
//         {id: secondTodoListId, title: 'What to buy', filter: 'all'},
//     ])
//
//     function removeTask(todoListId: string, id: string) {
//         const action = removeTaskAC(id, todoListId)
//         dispatchTasks(action)
//     }
//
//     function addTask(todoListId: string, title: string) {
//         const action = addTaskAC(title, todoListId, v1())
//         dispatchTasks(action)
//     }
//
//     function changeTask(todoListId: string, taskId: string, newValue: string) {
//         const action = changeTaskTitleAC(taskId, newValue, todoListId)
//         dispatchTasks(action)
//     }
//
//     function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
//         const action = changeTaskStatusAC(taskId, isDone, todoListId)
//         dispatchTasks(action)
//
//     }
//
//     function changeFilter(todoListId: string, value: FilterValuesType) {
//         const action = changeTodolistFilterAC(todoListId, value)
//         dispatchTodoLists(action)
//     }
//
//     function deleteTodoList(todoListId: string) {
//         const action = removeTodoListAC(todoListId)
//         dispatchTasks(action)
//         dispatchTodoLists(action)
//     }
//
//     function addTodoList(title: string, todoListId: string) {
//         const action = addTodolistAC(title, todoListId)
//         dispatchTasks(action)
//         dispatchTodoLists(action)
//     }
//
//     function changeTodoListTitle(todoListId: string, newValue: string) {
//         const action = changeTodolistTitleAC(todoListId, newValue)
//         dispatchTodoLists(action)
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{mr: 2}}
//                     >
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{margin: '10px 0'}}>
//                     <Grid item>
//                         <AddForm callBack={addTodoList}/>
//                     </Grid>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todoLists.map(item => {
//
//                             let tasksForTodolist = tasks[item.id];
//
//                             if (item.filter === "active") {
//                                 tasksForTodolist = tasks[item.id].filter(t => t.isDone === false);
//                             }
//                             if (item.filter === "completed") {
//                                 tasksForTodolist = tasks[item.id].filter(t => t.isDone === true);
//                             }
//
//                             return <Grid item justifyContent={'start'}>
//                                 <Paper style={{padding: '20px'}}>
//                                     <Todolist key={item.id}
//                                               todoListId={item.id}
//                                               title={item.title}
//                                               tasks={tasksForTodolist}
//                                               removeTask={removeTask}
//                                               changeFilter={changeFilter}
//                                               addTask={addTask}
//                                               changeTaskStatus={changeStatus}
//                                               filter={item.filter}
//                                               deleteTodoList={deleteTodoList}
//                                               changeTask={changeTask}
//                                               changeTodoListTitle={changeTodoListTitle}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }</Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;
