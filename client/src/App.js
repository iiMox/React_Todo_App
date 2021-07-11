import React from "react";

import "./App.css";

const App = () => {
    return (
        <div>
            <h1>My Todo List</h1>
            <div className="content">
                <div className="add-task">
                    <form>
                        <input type="text" placeholder="Write your task" />
                        <button>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;
