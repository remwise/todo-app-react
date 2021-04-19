import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchText: '',
  };

  onChangeSearch = e => {
    const searchText = e.target.value;
    this.setState({ searchText });
    this.props.onChangeSearch(searchText);
  };

  render() {
    return (
      <input
        className="form-control search-panel"
        placeholder="Введите данные для поиска"
        onChange={this.onChangeSearch}
        value={this.state.searchText}
      />
    );
  }
}
