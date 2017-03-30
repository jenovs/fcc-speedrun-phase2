// import * as d3 from 'd3';
import { timeParse, scaleTime, scaleLinear, max, domain, range } from 'd3';
import React from 'react';

import Axis from './../Axis';
import Bar from './../Bar';
import Tooltip from './../Tooltip';

import './barChart.scss';

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};

class BarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
      data: props.data,
      totalWidth: props.width,
      totalHeight: props.height,
    };

    this.handleTooltip = this.handleTooltip.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalWidth: nextProps.width,
      totalHeight: nextProps.height,
      // data: nextProps.data,
    })
  }

  handleTooltip(e, data) {
    e.persist();
    if (e.type === 'mouseenter') {
      this.setState(state => ({
        showTooltip: true,
        cursorX: e.pageX,
        cursorY: e.pageY,
        currData: data,
      }))
    }
    else if (e.type === 'mouseleave') {
      this.setState(state => ({
        showTooltip: false,
      }))
    }
  }

  render() {
    const { showTooltip, cursorX, cursorY, data, totalWidth, totalHeight, currData } = this.state;

    return (
      <div>
        <div>{data ? renderChart(data.data, this.handleTooltip, totalWidth, totalHeight) : 'Loading...'}</div>
        {showTooltip && <Tooltip x={cursorX} y={cursorY} data={currData}/>}
      </div>
    )
  }
}

function renderChart(data, handleTooltip, totalWidth, totalHeight) {
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const parseTime = timeParse('%Y-%m-%d');

  const x = scaleTime()
    .domain([new Date(data[0][0]), new Date(data[data.length-1][0])])
    .range([0, width]);

  const maxY = max(data, d => d[1]);

  const y = scaleLinear()
    // .domain([0, d3.max(data, d => d[1])])
    .domain([0, maxY + maxY * 0.02])
    .range([height, 0]);

  const xAxisSettings = {
    orient: 'bottom',
    scale: x,
    transform: `translate(${margin.left}, ${height})`,
    size: width,
  }

  const yAxisSettings = {
    orient: 'left',
    scale: y,
    transform: `translate(${margin.left}, ${0})`,
    size: height,
  }

  return (
    <svg width={totalWidth} height={totalHeight}>
      <svg width={width} height={height} transform={`translate(${0})`} x={margin.left}>
        {data.map((d, i) => {
          return (
            <Bar
              data={d}
              handleTooltip={handleTooltip}
              key={i}
              totalHeight={height}
              totalWidth={width}
              height={height - y(d[1])}
              width={totalWidth/data.length}
              x={width/data.length * i}
              y={y(d[1])}
            />
          )
        })}
      </svg>
      <Axis {...xAxisSettings} id={"x-axis"} />
      <Axis {...yAxisSettings} id={"y-axis"} />
      <text y={60} x={-50} style={{'textAnchor': 'middle'}} dy="1em" transform="rotate(-90)">{totalWidth > 300 && 'USD Billion'}</text>
      {totalWidth > 300 && <text y={margin.top*2} x={width/2} id="title" className="bar-chart__title" style={{'textAnchor': 'middle'}} >US GDP</text>}
    </svg>
  )
}

export default BarChart;
