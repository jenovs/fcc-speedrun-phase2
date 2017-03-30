import React from 'react';

import Home from './../Home';

// import './app.scss';

const checkWidth = (winWidth) => {
  const baseWidth = 1600;
  const minWidth = 1600;
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
    // window.addEventListener('resize', (e) => this.handleResize(e));
  }

  // handleResize(e) {
  //   const w = checkWidth(window.innerWidth - 100);
  //
  //   this.setState(state => ({
  //     width: w,
  //     height: w / 2,
  //   }))
  // }

  render() {
    const { width, height, boxShadow } = this.state;
    const props = {
      boxShadow,
      width,
      height,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div id="app_div" className="app__container" >
        <Home {...props} />
      </div>
    )
  }
}
