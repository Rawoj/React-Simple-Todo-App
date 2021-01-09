import React, { useState } from "react";

export default function TodoApp(props) {

    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }
        props.addTask(name);
        setName("");
    }

    function handleChange(e) {
        setName(e.target.value);
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg todo-inputfield"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
                placeholder="Enter a new task"
                maxLength={50}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}
