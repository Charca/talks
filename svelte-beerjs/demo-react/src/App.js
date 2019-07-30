import React, { useState } from "react";
import { uuid } from "./utils";

const FILTER_TITLES = ["All", "Active", "Completed"];

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("All");
  const numActive = todos.filter(todo => todo.completed === false).length;
  const filteredTodos =
    filter === "All"
      ? todos
      : filter === "Active"
      ? todos.filter(todo => todo.completed === false)
      : todos.filter(todo => todo.completed !== false);

  function addTodo(event) {
    event.preventDefault();

    setTodos([
      ...todos,
      {
        id: uuid(),
        completed: false,
        text: newTodo
      }
    ]);

    setNewTodo("");
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => todo.completed === false));
  }

  return (
    <div>
      <header className="header">
        <h1>Reactodo</h1>
        <form onSubmit={addTodo}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label>{todo.text}</label>
                <button
                  className="destroy"
                  onClick={() => deleteTodo(todo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{`${numActive} item(s) left`}</strong>
        </span>
        <ul className="filters">
          {FILTER_TITLES.map(filterName => (
            <li key={filterName}>
              <a
                className={filter === filterName ? "selected" : ""}
                style={{ cursor: "pointer" }}
                onClick={() => setFilter(filterName)}
              >
                {filterName}
              </a>
            </li>
          ))}
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </div>
  );
}

export default App;
