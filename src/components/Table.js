import React, { Component } from 'react';

export default class Table extends Component {
  state = {
    page: 0,
    perPage: 25
  }

  handleClickPrevious = () => {
    this.setState({ page: this.state.page - 1 });
  };

  handleClickNext = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const columnHeaders = this.props.columns.map((col) => (
      <th key={col.name}>{col.name}</th>
    ));

    const tbodyRows = this.props.rows.map((row) => {
      const tbodyRow = this.props.columns.map((col) => {
        const cellValue = this.props.format(col.property, row[col.property]);
        return (<td key={col.property}>{cellValue}</td>);
      });
      return (
        <tr key={`${row.airline}:${row.src}:${row.dest}`}>
          {tbodyRow}
        </tr>
      );
    });

    const lowerBound = (this.state.page) * this.state.perPage;
    const upperBound = (this.state.page + 1) * this.state.perPage;
    const filteredRows = tbodyRows.slice(lowerBound, upperBound);

    return (
      <div>
        <table className={this.props.className}>
          <thead>
            <tr>{columnHeaders}</tr>
          </thead>
          <tbody>
            {filteredRows}
          </tbody>
        </table>
        <div className="pagination">
          <p className="page">
            Showing {lowerBound + 1}-{upperBound} routes of {this.props.rows.length} total routes
        </p>
          <button
            id="previous"
            onClick={this.handleClickPrevious}
            disabled={this.state.page <= 0}
          >
            Previous Page
        </button>
          <button
            id="next"
            onClick={this.handleClickNext}
            disabled={this.state.page >= Math.floor(this.props.rows.length / this.state.perPage) - 1}
          >
            Next Page
        </button>
        </div>
      </div>
    )
  }
}