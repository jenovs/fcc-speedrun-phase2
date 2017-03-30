import React from 'react';

import Home from './../Home';

// import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    // const {  } = this.state;
    const props = {

    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
