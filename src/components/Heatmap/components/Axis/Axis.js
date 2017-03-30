import * as d3 from 'd3';
import { axisBottom, axisLeft, select, call } from 'd3';
import React from 'react';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const { orient, scale, tickFormat } = this.props;
    const d3orient = {
      bottom: (scale) => d3.axisBottom(scale),
      left: (scale) => d3.axisLeft(scale),
    }
    const d3format = {
      format: (i) => d3.format(i),
      timeFormat: (i) => d3.timeFormat(i),
    }
    const tickCount = this.props.size / 50 < 3 ? 3 : this.props.size / 50;
    const node = this.refs.axis;
    const axis = d3orient[orient](scale)
      .tickFormat(d3format[tickFormat[0]](tickFormat[1]))
      .ticks(tickCount);

    d3.select(node).call(axis);
  }

  render() {
    return (
      <g ref="axis" transform={this.props.transform} id={this.props.id}></g>
    )
  }
}
