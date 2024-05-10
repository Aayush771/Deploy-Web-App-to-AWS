import React from 'react';

function TodoList({ todos, deleteTodo, markAsComplete }) {
  return (
    <ul class="todo-list">
      {todos.map(todo => (
        <li class="todo-item" key={todo.id}>
          {todo.description}
          <div>
            <button class="green" onClick={() => markAsComplete(todo.id)}>Done</button>
            <button class="red" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>          
        </li>
      ))}
    </ul>
  );
}

export default TodoList;