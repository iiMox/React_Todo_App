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
    const [day, setDay] = useState(new Date());
    const [erreur, setErreur] = useState("");

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
        if (
            newTask.title === undefined ||
            newTask.date === undefined ||
            newTask.title === "" ||
            newTask.date === ""
        ) {
            setErreur("Field is empty");
            setTimeout(() => setErreur(""), 1000);
        } else {
            dispatch({ type: "ADD_TASK", payload: newTask });
            localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
            setReload(true);
        }
    };

    let nbrTasks = 0;
    let nbrTasksDone = 0;
    let nbrTasksWaits = 0;
    const outPut = [];
    const stToday = `${day.getFullYear()}-0${
        day.getMonth() + 1
    }-${day.getDate()}`;
    let i = 0;
    tasks.forEach((task) => {
        if (task.date === stToday) {
            outPut.push(<TaskBox key={i} task={task} />);
            nbrTasks++;
            if (task.checked) {
                nbrTasksDone++;
            } else {
                nbrTasksWaits++;
            }
            i++;
        }
    });

    const whatToRender = () => {
        const d = new Date();
        if (d.getDate() === day.getDate()) {
            return "Today";
        } else if (d.getDate() === day.getDate() + 1) {
            return "Yesterday";
        } else if (d.getDate() === day.getDate() - 1) {
            return "Tommorow";
        } else return day.toDateString();
    };

    return (
        <div>
            <h1>My Todo List</h1>
            <div className="flex-container">
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
                                        id: parseInt(
                                            Math.random() * 10000000000
                                        ),
                                    })
                                }
                            />
                            <input
                                type="date"
                                onChange={(e) =>
                                    setNewTask({
                                        ...newTask,
                                        date: e.target.value,
                                    })
                                }
                            />
                            <button onClick={onClick}>Add</button>
                        </form>
                    </div>
                    <div className={`erreur ${erreur !== "" ? "visible" : ""}`}>
                        {erreur}
                    </div>
                    <hr />
                    <div className="control-date">
                        <div
                            className="prev"
                            onClick={() => {
                                const d = new Date();
                                d.setDate(day.getDate() - 1);
                                setDay(d);
                            }}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </div>
                        <div className="actual">{whatToRender()}</div>
                        <div
                            className="next"
                            onClick={() => {
                                const d = new Date();
                                d.setDate(day.getDate() + 1);
                                setDay(d);
                            }}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
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
                <div className="stats">
                    <h2>Statistics</h2>
                    <hr />
                    <ul>
                        <li>
                            Total tasks today : <span>{nbrTasks}</span>
                        </li>
                        <li>
                            Tasks completed :{" "}
                            <span style={{ colo: "#00fa9a" }}>
                                {nbrTasksDone}
                            </span>
                        </li>
                        <li>
                            Tasks waiting for you :{" "}
                            <span style={{ color: "#ff0000" }}>
                                {nbrTasksWaits}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default App;
