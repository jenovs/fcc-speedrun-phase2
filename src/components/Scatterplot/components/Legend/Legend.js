import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import './legend.scss';

const Legend = (props) => (
  <g transform={`translate(${props.x}, ${props.y})`}>
    <circle r="5" style={{fill: 'green', stroke: 'black'}}/>
    <text dx="8" dy="5">No doping allegations</text>
    <circle cy="16" r="5" style={{fill: 'red', stroke: 'black'}}/>
    <text dx="8" dy="22">Alleged doping use</text>
  </g>
)

export default Legend;
