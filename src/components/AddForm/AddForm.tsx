import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Icon, IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";
import {v1} from "uuid";

type AddFormPropsType = {
    callBack: (title: string, todoListId: string) => void
}

export default React.memo(function AddForm(props: AddFormPropsType) {
    console.log('AddForm render')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim(), v1());
            setTitle("");
        } else {
            setError('Is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addTask();
        }
    }

    return (
        <div>
            <TextField label={error ? 'Empty input' : "Enter your task"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error ? "Write anything, please" : ''}
            />
            <IconButton onClick={addTask}>
                <Icon>
                    <AddCircle/>
                </Icon>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
})

