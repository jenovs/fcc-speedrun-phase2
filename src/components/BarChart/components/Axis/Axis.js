// import * as d3 from 'd3';
import { axisBottom, axisLeft, select, call } from 'd3';
import React from 'react';
// import ReactDOM from 'react-dom';

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const orient = {
      bottom: (scale) => axisBottom(scale),
      left: (scale) => axisLeft(scale),
    }
    const tickCount = this.props.size / 50 < 3 ? 3 : this.props.size / 50;
    const node = this.refs.axis;
    const axis = orient[this.props.orient](this.props.scale).ticks(tickCount);
    select(node).call(axis);
  }

  render() {
    return (
      <g ref="axis" transform={this.props.transform} id={this.props.id}></g>
    )
  }
}
