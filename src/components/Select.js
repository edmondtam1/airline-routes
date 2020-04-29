import React, { Component } from 'react';

export default class Select extends Component {
  handleSelectChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    if (this.props.valueKey === 'id' && value !== 'all') value = +value;
    this.props.onSelect(value);
  }

  sortByAlphabet = (a, b) => {
    if (a.props.children < b.props.children) return -1;
    if (a.props.children > b.props.children) return 1;
    return 0;
  }

  render() {
    const defaultOption = (<option key='all' value='all'>
      {this.props.allTitle}
    </option>);

    const options = [defaultOption].concat(this.props.options.map(option => {
      const key = option[this.props.valueKey];
      return (<option key={key} value={key}>{option[this.props.titleKey]}</option>);
    }).sort(this.sortByAlphabet));

    return (
      <select
        onChange={this.handleSelectChange}
        value={this.props.value}
      >
        {options}
      </select>
    )
  }
}