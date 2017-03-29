import React from 'react';

import './channelText.scss';

const ChannelText = (props) => {
  const className = `channel-${props.blockName || ''}__container ${props.modifier}`;
  return (
    <div className={className}>
      {props.text}
    </div>
  )
};

export default ChannelText;
