import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import * as topojson from 'topojson';

import Tooltip from './../Tooltip';

import './main.scss';

export default class MapGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false,
    }
    this.handleTooltip = this.handleTooltip.bind(this);
  }

  componentDidMount() {
    const { data, totalWidth, totalHeight } = this.props;
    renderChart.bind(this, data, totalWidth, totalHeight, this.handleTooltip)();
  }

  handleTooltip(d, coords) {
    if (!d) return this.setState(state => ({showTooltip: false}));

    this.setState(() => ({
      showTooltip: true,
      tooltipData: d,
      tooltipCoords: coords,
    }));
  }

  render() {
    const { tooltipData, tooltipCoords } = this.state;
    return (
      <div id="map">
        <div ref="links"></div>
        {this.state.showTooltip && <Tooltip data={tooltipData} x={tooltipCoords[0]} y={tooltipCoords[1]}/>}
      </div>
    )
  }
}

  function renderChart(data, totalWidth, totalHeight, handleTooltip) {
  // const width = totalWidth - margin.left - margin.right;
  // const height = totalHeight - margin.top - margin.bottom;
  const width = totalWidth;
  const height = totalHeight;

  const reactNode = ReactDOM.findDOMNode(this.refs.links);
  const svg = d3.select(reactNode).append('svg');

  svg
    .attr("width", totalWidth)
    .attr("height", totalHeight);

  const projection = d3.geoMercator()
    .translate([width/2, height/2 + 50])
    .scale(250)

  const path = d3.geoPath()
    .projection(projection);

  d3.queue()
    .defer(d3.json, 'https://s3.amazonaws.com/vj-fcc/countries.json')
    .defer(d3.json, 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json')
    .await(ready.bind(this, handleTooltip))

  function ready(handleTooltip, err, data, meteors, ) {
    const countries = topojson.feature(data, data.objects.units).features;

    svg.selectAll('.country')
      .data(countries)
      .enter()
      .append('path')
      .attr('class', 'country')
      .attr('d', path);

    svg.selectAll('.meteors')
      .data(meteors.features)
      .enter()
      .append('circle')
      .attr('r', d => {
        const mass = d.properties.mass;
        let size = Math.sqrt(mass / 1000)
        return size > 3 ? size : 3;
      })
      .attr('cx', d => {
        if (!d.geometry) return 0;
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0]
      })
      .attr('cy', d => {
        if (!d.geometry) return 0;
        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1]
      })
      .on('mouseenter', function (d) {
        const coords = d3.mouse(this);
        if (!d.geometry) return 0;
        handleTooltip(d, coords)
      })
      .on('mouseleave', () => handleTooltip(false))
  }

  return {__html: map};
}
