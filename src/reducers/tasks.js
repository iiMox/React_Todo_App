const initialState = { tasks: [], task: null };

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, payload],
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== payload.id),
            };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === payload.id
                        ? { ...task, checked: payload.checked }
                        : task
                ),
            };
        case "GET_TASK":
            return {
                ...state,
                task: payload,
            };
        case "GET_TASKS":
            return {
                ...state,
                tasks: payload,
            };
        default:
            return state;
    }
}
