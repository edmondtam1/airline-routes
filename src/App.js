import React, { Component } from 'react';
import './App.css';
import { routes, airlines, airports } from './data';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <th>Airline</th>
                <th>Source airport</th>
                <th>Destination airport</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, idx) => (
                <tr key={idx}>
                  <td>{route.airline}</td>
                  <td>{route.src}</td>
                  <td>{route.dest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;