// import * as d3 from 'd3';
import { transition, duration, ease, easeCubicInOut, select, attr } from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import './bar.scss';

export default class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...props, y: props.totalHeight};
    this.transition = transition().duration(950).ease(easeCubicInOut);
  }

  componentDidMount() {
    let node = select(ReactDOM.findDOMNode(this));
    node.transition(this.transition)
      .attr('y', this.props.y)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalWidth: nextProps.totalWidth,
      totalHeight: nextProps.totalHeight,
      height: nextProps.height,
      width: nextProps.width,
      x: nextProps.x,
      y: nextProps.y,
    })
  }

  handleCover(e, data) {
    if (e.type === 'mouseenter') {
      this.setState(state => ({
        style: {fill: 'yellow'},
      }));
    }
    if (e.type === 'mouseleave') {
      this.setState(state => ({
        style: {fill: 'teal'},
      }));
    }
    this.props.handleTooltip(e, data);
  }

  render() {
    const { style, height, width, x, y } = this.state;
    const { data } = this.props;
    return (
      <rect
        className="bar bar__rect"
        data-date={data[0]}
        data-gdp={data[1]}
        onMouseEnter={e => this.handleCover(e, data)}
        onMouseLeave={e => this.handleCover(e, data)}
        onClick={e => this.handleCover(e, data)}
        style={style}
        height={height}
        width={width}
        x={x}
        y={y}
      />
    )
  }
}
