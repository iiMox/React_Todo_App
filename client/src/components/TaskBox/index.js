import React from "react";
import { useState, useEffect } from "react";

import "./TaskBox.css";

const TaskBox = ({ id, title, date, checked }) => {
    const [task, setTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        setTask({ id, title, date, checked });
        setTasks(JSON.parse(localStorage.getItem("tasks")));
    }, []);
    return task ? (
        <div className="task-box">
            <input
                type="checkbox"
                checked={task.checked}
                onChange={(e) => {
                    const array = [];
                    tasks.forEach((task) => {
                        if (task.id === id) {
                            array.push({
                                id,
                                title,
                                date,
                                checked: e.target.checked,
                            });
                        } else {
                            array.push(task);
                        }
                    });
                    setTasks(array);
                    localStorage.setItem("tasks", JSON.stringify(tasks));
                    setTask({ ...task, checked: e.target.checked });
                }}
            />
            <div className="task-title">{task.title}</div>
            <div className="actions">
                <div className="edit-task">
                    <i className="far fa-edit"></i>
                </div>
                <div className="remove-task">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    ) : null;
};

export default TaskBox;
