import React from 'react';

import Home from './../Home';

import channels from './../defaultChannels';
import { getUserIds, getStreamInfo } from './../api';

import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { };
  }

  componentDidMount() {
    this.parseChannelList(channels);
  }

  parseChannelList(arr) {
    getUserIds(arr)
    .then(channels => {
      this.setState({
        channels
      });
    });
  }

  render() {
    const { channels } = this.state;
    const props = {
      channels,
      getStreamInfo
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
