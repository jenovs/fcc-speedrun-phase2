import * as d3 from 'd3';
import React from 'react';

import Axis from './../Axis';
import Cell from './../Cell';
import Legend from './../Legend';
import Tooltip from './../Tooltip';

import './heatmap.scss';

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};

const colors = [
  '#cc7a00',
  '#e68a00',
  '#ff9900',
  '#ffa31a',
  '#ffad33',
  '#ffb84d',
  '#ffc266',
  '#ffd699',
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export default class Heatmap extends React.Component {
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
  const cellSize = width / (data.monthlyVariance.length / 12);
  const years = data.monthlyVariance.map(d => d.year);

  const x = d3.scaleLinear()
    .domain(d3.extent(years))
    .range([0, width]);

  const variances = data.monthlyVariance.map(d => d.variance);

  const c = d3.scaleQuantile()
    .domain(variances)
    .range(colors);

  const xAxisSettings = {
    orient: 'bottom',
    scale: x,
    transform: `translate(${margin.left}, ${height})`,
    size: width,
    tickFormat: ['format', 'Y'],
  }

  return (
    <svg width={totalWidth} height={totalHeight}>
      <svg width={width} height={height} transform={`translate(${0})`} x={margin.left}>
        {data.monthlyVariance.map((d, i) => {
          return (
            <Cell
              key={i}
              x={(i / 12) * cellSize}
              y={height / months.length * (d.month - 1)}
              width={cellSize}
              height={height / months.length}
              d={d}
              c={c}
              handleTooltip={(e) => handleTooltip(e, d)}
              color={c(d.variance)}
            />
          )
        })}
      </svg>
      <Axis {...xAxisSettings} id={"x-axis"} />
      {months.map((m, i) => <text x={20} y={height/12 * (i + 1) - height/35} key={i} style={{'fontSize': `${Math.floor(width/55)}px`}}>{m}</text>)}
      {/* <Legend y={height} data={[0].concat(c.quantiles()), d => d}/> */}
    </svg>
  )
}
