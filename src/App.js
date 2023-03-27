import React from "react";
import "./App.css";
import line from "./images/Rectangle.png";
import { useState } from "react";

function App() {
  const [addTask, setAddTask] = useState([]);
  const [addValue, setAddValue] = useState("");
 
  const handleAddTask = () => {
    if (addValue.trim()) {
      setAddTask([...addTask,{task:addValue, active:true, id:Math.floor(Math.random(3 * 1000) * 1000)}]);
      setAddValue("");
    }
  };
console.log(addTask);
  const handleDeleteTask = (index) => {
    const newTaskList = addTask.filter((task, i) => i !== index);
    setAddTask(newTaskList);
  };

  const handleInputChange = (event) => {
    setAddValue(event.target.value);
  };

  const handleDeleteAll = () => {
    setAddTask([]); 
  };

const handleChange = (id) =>{
  
  setAddTask(addTask.map(todo =>{
    if(todo.id === id){
      todo.active = !todo.active
    }
    return todo;
  }))
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
            <button className="add" onClick={handleAddTask}>
              +{" "}
            </button>
            <button className="clear" onClick={handleDeleteAll}>
              Clear
            </button>
          </span>
        </div>
        <ul className="todoList">
          {addTask.map((task, index) => {
            return (
              <div className="oneItem" key={index}>
                <li className={`${task.active === true ? "todoListInner" : "listActive"}`} >
                  <input onClick={()=>handleChange(task.id)} className="check" type="checkbox" />
                  {task.task}

                  <button
                    className="delButton"
                    onClick={() => handleDeleteTask(index)}
                  >
                    X
                  </button>
                </li>

                <img src={line} alt="" />
              </div>
            );
          })}
        </ul>
      </div>
      <div className="footer">
        <div className="leftItems">{addTask.length} Items </div>
        <div className="all">All </div>
        <div className="active">active</div>
        <div className="completed">completed</div>
        <div className="clearCompleted">clear completed</div>
      </div>
    </>
  );
}

export default App;
