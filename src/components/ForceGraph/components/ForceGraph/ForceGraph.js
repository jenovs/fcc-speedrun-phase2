import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';

import './flags.scss'
import './main.scss';

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 50
};

export default class ForceGraph extends React.Component {
  componentDidMount() {
    const { data, totalWidth, totalHeight } = this.props;
    renderChart.bind(this, data, totalWidth, totalHeight)();
  }
  render() {
    return (
      <div id="container">
        <div ref="links"></div>
        <div id="chart"></div>
      </div>
    )
  }
}

function renderChart(data, totalWidth, totalHeight) {
  const width = totalWidth - margin.left - margin.right;
  const height = totalHeight - margin.top - margin.bottom;

  const reactNode = ReactDOM.findDOMNode(this.refs.links);
  const svg = d3.select(reactNode).append('svg');

  svg
    .attr("width", totalWidth)
    .attr("height", totalHeight);

  const sim = d3.forceSimulation()
    .force('link', d3.forceLink().id(d => d.index))
    .force('charge', d3.forceManyBody().strength(-80))
    .force('center', d3.forceCenter((width / 2) + margin.left, (height / 2) + margin.top))
    .force('y', d3.forceY(0))
    .force('x', d3.forceX(0))

  const link = svg.append('g')
    .selectAll('line')
    .data(data.links)
    .enter()
    .append('line')
    .attr('stroke', 'black');

  const node = d3.select('#chart').selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('img')
    .attr('class', d => 'flag flag-' + d.code)
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded));

  const ticked = () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .style('left', d => (d.x - 8) + "px")
  		.style('top', d => (d.y - 5 - height - margin.bottom - margin.top) + "px")
  }

  sim.nodes(data.nodes).on('tick', ticked);
  sim.force('link').links(data.links);

  function dragStarted(d) {
    if (!d3.event.active) sim.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragEnded(d) {
    if (!d3.event.active) sim.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return {__html: svg};
}
