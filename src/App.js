import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TODO from "./images/Todo mobile.svg";

import x from "./images/X.svg";
function App() {
  const [addTask, setAddTask] = useState([]);
  const [addValue, setAddValue] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("https://todo-server-77c8.onrender.com/todos")
      .then((response) => {
        setAddTask(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddTask = async () => {
    if (addValue.trim()) {
      const newTask = {
        title: addValue,
        active: false,
      };
      axios
        .post("https://todo-server-77c8.onrender.com/todos", newTask)
        .then((response) => {
          setAddTask([...addTask, response.data]);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setAddValue("");
      fetchData();
    }
  };

  const handleDeleteTask = (id) => {
    const newTaskList = addTask.filter((task, i) => i !== id);

    axios
      .delete(`https://todo-server-77c8.onrender.com/todos/${id}`)

      .then(() => {
        setAddTask(newTaskList);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setAddValue(event.target.value);
  };

  const handleDeleteAll = () => {
    setAddTask([]);
  };

  const handleChange = (id) => {
    setAddTask(
      addTask.map((todo) => {
        if (todo.id === id) {
          todo.active = !todo.active;
        }
        return todo;
      })
    );
  };

  return (
    <>
      <div className="container">
        <div className="headImages">
          <img className="todoHeading" src={TODO} alt="" />
        </div>
        <div className="input">
          <input
            className="addTodo"
            value={addValue}
            onChange={handleInputChange}
            type="text"
            placeholder="add Todo..."
          />
          <span className="addButton">
            <button className="add" onClick={handleAddTask}>
              +{" "}
            </button>
          </span>
        </div>
        <ul className="todoList">
          {addTask.map((title, index) => {
            console.log(title);
            return (
              <div className="oneItem" key={index}>
                <li
                  className={`${
                    title.active === true ? "listActive" : "todoListInner"
                  }`}
                >
                  <input
                    onClick={() => handleChange(title.id)}
                    className="check"
                    type="checkbox"
                  />
                  {title.title}
                  <img
                    src={x}
                    className="delButton"
                    onClick={() => handleDeleteTask(title.id)}
                    alt=""
                  />
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
