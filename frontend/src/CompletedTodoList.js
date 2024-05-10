import React from 'react';

function CompletedTodoList({ todos, deleteTodo }) {
  return (
    <ul class="todo-list complete">
      {todos.map(todo => (
        <li class="todo-item complete" key={todo.id}>
          {todo.description}
          <div>
            <button class="red" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>          
        </li>
      ))}
    </ul>
  );
}

export default CompletedTodoList;