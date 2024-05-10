// AddTodoForm.js
import React, { useState } from 'react';

function AddTodoForm({ addTodo }) {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!description.trim()) return;
    addTodo(description);
    setDescription('');
  };

  return (
    <form class="add-todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodoForm;
