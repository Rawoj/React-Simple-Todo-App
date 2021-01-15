import React, { useState, useRef, useEffect } from "react";
import TodoTitle from "./todo/TodoTitle";
import TodoForm from "./todo/TodoForm";
import TodoTask from "./todo/TodoTask";
import TodoFilterButton from "./todo/TodoFilterButton";
import "./todo/todo.css";
import { nanoid } from "nanoid";



function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function TodoApp(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                
                return { ...task, completed: !task.completed }
            }
            return task;
        });
        setTasks(updatedTasks);
    }


    function deleteTask(id) {
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }


    function editTask(id, newName) {
        const editedTaskList = tasks.map(task => {
            if (id === task.id) {
                return { ...task, name: newName }
            }
            return task;
        });
        setTasks(editedTaskList);
    }

    const taskList = tasks
        .filter(FILTER_MAP[filter])
        .map(task => (
            <TodoTask
                id={task.id}
                name={task.name}
                completed={task.completed}
                key={task.id}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}
            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <TodoFilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }


    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);
    const prevTaskLength = usePrevious(tasks.length);

    useEffect(() => {
        if (tasks.length - prevTaskLength === -1) {
            listHeadingRef.current.focus();
        }
    }, [tasks.length, prevTaskLength]);


    return (
        <div>
            <h1 className="todo-header">Todo list</h1>
            <div className="todo-app">
                <TodoTitle/>
                <TodoForm addTask={addTask} />
                <div className="filters btn-group stack-exception">
                    {filterList}
                </div>
                <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                    {headingText}
                </h2>
                <ul
                    className="todo-list stack-large stack-exception"
                    aria-labelledby="list-heading"
                >
                    {taskList}
                </ul>
            </div>
        </div>
    );
}

