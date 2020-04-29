import React, { Component } from 'react';
import DATA from '../data';

export default class Table extends Component {
  handleMapClick = (e) => {
    e.preventDefault();
    this.props.onClick(e.target.parentElement.getAttribute('route'));
  }

  render() {
    const parsedRoutes = this.props.routes.map(route => {
      const src = DATA.getAirportByCode(route.src);
      const dest = DATA.getAirportByCode(route.dest);
      return {
        x1: src.long,
        y1: src.lat,
        x2: dest.long,
        y2: dest.lat,
        key: route.airline + route.src + route.dest,
      }
    });

    return (

      // min-x, min-y, width and height
      <svg className="map" viewBox="-180 -90 360 180">
        <g transform="scale(1 -1)">
          <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)" />

          {parsedRoutes.map((route) => {
            const { x1, y1, x2, y2, key } = route;
            return (
              <g key={key} route={key} onClick={this.handleMapClick} >
                <circle className="source" cx={x1} cy={y1}>
                  <title></title>
                </circle>
                <circle className="destination" cx={x1} cy={y1}>
                  <title></title>
                </circle>
                <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
              </g>
            )
          })}
        </g>
      </svg>
    )
  }
}
