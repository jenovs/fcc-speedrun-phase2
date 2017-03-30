import React, { PropTypes } from 'react';

import './controls.scss';

const Controls = (props) => {
  return (
    <div className="pomodoro-controls__container">
      {props.children}
    </div>
  )
}

export default Controls;
