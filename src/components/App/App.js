import React from 'react';

import Navbar from './../Navbar';

import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // console.log();
    const pathname = this.props.children.props.location.pathname;
    // const {  } = this.state;
    const props = {

    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Navbar pathname={pathname} />
        {childrenWithProps}
      </div>
    )
  }
}
