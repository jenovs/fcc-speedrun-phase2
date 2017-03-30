import React, { PropTypes } from 'react';

import './button.scss';

const Button = (props) => {
  const { handleClick, dataId, round, type, value } = props;
  const style = {};

  if (round) {
    style.borderRadius = "50%";
  }

  return(
    <input
      onClick={handleClick.bind(this, dataId)}
      className="btn"
      data-id={props.dataId}
      style={style}
      type={type}
      value={value}
    />
  )
}

Button.propTypes = {
  handleClick: PropTypes.func,
  // dataId: PropTypes.number,
  round: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
}

Button.defaultProps = {
  handleClick: () => {},
  round: false,
  type: 'button',
  value: 'Button',
}

export default Button;
