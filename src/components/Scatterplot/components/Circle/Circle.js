import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import './circle.scss';

class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { };
    const dur = Math.floor(Math.random() * 500 + 1000)

    this.transition = d3.transition().duration(dur).ease(d3.easeCubicInOut);
  }

  componentDidMount() {
    const dur = Math.floor(Math.random() * 1000)
    let node = d3.select(ReactDOM.findDOMNode(this));
    setTimeout(() => {
      node.transition(this.transition)
      .attr('r', 5)
    }, dur);
  }

  handleCover(e, d) {
    const transition = d3.transition().duration(100).ease(d3.easeCubicInOut);
    let node = d3.select(ReactDOM.findDOMNode(this));

    if (e.type === 'mouseenter') {
      node.transition(transition).attr('r', 15)
    }
    if (e.type === 'mouseleave') {
      node.transition(transition).attr('r', 5)
    }

    this.props.handleTooltip(e, d);
  }

  render() {
    const { d, x, y} = this.props;

    return (
      <circle
        onMouseEnter={e => this.handleCover(e, d)}
        onMouseLeave={e => this.handleCover(e, d)}
        onClick={e => this.handleCover(e, d)}
        className="circle"
        r="0"
        style={{fill: (d.Doping ? 'red' : 'green')}}
        cx={x(d.Year)}
        cy={y(d3.timeParse("%M:%S")(d.Time))}
      />
    )
  }
}

export default Circle;
