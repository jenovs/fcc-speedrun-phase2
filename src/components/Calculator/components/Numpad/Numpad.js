import React, { PropTypes } from 'react';

import Key from './../Key';

import './numpad.scss';

import labels from './../../keyLabels';

const Numpad = (props) => (
  <div className="numpad__container">
    {props.labels.split('').map(label => (
      <Key key={label} label={label} handleClick={props.handleClick.bind(this, String(label))}/>
    ))}
  </div>
);

Numpad.propTypes = {
  handleClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  labels: PropTypes.string,
};

Numpad.defaultProps = {
  handleClick: () => {},
  labels: labels,
};

export default Numpad;
