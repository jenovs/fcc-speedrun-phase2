import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import './legend.scss';

const Legend = (props) => (
  <g transform={`translate(${0}, ${props.y+30})`}>
    <text>Legend: {props.data}</text>
  </g>
)

export default Legend;
