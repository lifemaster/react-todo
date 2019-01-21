import React from 'react';

import TodoListItem from './todo-list-item';

import './todo-list.css';

const TodoList = ({todos}) => {
  const elements = todos.map(todo => {

    const { id, ...itemProps } = todo;

    return (
      <li key={id} className="list-group-item">
        <TodoListItem {...itemProps} />
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">{elements}</ul>
  );
};

export default TodoList;