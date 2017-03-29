import React from 'react';

import Channel from './../Channel';

import './channels.scss';

const Channels = (props) => {

  if (!props.channels) return <div>Loading...</div>

  return (
    <div className="channels__container">
      {props.channels.map((ch, i) => (
        <Channel
          key={ch._id ? ch._id : `x${i}`}
          {...ch}
          getStreamInfo={props.getStreamInfo}
        />
      ))}
    </div>
  )
}

export default Channels;
