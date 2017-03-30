import React, { PropTypes } from 'react';

import './pomodoro.scss';

const Pomodoro = (props) => {
  return (
    <div className="pomodoro__container">
      {props.children}
    </div>
  )
}

export default Pomodoro;
