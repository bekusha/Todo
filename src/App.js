import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import TODO from "./images/Todo mobile.svg";
import x from "./images/X.svg";

function App() {
  const [addTask, setAddTask] = useState([]);
  const [addValue, setAddValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    axios
      .get("https://todo-server-77c8.onrender.com/todos")
      .then((response) => {
        setAddTask(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
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
        })
        .catch((error) => {
          console.log(error);
        });
      setAddValue("");
      fetchData();
    }
  };

  const handleDeleteTask = (id) => {
    const newTaskList = addTask.filter((task) => task.id !== id);

    axios
      .delete(`https://todo-server-77c8.onrender.com/todos/${id}`)
      .then(() => {
        setAddTask(newTaskList);
        fetchData();
        console.log(newTaskList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setAddValue(event.target.value);
  };

  const handleChange = (id) => {
    setAddTask(
      addTask.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            active: !task.active,
          };
        }
        return task;
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
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            addTask.map((task) => (
              <div className="oneItem" key={task.id}>
                <li
                  className={`${task.active ? "listActive" : "todoListInner"}`}
                >
                  <input
                    onClick={() => handleChange(task.id)}
                    className="check"
                    type="checkbox"
                  />
                  {task.title}
                  <img
                    src={x}
                    className="delButton"
                    onClick={() => handleDeleteTask(task.id)}
                    alt=""
                  />
                </li>
              </div>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
