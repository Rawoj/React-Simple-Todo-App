import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function TodoTask(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName.trim()) {
            return;
        }
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">

                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
          <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
          <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );
    

    // Set style based on completion
    const styleWhenCompleted = {
        textDecorationLine: "line-through"
    };
    const styleWhenIncomplete = {
        textDecorationLine: "none"
    };
    let currentStyle = props.completed ? styleWhenCompleted : styleWhenIncomplete;

    const viewTemplate = (
        <div className="stack-small">
            <hr className="line-break-small"/>
            <div className="c-cb hide-checkbox">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                    className="todo-checkbox"
                />
                <label className="todo-label" 
                    htmlFor={props.id}
                    style={currentStyle}
                >
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>

        </div>
    );


    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);


    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}