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

    // Mark a task as cancelled (timed out / won't be done) — different from delete
    function cancelTodo(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, cancelled: true, completed: false }
                    : todo
            )
        );
    }

    // Bring a cancelled task back to pending
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
        <div style={styles.page}>
            <div style={styles.container}>
                {/* Header */}
                <header style={styles.header}>
                    <h1 style={styles.title}>My Tasks</h1>
                    {todos.length > 0 && (
                        <p style={styles.subtitle}>
                            {completedTodos.length} of {todos.length} done
                        </p>
                    )}
                </header>

                {/* Add task form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="What needs to be done?"
                        style={styles.input}
                    />
                    <button type="submit" style={styles.addBtn}>
                        Add
                    </button>
                </form>

                {/* Three-column board */}
                <div style={styles.board}>
                    {/* Pending column */}
                    <section style={styles.column}>
                        <h2 style={{ ...styles.columnTitle, color: "#6C5CE7" }}>
                            Pending {pendingTodos.length > 0 && `(${pendingTodos.length})`}
                        </h2>

                        {pendingTodos.length === 0 ? (
                            <p style={styles.emptyText}>Nothing pending 🎉</p>
                        ) : (
                            <ul style={styles.list}>
                                {pendingTodos.map((todo) => (
                                    <li key={todo.id} style={styles.pendingItem}>
                                        <label style={styles.checkLabel}>
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                                style={styles.checkbox}
                                            />
                                            <span style={styles.todoText}>{todo.text}</span>
                                        </label>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => cancelTodo(todo.id)}
                                                style={styles.cancelBtn}
                                                title="Cancel task (won't be done)"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                style={styles.deleteBtn}
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
                    <section style={styles.column}>
                        <h2 style={{ ...styles.columnTitle, color: "#00B894" }}>
                            Completed {completedTodos.length > 0 && `(${completedTodos.length})`}
                        </h2>

                        {completedTodos.length === 0 ? (
                            <p style={styles.emptyText}>No tasks finished yet</p>
                        ) : (
                            <ul style={styles.list}>
                                {completedTodos.map((todo) => (
                                    <li key={todo.id} style={styles.completedItem}>
                                        <label style={styles.checkLabel}>
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                                style={styles.checkbox}
                                            />
                                            <span style={styles.completedText}>{todo.text}</span>
                                        </label>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            style={styles.deleteBtn}
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Cancelled column */}
                    <section style={styles.column}>
                        <h2 style={{ ...styles.columnTitle, color: "#B2BEC3" }}>
                            Cancelled {cancelledTodos.length > 0 && `(${cancelledTodos.length})`}
                        </h2>

                        {cancelledTodos.length === 0 ? (
                            <p style={styles.emptyText}>No cancelled tasks</p>
                        ) : (
                            <ul style={styles.list}>
                                {cancelledTodos.map((todo) => (
                                    <li key={todo.id} style={styles.cancelledItem}>
                                        <span style={styles.cancelledText}>{todo.text}</span>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => restoreTodo(todo.id)}
                                                style={styles.restoreBtn}
                                                title="Move back to pending"
                                            >
                                                Restore
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                style={styles.deleteBtn}
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

const styles = {
    page: {
        minHeight: "100vh",
        background: "#F7F5FF",
        display: "flex",
        justifyContent: "center",
        padding: "48px 20px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
    },
    container: {
        width: "100%",
        maxWidth: "980px",
    },
    header: {
        textAlign: "center",
        marginBottom: "24px",
    },
    title: {
        fontSize: "32px",
        fontWeight: 700,
        color: "#2D3436",
        margin: 0,
    },
    subtitle: {
        color: "#8395A7",
        fontSize: "14px",
        marginTop: "4px",
    },
    form: {
        display: "flex",
        gap: "10px",
        marginBottom: "32px",
    },
    input: {
        flex: 1,
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #E0DDF5",
        outline: "none",
        fontSize: "15px",
        background: "#FFFFFF",
    },
    addBtn: {
        padding: "12px 22px",
        background: "#6C5CE7",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: "15px",
    },
    board: {
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
    },
    column: {
        flex: 1,
        minWidth: "260px",
        background: "#FFFFFF",
        borderRadius: "14px",
        padding: "20px",
        boxShadow: "0 4px 14px rgba(108, 92, 231, 0.08)",
    },
    columnTitle: {
        fontSize: "16px",
        fontWeight: 700,
        marginBottom: "14px",
    },
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    pendingItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#F4F2FF",
        borderRadius: "10px",
        padding: "10px 12px",
    },
    completedItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#EDFBF6",
        borderRadius: "10px",
        padding: "10px 12px",
    },
    cancelledItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#F1F2F6",
        borderRadius: "10px",
        padding: "10px 12px",
    },
    checkLabel: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
    },
    checkbox: {
        width: "18px",
        height: "18px",
        cursor: "pointer",
        accentColor: "#6C5CE7",
    },
    todoText: {
        fontSize: "15px",
        color: "#2D3436",
    },
    completedText: {
        fontSize: "15px",
        color: "#7F9C93",
        textDecoration: "line-through",
    },
    cancelledText: {
        fontSize: "15px",
        color: "#B2BEC3",
        textDecoration: "line-through",
    },
    actions: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    cancelBtn: {
        background: "#FFF0EA",
        color: "#E17055",
        border: "none",
        borderRadius: "8px",
        padding: "6px 10px",
        fontSize: "12px",
        cursor: "pointer",
        fontWeight: 600,
    },
    restoreBtn: {
        background: "#F4F2FF",
        color: "#6C5CE7",
        border: "none",
        borderRadius: "8px",
        padding: "6px 10px",
        fontSize: "12px",
        cursor: "pointer",
        fontWeight: 600,
    },
    deleteBtn: {
        background: "transparent",
        color: "#B2BEC3",
        border: "none",
        fontSize: "14px",
        cursor: "pointer",
        padding: "4px 8px",
    },
    emptyText: {
        color: "#B2BEC3",
        fontSize: "14px",
    },
};

export default TodoApp;