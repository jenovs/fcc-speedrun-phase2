import React, { PropTypes } from 'react';

import Numpad from './../Numpad';
import Screen from './../Screen';

import './calculator.scss';

const Calculator = (props) => (
  <div className="calculator__component">
    <Screen {...props} />
    <Numpad {...props} />
  </div>
);

export default Calculator;
