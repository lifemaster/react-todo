import React, { Component } from 'react';

import './app.css';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App', true),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all' // active, all, done
  };

  createTodoItem(label, isImportant = false) {
    return {
      label,
      important: isImportant,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(todo => todo.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return { todoData: newArray };
    });
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      return { todoData: [...todoData, newItem] };
    });
  }

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex(todo => todo.id === id);
    const newItem = {...arr[index], [propName]: !arr[index][propName] };
    const newArray = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];

    return newArray;
  }

  toggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'important') };
    });
  }

  toggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'done') };
    });
  }

  searchChangeHandler = (term) => {
    this.setState({ term });
  }

  filterChangeHandler = filter => {
    this.setState({ filter });
  }

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);

    const doneCount = todoData.filter(todo => todo.done).length;
    const todoCount = todoData.filter(todo => todo.important).length;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.searchChangeHandler}/>
          <ItemStatusFilter filter={filter} onFilterChange={this.filterChangeHandler}/>
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.toggleImportant}
          onToggleDone={this.toggleDone}
        />

        <ItemAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}