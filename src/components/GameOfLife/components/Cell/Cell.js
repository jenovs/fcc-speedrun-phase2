import React from 'react';
import classNames from 'classnames';

import './cell.scss';

const Cell = (props) => {
  const classes = classNames({
    cell__container: true,
    fill: !!props.value,
  })

  const style = {
    width: (props.cellSize + 'px') || '10px',
    height: (props.cellSize + 'px') || '10px',
  }

  return (
    <div className={classes} style={style} onClick={props.toggleCell}></div>
  )
}

export default Cell;
