import * as d3 from 'd3';
import React from 'react';

import Axis from './../Axis';
import Circle from './../Circle';
import Legend from './../Legend';
import Tooltip from './../Tooltip';

import './scatterplot.scss';

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};

export default class Scatterplot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      showTooltip: false,
    }

    this.handleTooltip = this.handleTooltip.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalWidth: nextProps.width,
      totalHeight: nextProps.height,
    })
  }

  handleTooltip(e, d) {
    e.persist();
    if (e.type === 'mouseenter') {
      this.setState(() => ({
        showTooltip: true,
        cursorX: e.pageX,
        cursorY: e.pageY,
        currData: d,
      }))
    }
    else if (e.type === 'mouseleave') {
      this.setState(() => ({
        showTooltip: false,
      }))
    }
    // else if (e.type === 'click') {
    //   if (this.state.showTooltip) {
    //     this.setState(state => ({
    //       showTooltip: false,
    //     }))
    //   }
    // }
  }

  render() {
    const { showTooltip, cursorX, cursorY, data, totalWidth, totalHeight, currData } = this.state;

    return (
      <div>
        <div>{data ? renderChart(data, this.handleTooltip, totalWidth, totalHeight) : 'Loading...'}</div>
        {showTooltip && <Tooltip x={cursorX} y={cursorY} data={currData}/>}
      </div>
    )
  }
}



function renderChart(data, handleTooltip, totalWidth, totalHeight) {
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;
  const extX = d3.extent(data, d => d.Year);
  const extY = d3.extent(data, d => d.Time);

  const timeMin = d3.timeParse('%M:%S')(extY[0])
  const timeMax = d3.timeParse('%M:%S')(extY[1])
  const timeMinMinus = d3.timeSecond.offset(timeMin, -15)
  const timeMaxPlus = d3.timeSecond.offset(timeMax, 15)

  const x = d3.scaleLinear()
    .domain([extX[0]-1, extX[1]+1])
    .range([0, width]);

  const y = d3.scaleTime()
    .domain([timeMinMinus, timeMaxPlus])
    .range([0, height]);

  const xAxisSettings = {
    orient: 'bottom',
    scale: x,
    transform: `translate(${margin.left}, ${height})`,
    size: width,
    tickFormat: ['format', 'd'],
  }

  const yAxisSettings = {
    orient: 'left',
    scale: y,
    transform: `translate(${margin.left}, ${0})`,
    size: height,
    tickFormat: ['timeFormat', '%M:%S'],
  }

  return (
    <svg width={totalWidth} height={totalHeight}>
      <svg width={width} height={height} transform={`translate(${0})`} x={margin.left}>
        {data.map((d, i) => {
          return (
            <Circle key={i} d={d} x={x} y={y} handleTooltip={handleTooltip} />
          )
        })}
      </svg>
      <Axis {...xAxisSettings} id={"x-axis"} />
      <Axis {...yAxisSettings} id={"y-axis"} />
      {totalWidth > 500 && <Legend y={height/3} x={width-120} style={{'textAnchor': 'right'}} />}
      {totalWidth > 450 && <text y={margin.top*2} x={width/1.5} id="title" className="scatterplot__title" style={{'textAnchor': 'middle'}} >Doping in Bicycle Racing</text>}
    </svg>
  )
}
