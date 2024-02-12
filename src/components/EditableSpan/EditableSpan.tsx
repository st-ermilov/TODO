import React from 'react';

type EditableSpanPropsType = {
    title: string
    callBack: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {

    const [isEdit, setIsEdit] = React.useState(false)
    const [title, setTitle] = React.useState('')

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }

    function onEditMode() {
        setIsEdit(true)
        setTitle(props.title)
    }

    function onViewMode() {
        props.callBack(title)
        setIsEdit(false)
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
                    : <input
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