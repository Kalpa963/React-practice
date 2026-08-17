// import { useState } from "react";

// function TodoApp() {
//     const [todos, setTodos] = useState([]);
//     const [inputValue, setInputValue] = useState("");

//     function handleChange(e) {
//         setInputValue(e.target.value);
//     }

//     function handleSubmit(e) {
//         e.preventDefault();

//         if (inputValue.trim() === "") return;

//         const newTodo = {
//             id: Date.now(),
//             text: inputValue,
//             completed: false,
//         };

//         setTodos([...todos, newTodo]);
//         setInputValue("");
//     }

//     function toggleComplete(id) {
//         setTodos(
//             todos.map((todo) =>
//                 todo.id === id ? { ...todo, completed: !todo.completed } : todo
//             )
//         );
//     }

//     function deleteTodo(id) {
//         setTodos(todos.filter((todo) => todo.id !== id));
//     }

//     return (
//         <div>
//             <h1>Todo App</h1>

//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleChange}
//                     placeholder="Add a new task"
//                 />
//                 <button type="submit">Add</button>
//             </form>

//             {todos.length === 0 ? (
//                 <p>No tasks yet.</p>
//             ) : (
//                 <ul>
//                     {todos.map((todo) => (
//                         <li key={todo.id}>
//                             <span onClick={() => toggleComplete(todo.id)}>
//                                 {todo.completed ? "☑" : "☐"} {todo.text}
//                             </span>
//                             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }

// export default TodoApp;


import { useState } from "react";
import "./Todo.css";

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (inputValue.trim() === "") return;

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
            cancelled: false,
        };

        setTodos([...todos, newTodo]);
        setInputValue("");
    }

    function toggleComplete(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed, cancelled: false }
                    : todo
            )
        );
    }

    function cancelTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, cancelled: true, completed: false }
                    : todo
            )
        );
    }

    function restoreTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, cancelled: false } : todo
            )
        );
    }

    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const pendingTodos = todos.filter((todo) => !todo.completed && !todo.cancelled);
    const completedTodos = todos.filter((todo) => todo.completed);
    const cancelledTodos = todos.filter((todo) => todo.cancelled);

    return (
        <div className="page">
            <div className="container">
                {/* Header */}
                <header className="header">
                    <h1 className="title">My Tasks</h1>
                    {todos.length > 0 && (
                        <p className="subtitle">
                            {completedTodos.length} of {todos.length} done
                        </p>
                    )}
                </header>

                {/* Add task form */}
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="What needs to be done?"
                        className="input"
                    />
                    <button type="submit" className="add-btn">
                        Add
                    </button>
                </form>

                {/* Three-column board */}
                <div className="board">
                    {/* Pending column */}
                    <section className="column">
                        <h2 className="column-title pending">
                            Pending {pendingTodos.length > 0 && `(${pendingTodos.length})`}
                        </h2>

                        {pendingTodos.length === 0 ? (
                            <p className="empty-text">Nothing pending 🎉</p>
                        ) : (
                            <ul className="list">
                                {pendingTodos.map((todo) => (
                                    <li key={todo.id} className="pending-item">
                                        <label className="check-label">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                                className="checkbox"
                                            />
                                            <span className="todo-text">{todo.text}</span>
                                        </label>
                                        <div className="actions">
                                            <button
                                                onClick={() => cancelTodo(todo.id)}
                                                className="cancel-btn"
                                                title="Cancel task (won't be done)"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="delete-btn"
                                                title="Delete task"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Completed column */}
                    <section className="column">
                        <h2 className="column-title completed">
                            Completed {completedTodos.length > 0 && `(${completedTodos.length})`}
                        </h2>

                        {completedTodos.length === 0 ? (
                            <p className="empty-text">No tasks finished yet</p>
                        ) : (
                            <ul className="list">
                                {completedTodos.map((todo) => (
                                    <li key={todo.id} className="completed-item">
                                        <label className="check-label">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                                className="checkbox"
                                            />
                                            <span className="completed-text">{todo.text}</span>
                                        </label>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="delete-btn"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Cancelled column */}
                    <section className="column">
                        <h2 className="column-title cancelled">
                            Cancelled {cancelledTodos.length > 0 && `(${cancelledTodos.length})`}
                        </h2>

                        {cancelledTodos.length === 0 ? (
                            <p className="empty-text">No cancelled tasks</p>
                        ) : (
                            <ul className="list">
                                {cancelledTodos.map((todo) => (
                                    <li key={todo.id} className="cancelled-item">
                                        <span className="cancelled-text">{todo.text}</span>
                                        <div className="actions">
                                            <button
                                                onClick={() => restoreTodo(todo.id)}
                                                className="restore-btn"
                                                title="Move back to pending"
                                            >
                                                Restore
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="delete-btn"
                                                title="Delete task"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TodoApp;