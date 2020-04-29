import React, { Component } from 'react';
import './App.css';
import DATA from './data';
import Map from './components/Map';
import Select from './components/Select';
import Table from './components/Table';

export const defaultState = 'all';

class App extends Component {
  state = {
    airline: defaultState,
    airport: defaultState,
    route: null,
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
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
    this.setState({ airline: defaultState, airport: defaultState, route: null });
  }

  isReset = () => this.state.airline === defaultState && this.state.airport === defaultState;

  onMapSetRoute = (route) => {
    const code = route.match(/(\d+)([A-Z]{3})([A-Z]{3})/);
    this.setState({ airline: +code[1], airport: code[2], route });
  }

  onMapResetRoutes = () => this.handleClear();

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const filteredRoutes = DATA.routes.filter(route => {
      if (this.state.route) {
        return this.state.route === `${route.airline}${route.src}${route.dest}`;
      } else {
        return this.routeHasCurrentAirline(route) && this.routeHasCurrentAirport(route);
      }
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

    const mapOnClick = this.state.route ? this.onMapResetRoutes : this.onMapSetRoute;

    return (
      <div className="app" >
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map
            routes={filteredRoutes}
            onClick={mapOnClick}
          />
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