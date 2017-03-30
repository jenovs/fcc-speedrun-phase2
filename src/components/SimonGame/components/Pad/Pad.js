import React from 'react';
import classNames from 'classnames';

import './pad.scss';

const Pad = (props) => {
  const classes = classNames({
    pad__container: true,
    highlighted: props.playing === props.id,
  })
  return (
    <div
      className={classes}
      onClick={props.handleClick}
    ></div>
  )
};

export default Pad;
