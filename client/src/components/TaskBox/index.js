import React from "react";

import "./TaskBox.css";

const TaskBox = () => {
    return (
        <div className="task-box">
            <input type="checkbox" />
            <div className="task-title">Complete the cours</div>
            <div className="actions">
                <div className="edit-task">
                    <i className="far fa-edit"></i>
                </div>
                <div className="remove-task">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    );
};

export default TaskBox;
