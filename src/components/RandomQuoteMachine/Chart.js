import * as d3 from 'd3';
import FauxDOM from 'react-faux-dom';
import React from 'react';

import './main.scss';

const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 40
};
const totalWidth = 350;
const totalHeight = 150;

const Chart = (props) => {
  if (!props.data) return <div style={{height: totalHeight}}>{renderChart([], true)}</div>
  return renderChart(props.data)
}

function renderChart(dataset, axisOnly) {

  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const parseTime = d3.timeParse('%Y-%m-%d');

  const dt = new Date();
  const yr = dt.getFullYear();
  const m = dt.getMonth() + 1;
  const d = dt.getDate();

  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const graphLine = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[4]));

  const node = FauxDOM.createElement('svg');

  const svg = d3.select(node)
      .attr('width', totalWidth)
      .attr('height', totalHeight)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  dataset.forEach(d => {
    d[0] = parseTime(d[0]);
    d[4] = +d[4];
  });

  const max = d3.max(dataset, d => d[4]);

  if (axisOnly) {
    x.domain([parseTime(`${yr-1}-${m}-${d}`), parseTime(`${yr}-${m}-${d}`)]);
    y.domain([0, 0]);
  } else {
    x.domain(d3.extent(dataset, d => d[0]));
    y.domain([0, max + max * 0.1]);
  }

  svg.append('path')
    .data([dataset])
    .attr('class', 'line')
    .attr('d', graphLine);

  svg.append('g')
    .attr('transform', `translate(${0}, ${height})`)
    .call(d3.axisBottom(x).ticks(6))

  svg.append('g')
    .call(d3.axisLeft(y).ticks(4));

  return node.toReact();
}

export default Chart;
