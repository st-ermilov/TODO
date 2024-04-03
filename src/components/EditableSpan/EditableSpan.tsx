import React, {useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    console.log('EditableSpan render')

    const [isEdit, setIsEdit] = React.useState(false)
    const [title, setTitle] = React.useState('')
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if(title.trim() !== '') {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }, [])

    function onEditMode() {
        setIsEdit(true)
        setTitle(props.title)
        setError(null)
    }

    const onViewMode = () => {
        if(title.trim() === '') {
            setError("Title is required");
        } else {
            props.callBack(title.trim())
            setIsEdit(false)
        }


    }

    function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onViewMode()
        }
    }

    return (
        <>
            {
                !isEdit
                    ? <span onDoubleClick={onEditMode}>{props.title}</span>
                    : <TextField
                        variant={'standard'}
                        error={!!error}
                        helperText={error ? "Write anything, please" : ''}
                        autoFocus
                        onBlur={onViewMode}
                        onKeyDown={onKeyDownHandler}
                        value={title}
                        onChange={onChangeHandler}/>
            }
        </>
    );
}

export default EditableSpan;