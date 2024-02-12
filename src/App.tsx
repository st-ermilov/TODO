import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddForm from "./components/AddForm/AddForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const firstTodoListId = v1()
    const secondTodoListId = v1()
    let [tasks, setTasks] = useState<Record<string, TaskType[]>>(
        {
            [firstTodoListId]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [secondTodoListId]: [
                {id: v1(), title: "Vue", isDone: true},
                {id: v1(), title: "TS", isDone: false},
                {id: v1(), title: "Angular", isDone: false},
                {id: v1(), title: "Rest API", isDone: true},
                {id: v1(), title: "SQL", isDone: false},
            ]
        }
    );
    const [todoLists, setTodoLists] = React.useState<TodoListType[]>([
        {id: firstTodoListId, title: 'What to learn', filter: 'all'},
        {id: secondTodoListId, title: 'What to buy', filter: 'all'},
    ])

    function removeTask(todoListId: string, id: string) {
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(i => i.id !== id)})
    }

    function addTask(todoListId: string, title: string) {
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
        setTasks({...tasks, [todoListId]: [...tasks[todoListId], {id: v1(), title: title, isDone: false}]})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, isDone: isDone} : i)})
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        // const currentList = todoLists.find(item => item.id === todoListId)
        // if(currentList) {
        //     currentList.filter = value
        //     setTodoLists([...todoLists])
        // }
        setTodoLists(todoLists.map(i => i.id === todoListId ? {...i, filter: value} : i))
    }

    function deleteTodoList(todoListId: string) {
        const remove = todoLists.filter(item => item.id !== todoListId)
        setTodoLists(remove)
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodolist: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function changeTask (todoListId: string, taskId: string, newValue: string) {
        const wantedArray = tasks[todoListId]
        const wantedTask = wantedArray.find(item => item.id === taskId)
        if (wantedTask) {
            wantedTask.title = newValue
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(todoListId: string, newValue: string) {
        const wantedTodoList = todoLists.find(item => item.id === todoListId)
        if(wantedTodoList) {
            wantedTodoList.title = newValue
            setTodoLists([...todoLists])
        }
    }



    return (
        <div className="App">
            <AddForm callBack={addTodoList}/>
            {
                todoLists.map(item => {

                    let tasksForTodolist = tasks[item.id];

                    if (item.filter === "active") {
                        tasksForTodolist = tasks[item.id].filter(t => t.isDone === false);
                    }
                    if (item.filter === "completed") {
                        tasksForTodolist = tasks[item.id].filter(t => t.isDone === true);
                    }

                    return <Todolist key={item.id}
                                     id={item.id}
                                     title={item.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={item.filter}
                                     deleteTodoList={deleteTodoList}
                                     changeTask={changeTask}
                                     changeTodoListTitle={changeTodoListTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
