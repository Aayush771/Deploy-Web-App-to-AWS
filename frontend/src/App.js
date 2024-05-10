// App.js
import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import CompletedTodoList from './CompletedTodoList';
import AddTodoForm from './AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/todo');
      const data = await response.json();
      setTodos(data.filter(t => !t.complete));
      setcompletedTodos(data.filter(t => t.complete));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (description) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, isComplete: false }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/v1/todo/${id}`, {
        method: 'DELETE',
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const markAsComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      try {
        todo.complete = true;
        const response = await fetch('http://localhost:8080/api/v1/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        });
        fetchTodos();
      }
      catch (error) {
        console.error('Error saving todo:', error);
      }
    }
  };

  return (
    <div class="container">
      <h1>Todo App</h1>
      <AddTodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} markAsComplete={markAsComplete} />
      <h2>Completed</h2>
      <CompletedTodoList todos={completedTodos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
