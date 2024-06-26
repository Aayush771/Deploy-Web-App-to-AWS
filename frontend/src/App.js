import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './TodoList';
import CompletedTodoList from './CompletedTodoList';
import AddTodoForm from './AddTodoForm';
import './App.css';
import { BASE_URL } from './config';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const API_ENDPOINT = `${BASE_URL}/api/v1/todo`;

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setTodos(data.filter(t => !t.complete));
      setcompletedTodos(data.filter(t => t.complete));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [API_ENDPOINT]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (description) => {
    try {
      const response = await fetch(API_ENDPOINT, {
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
      await fetch(`${API_ENDPOINT}/${id}`, {
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
        await fetch(API_ENDPOINT, {
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
