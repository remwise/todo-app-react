import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {
  buttons = [
    { name: 'all', label: 'Все' },
    { name: 'active', label: 'Активные' },
    { name: 'done', label: 'Выполненные' },
  ];

  render() {
    const { filter, onFilterStatusChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const className = isActive ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button
          key={name}
          type="button"
          className={`btn ${className}`}
          onClick={() => {
            onFilterStatusChange(name);
          }}
        >
          {label}
        </button>
      );
    });

    return <div className="btn-group">{buttons}</div>;
  }
}
