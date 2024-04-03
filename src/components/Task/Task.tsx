import React from 'react';
import {Checkbox, Icon, IconButton} from "@mui/material";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../state/tasks-reducer";

type TaskPropsType = {
    taskId: string
    taskTitle: string
    taskIsDone: TaskStatuses
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    changeTask: (newValue: string) => void
    onClickHandler: () => void
}
export default React.memo(function Task(props: TaskPropsType) {
    return (
        <div key={props.taskId} className={props.taskIsDone === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                onChange={props.onChangeHandler}
                checked={props.taskIsDone === TaskStatuses.Completed}/>
            <EditableSpan title={props.taskTitle} callBack={props.changeTask}/>
            <IconButton onClick={props.onClickHandler}>
                <Icon>
                    <Delete/>
                </Icon>
            </IconButton>
        </div>
    );
})

