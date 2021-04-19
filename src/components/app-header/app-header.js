import React from 'react';

import './app-header.css';

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex justify-content-between">
      <h1>ToDo List</h1>
      <div className="info">
        <span className="badge badge-primary float-right">{toDo} осталось</span>
        <span className="badge badge-success float-right">
          {done} выполнено
        </span>
      </div>
    </div>
  );
};

export default AppHeader;
