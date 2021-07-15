import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./TaskBox.css";

const TaskBox = (props) => {
    const [reload, setReload] = useState(false);

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const task = useSelector((state) => state.tasks.task);

    useEffect(() => {
        setReload(false);
    }, []);

    return (
        <div className="task-box">
            <input
                type="checkbox"
                checked={props.task.checked}
                onChange={(e) => {
                    const nTask = {
                        id: props.task.id,
                        title: props.task.title,
                        date: props.task.date,
                        checked: e.target.checked,
                    };
                    dispatch({ type: "SET_TASK", payload: nTask });
                    dispatch({
                        type: "EDIT_TASK",
                        payload: {
                            id: props.task.id,
                            checked: e.target.checked,
                        },
                    });
                    setReload(true);
                }}
            />
            <div
                className={`task-title ${
                    props.task.checked ? `decorated` : ``
                }`}
            >
                {props.task.title}
            </div>
            <div className="actions">
                <div
                    className="remove-task"
                    onClick={() => {
                        dispatch({
                            type: "DELETE_TASK",
                            payload: { id: props.task.id },
                        });
                        setReload(true);
                    }}
                >
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default TaskBox;
