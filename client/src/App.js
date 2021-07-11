import React from "react";
import TaskBox from "./components/TaskBox";
import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(localStorage.getItem("tasks"));
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        setTasks([newTask, ...tasks]);
        localStorage.setItem("tasks", tasks);
    };

    return (
        <div>
            <h1>My Todo List</h1>
            <div className="content">
                <div className="add-task">
                    <form>
                        <input
                            type="text"
                            placeholder="Write your task"
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button onClick={(e) => onClick(e)}>Add</button>
                    </form>
                </div>
                <hr />
                <div className="my-tasks">
                    <TaskBox />
                    <TaskBox />
                </div>
            </div>
        </div>
    );
};

export default App;
