import React from "react";
import TaskBox from "./components/TaskBox";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";

const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);

    const [newTask, setNewTask] = useState({ checked: false });
    const [reload, setReload] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("tasks")) {
            dispatch({
                type: "GET_TASKS",
                payload: JSON.parse(localStorage.getItem("tasks")),
            });
        }
        setReload(false);
    }, []);

    const onClick = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_TASK", payload: newTask });
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
        setReload(true);
    };

    const outPut = [];
    const today = new Date();
    const stToday = `${today.getFullYear()}-0${
        today.getMonth() + 1
    }-${today.getDate()}`;
    let i = 0;
    tasks.forEach((task) => {
        if (task.date === stToday) {
            outPut.push(<TaskBox key={i} task={task} />);
            i++;
        }
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
                                    id: parseInt(Math.random() * 10000000000),
                                })
                            }
                        />
                        <input
                            type="date"
                            onChange={(e) =>
                                setNewTask({ ...newTask, date: e.target.value })
                            }
                        />
                        <button onClick={onClick}>Add</button>
                    </form>
                </div>
                <hr />
                <div className="my-tasks">
                    {outPut.length !== 0 ? (
                        outPut.reverse()
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
