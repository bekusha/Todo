import React from "react";
import "./App.css";
import line from "./images/Rectangle.png";
import { useState } from "react";

function App() {
  const [addTask, setAddTask] = useState([]);
  const [addValue, setAddValue] = useState("");
  
  const handleAddTask = () => {
    if (addValue.trim()) {
      setAddTask([...addTask, addValue.trim()]);
      setAddValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTaskList = addTask.filter((task, i) => i !== index);
    setAddTask(newTaskList);
  };

  const handleInputChange = (event) => {
    setAddValue(event.target.value);
  };
 
const handleDeleteAll = () =>{
  setAddTask([]);
}
  return (
    <>
      <div className="container">
        <h1 className="todoHeading">Todo</h1>
        <div className="input">
          <input
            className="addTodo"
            value={addValue}
            onChange={handleInputChange}
            type="text"
            placeholder="add Todo..."
          />
          <span className="addButton">
            <button className="add" onClick={handleAddTask}>+ </button>
            <button className="clear" onClick={handleDeleteAll}>Clear</button>
          </span>
        </div>
        <ul className="todoList">
          {addTask.map((task, index) => {
            return (
              <div className="oneItem" key={index}>
                <li className="todoListInner">
                <input className="check" type="checkbox" />
                  {task}
                  

                  <button className="delButton" onClick={() => handleDeleteTask(index)}>X</button>
                  
                  
                </li>

                <img src={line} alt="" />
              </div>
            );
          })}
           
        </ul>
       
      </div>
    </>
  );
}

export default App;
