import React from 'react';

import ChannelText from './../ChannelText';
import Logo from './../Logo';

import './channel.scss';

let _isMounted = false;

class Channel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: props._id,
    };
  }

  componentDidMount() {
    if (!this.state._id) return;

    this.getStreamInfo(this.state._id);
    _isMounted = true;
  }

  componentWillUnmount() {
    _isMounted = false;
  }

  getStreamInfo(id) {
    this.props.getStreamInfo(id)
    .then(json => {
      if (_isMounted) {
        this.setState((state) => ({
          stream: json.stream
        }))
      }
    })
    .catch(e => e);
  }

  handleClick(name) {
    if (name) {
      window.open(`https://www.twitch.tv/${name}`)
    }
  }

  render() {
    const { logo, display_name, name, _id, bio } = this.props;
    const { stream } = this.state;
    const playing = (<i className="fa fa-play" aria-hidden="true"></i>);

    return (
      <div className="channel__container"
        onClick={this.handleClick.bind(this, name)}>

        <Logo src={logo || './images/person_placeholder.png'}/>

        <div className="channel-text__container">
          <ChannelText
            blockName="name"
            text={display_name || name}
          />

          <ChannelText
            blockName="bio"
            text={_id ? (bio ? bio : '\xa0') : `Channel doesn't exist`}
          />

          <ChannelText
            blockName="stream"
            text={stream ? stream.channel.status : (_id ? 'Offline' : ':(')}
            modifier={stream ? 'online' : 'offline'}
          />
        </div>
      </div>
    )
  }
}

export default Channel;
