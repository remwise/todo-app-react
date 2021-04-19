import React, { Component } from 'react';

import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';
import SearchPanel from '../search-panel';
import ToDoList from '../todo-list';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    toDoData: [
      this.createToDoItem('Drink cofee'),
      this.createToDoItem('Build React App'),
      this.createToDoItem('Have a lunch'),
    ],
    searchText: '',
    filter: 'all',
  };

  createToDoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    };
  }

  deleteItem = id => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex(el => el.id === id);
      const newArray = [...toDoData.slice(0, idx), ...toDoData.slice(idx + 1)];

      return {
        toDoData: newArray,
      };
    });
  };

  addItem = text => {
    const newItem = this.createToDoItem(text);

    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newItem];

      return {
        toDoData: newArray,
      };
    });
  };

  onChangeSearch = searchText => {
    this.setState({ searchText });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'important'),
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ toDoData }) => {
      return {
        toDoData: this.toggleProperty(toDoData, id, 'done'),
      };
    });
  };

  onFilterStatusChange = filter => {
    this.setState({ filter });
  };

  search(arr, searchText) {
    if (searchText === '') {
      return arr;
    }

    return arr.filter(item => {
      return item.label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
    });
  }

  filter(arr, filter) {
    switch (filter) {
      case 'all':
        return arr;

      case 'active':
        return arr.filter(item => {
          return !item.done;
        });

      case 'done':
        return arr.filter(item => {
          return item.done;
        });

      default:
        return arr;
    }
  }

  render() {
    const { toDoData, searchText, filter } = this.state;

    const visibleData = this.filter(this.search(toDoData, searchText), filter);

    const doneCount = toDoData.filter(el => el.done).length;
    const toDoCount = toDoData.length - doneCount;

    return (
      <div className="app">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="d-flex flex-row bd-highlight mb-3">
          <SearchPanel onChangeSearch={this.onChangeSearch} />
          <ItemStatusFilter
            filter={filter}
            onFilterStatusChange={this.onFilterStatusChange}
          />
        </div>
        <ToDoList
          todos={visibleData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
