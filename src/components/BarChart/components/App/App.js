import React from 'react';

import Home from './../Home';

// import './app.scss';

const dataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const checkWidth = (winWidth) => {
  const baseWidth = 960;
  const minWidth = 200;
  if (winWidth > baseWidth) return baseWidth;
  if (winWidth < minWidth) return minWidth;
  return winWidth;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

    const w = checkWidth(window.innerWidth - 100);

    this.state = {
      width: w,
      height: w / 2,
    };
  }

  componentDidMount() {
    fetch(dataUrl)
    .then(res => res.json())
    .then(json => this.setState(state => ({data: json})));

    window.addEventListener('resize', (e) => this.handleResize(e));
  }

  handleResize(e) {
    const w = checkWidth(window.innerWidth - 100);

    this.setState(state => ({
      width: w,
      height: w / 2,
    }))
  }

  render() {
    const { data, width, height } = this.state;
    const props = {
      data,
      width,
      height,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div id="app_div" className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
