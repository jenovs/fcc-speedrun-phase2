import React, { PropTypes } from 'react';

import './key.scss'

const Key = (props) => (
  <div className="key__container">
    <button onClick={props.handleClick}>
      {String(props.label)}
    </button>
  </div>
);

Key.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

Key.defaultProps = {
  label: ' '
};

export default Key;
