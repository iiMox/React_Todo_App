import React from "react";
import TaskBox from "./components/TaskBox";
import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
    const [newTask, setNewTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem("tasks")));
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        const taskArray =
            localStorage.getItem("tasks") !== null
                ? JSON.parse(localStorage.getItem("tasks"))
                : [];
        taskArray.push({
            ...newTask,
            id: Math.random() * 10000000000,
            checked: false,
        });
        localStorage.setItem("tasks", JSON.stringify(taskArray));
        setTasks(JSON.parse(localStorage.getItem("tasks")));
    };

    const outPut = [];
    let i = 0;
    tasks?.forEach((task) => {
        outPut.push(
            <TaskBox
                key={i}
                title={task.title}
                date={task.date}
                checked={task.checked}
                id={task.id}
            />
        );
        i++;
    });

    return (
        <div>
            <h1>My Todo List</h1>
            <div className="content">
                <div className="add-task">
                    <form>
                        <input
                            type="text"
                            placeholder="Write your task"
                            onChange={(e) =>
                                setNewTask({
                                    ...newTask,
                                    title: e.target.value,
                                })
                            }
                        />
                        <input
                            type="date"
                            onChange={(e) =>
                                setNewTask({ ...newTask, date: e.target.value })
                            }
                        />
                        <button onClick={(e) => onClick(e)}>Add</button>
                    </form>
                </div>
                <hr />
                <div className="my-tasks">
                    {outPut.length !== 0 ? (
                        outPut
                    ) : (
                        <div
                            style={{
                                textAlign: "center",
                                color: "#ababab",
                                margin: "18px auto 10px",
                                letterSpacing: "0.8px",
                            }}
                        >
                            No Tasks For Today.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
