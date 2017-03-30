import React, { PropTypes } from 'react';

import './display.scss';

const Display = (props) => {

  const parseTime = (props) => {

  };

  return (
    <div className={props.className || "display__container"}>
      <p>{props.text}</p>
    </div>
  )
}

Display.propTypes = {
  text: PropTypes.string,
}

Display.defaultProps = {
  text: '',
}

export default Display;
