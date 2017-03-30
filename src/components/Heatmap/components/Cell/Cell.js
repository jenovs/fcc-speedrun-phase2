import * as d3 from 'd3';
import React from 'react';

import './main.scss';

export default class Cell extends React.Component {
  render() {
    const { x, y, height, width, color, d, handleTooltip } = this.props;

    return (
      <rect
        onMouseEnter={handleTooltip}
        onMouseLeave={handleTooltip}
        onClick={handleTooltip}
        x={x}
        y={y}
        height={height}
        width={width}
        style={{fill: color}}/>
    )
  }
}
