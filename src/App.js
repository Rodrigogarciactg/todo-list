import "./App.css";
import React, { useState } from "react";

function App() {
  // useState always returns an array with two items in it
  // then create two variables to store the first & second item of the array
  // ("") = starting value of the state
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false,
    };

    // setTodos and pass in a brand new array containing all current todos + 1 more
    setTodos([...todos, todoItem]);
    setNewTodo("");
  };

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((todo, i) => {
      return i != delIdx;
    });
    setTodos(filteredTodos);
  };

  const handleToggleComplete = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
        // To avoid mutating the todo directly, do this:
        // const updatedTodo = { ...todo, complete: !todo.complete };
        // return updatedTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form
        onSubmit={(event) => {
          handleNewTodoSubmit(event);
        }}
      >
        <h1>Todo List</h1>
        <input
          onChange={(event) => {
            setNewTodo(event.target.value);
          }}
          type="text"
          value={newTodo}
        />
        <div>
          <button>Add</button>
        </div>
      </form>
      <hr />
      {todos.map((todo, i) => {
        const todoClasses = ["bold", "italics"];

        if (todo.complete) {
          todoClasses.push("line");
        }

        return (
          <div key={i}>
            <input
              onChange={(event) => {
                handleToggleComplete(i);
              }}
              checked={todo.complete}
              type="checkbox"
            />
            <span className={todoClasses.join(" ")}>{todo.text}</span>
            <button
              onClick={(event) => {
                handleTodoDelete(i);
              }}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
