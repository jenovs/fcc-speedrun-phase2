import React from 'react';

import Home from './../Home';
// import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      generations: 0,
      cellSize: 12,
      speed: 50,
      width: 50,
      height: 50,
    };

    this.generateNextGen = this.generateNextGen.bind(this);
    this.loop = this.loop.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  componentDidMount() {
    const { height, width } = this.state;
    this.setState({
      array: this.makeArray(height, width, true),
      running: true,
    }, this.loop)
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  loop() {
    const { speed } = this.state;

    const interval = setInterval(() => {

      const { array, generations } = this.state;
      const newArray = this.generateNextGen(array);
      const population = this.countPopulation(array);

      if (!population) {
        clearInterval(this.state.interval);
        return this.setState({
          running: false,
          population: '0 - Total Extinction'
        })
      }

      this.setState({
        array: newArray,
        interval,
        generations: generations + 1,
        population,
      });
    }, speed);
  }

  handleClick() {
    const { height, width } = this.state;

    if (!this.state.running && this.countPopulation(this.state.array)) {
      return this.setState({
        running: true,
      }, this.loop())
    }

    else if (!this.state.running && !this.countPopulation(this.state.array)) {
      return this.setState({
        array: this.makeArray(height, width, true),
        running: true,
      }, this.loop())
    }

    else if (this.state.running) {
      clearInterval(this.state.interval);
      this.setState({
        running: false,
      })
    }
  }

  handleClear() {
    clearInterval(this.state.interval);

    const { height, width } = this.state;

    this.setState({
      array: this.makeArray(height, width),
      running: false,
      generations: 0,
      population: 0,
    })
  }

  handleRandom() {
    const { height, width } = this.state;
    const array = this.makeArray(height, width, true);
    const population = this.countPopulation(array);

    this.setState({
      array,
      population,
      generations: 0,
    });
  }

  toggleCell(i, j) {
    const array = this.state.array;

    array[i][j] = !array[i][j];

    this.setState({
      array,
    })
  }

  handleSettings(height, width, speed, cellSize) {
    const array = this.makeArray(height, width, true);
    this.setState({
      array,
      height,
      width,
      speed,
      cellSize
    });
  }

  makeArray(height, width, random) {
    const array = [];
    for (let i = 0; i < height; i++) {
      const subArray = [];
      for (let j = 0; j < width; j++) {
        if (!random) subArray.push(0);
        else subArray.push(Math.floor(Math.random() * 2));
      }
      array.push(subArray);
    }
    return array;
  }

  generateNextGen(gen) {
    const newGen = [];

    gen.forEach((row, i) => {

      const newRow = [];
      row.forEach((cell, j) => {
        const neighbours = this.countNeighbours(gen, i, j);

        if (cell) {
          if (neighbours < 2) newRow.push(0);
          else if (neighbours > 3) newRow.push(0);
          else newRow.push(1);
        }
        else if (!cell) {
          if (neighbours === 3) newRow.push(1);
          else newRow.push(0);
        }

      });
      newGen.push(newRow);
    })

    return newGen;
  }

  countNeighbours(gen, i, j) {
    let neighbours = 0;
    const h = gen.length;
    const w = gen[0].length;

    const r0 = i - 1 >= 0 ? i - 1 : h - 1;
    const r1 = i;
    const r2 = i + 1 >= h ? 0 : i + 1;
    const c0 = j - 1 >= 0 ? j - 1 : w - 1;
    const c1 = j;
    const c2 = j + 1 >= w ? 0 : j + 1;

    neighbours = gen[r0][c0] + gen[r0][c1] + gen[r0][c2] +
      gen[r1][c0] + gen[r1][c2] +
      gen[r2][c0] + gen[r2][c1] + gen[r2][c2];

    return neighbours;
  }

  countPopulation(arr) {
    let count = 0;
    arr.forEach(row => {
      row.forEach(cell => {
        if (cell) count++;
      })
    })
    return count;
  }

  render() {
    const { array, generations, population, running, cellSize, width, height, speed } = this.state;
    const props = {
      handleClick: this.handleClick,
      handleClear: this.handleClear,
      toggleCell: this.toggleCell,
      handleRandom: this.handleRandom,
      handleSettings: this.handleSettings,
      array,
      generations,
      population,
      running,
      cellSize,
      width,
      height,
      speed,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
