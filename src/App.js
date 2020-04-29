import React, { Component } from 'react';
import './App.css';
import DATA from './data';
import Select from './components/Select';
import Table from './components/Table';

export const defaultState = 'all';

class App extends Component {
  state = {
    airline: defaultState,
    airport: defaultState,
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value);
    } else {
      return DATA.getAirportByCode(value);
    }
  };

  routeHasCurrentAirline = (route) => {
    return route.airline === this.state.airline || this.state.airline === defaultState;
  };

  routeHasCurrentAirport = (route) => {
    return route.src === this.state.airport || route.dest === this.state.airport || this.state.airport === defaultState;
  }

  onAirlineFilter = (airline) => this.setState({ airline });

  onAirportFilter = (airport) => this.setState({ airport });

  handleClear = () => {
    this.setState({ airline: defaultState, airport: defaultState });
  }

  isReset = () => this.state.airline === defaultState && this.state.airport === defaultState;

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const filteredRoutes = DATA.routes.filter(route => {
      return this.routeHasCurrentAirline(route) && this.routeHasCurrentAirport(route);
    });

    const filteredAirlines = DATA.airlines.filter(airline => {
      return airline.id === this.state.airline || this.state.airline === defaultState;
    });

    const filteredAirports = DATA.airports.filter(airport => {
      return airport.code === this.state.airport || this.state.airport === defaultState;
    });

    const subFilteredAirlines = filteredAirlines.filter(airline => {
      return filteredRoutes.some(route => route.airline === airline.id);
    });

    const subFilteredAirports = filteredAirports.filter(airport => {
      return filteredRoutes.some(route => route.src === airport.code || route.dest === airport.code);
    });

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Show routes on
            <Select
              options={subFilteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airline}
              onSelect={this.onAirlineFilter}
            />
            flying in or out of
            <Select
              options={subFilteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airport}
              onSelect={this.onAirportFilter}
            />
            <button
              name="clearFilters"
              onClick={this.handleClear}
              disabled={this.isReset()}
            >
              Clear filters
            </button>
          </p>
          <Table className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
            key={this.state.airline + ':' + this.state.airport}
          />
        </section>
      </div>
    );
  }
}

export default App;