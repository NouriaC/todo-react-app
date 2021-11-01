import React, { useState, useEffect } from "react";
import './App.css';
import Form from './components/Form';
import TodoList from "./components/TodoList";

function App() {
  const [ inputText, setInputText ] = useState("");
  const [ todos, setTodos ] = useState([]);
  const [ status, setStatus ] = useState("all");
  const [ filteredTodos, setFilteredTodos ] = useState([]);

  useEffect(() => {
    const filterHandler = () => {
      switch(status) {
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
        }
    }
    filterHandler()
  }, [todos, status]);

//Save to Local
const saveLocalTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Only runs once 
  useEffect(() => {
    const getLocalTodos = () => {
      if(localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
       setTodos(todoLocal);
      }
    }
    getLocalTodos()
  }, [])


  return (
    <div className="App">
      <header>
        <h1>Nouria's Todo List</h1>
      </header>
      <Form 
      todos={todos} 
      setTodos={setTodos} 
      inputText={inputText}
      setInputText={setInputText}
      setStatus={setStatus}/>
      <TodoList 
      todos={todos}
      setTodos={setTodos}
      filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
