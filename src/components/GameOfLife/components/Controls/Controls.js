import React from 'react';

import Button from './../Button'

import './controls.scss';

const max = {
  height: 200,
  width: 200,
  speed: 1000,
  cellSize: 50,
}

const min = {
  height: 10,
  width: 10,
  speed: 50,
  cellSize: 3,
}

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: props.height,
      width: props.width,
      speed: props.speed,
      cellSize: props.cellSize,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: +e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const { height, width, speed, cellSize } = this.state;
    
    if (height > max.height || height < min.height) return;
    if (width > max.width || width < min.width) return;
    if (speed > max.speed || speed < min.speed) return;
    if (cellSize > max.cellSize || cellSize < min.cellSize) return;
    this.props.handleSettings(height, width, speed, cellSize);
  }

  render() {
    const { height, width, speed, cellSize } = this.state;

    return (
      <div className="controls__container">
        <form onChange={this.handleChange} onSubmit={this.handleSubmit.bind(this)} className="controls__form">
          <div className="controls__form-group">
            <div>
              <label htmlFor="height">Height ({min.height}-{max.height})</label>
              <input type="number" name="height" value={height} onChange={() => {}} />
            </div>
            <div>
              <label htmlFor="width">Width ({min.width}-{max.width})</label>
              <input type="number" name="width" value={width} onChange={() => {}} />
            </div>
          </div>
          <div className="controls__form-group">
            <div>
              <label htmlFor="speed">Gen. length (ms) ({min.speed}-{max.speed})</label>
              <input type="number" name="speed" value={speed} onChange={() => {}} />
            </div>
            <div>
              <label htmlFor="cellSize">Cell size (px) ({min.cellSize}-{max.cellSize})</label>
              <input type="number" name="cellSize" value={cellSize} onChange={() => {}} />
            </div>
          </div>
          <div className="controls__form-button">
            <Button type="submit" value="Save" color="primary"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Controls;
