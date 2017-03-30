import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './cell.scss';

const Cell = (props) => {

  const cellClass = classNames({
    'cell__container': true,
    'won': props.won,
    'hidden': props.value === 0,
  });

  return (
    <div
      className={cellClass}
      onClick={props.handleClick.bind(null, props.id)}
    >
      {props.value}
    </div>
  );
};

export default Cell;
