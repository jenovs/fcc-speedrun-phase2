import React from 'react';
import classNames from 'classnames';

import './button.scss';


const Button = (props) => {
  const classes = classNames({
    btn: true,
    'btn-primary': (props.color === 'primary'),
    'btn-danger': (props.color === 'danger'),
  });

  return (
    <input
      className={classes}
      onClick={props.handleClick}
      type={props.type}
      value={props.value}
    />
  )
}

export default Button;
