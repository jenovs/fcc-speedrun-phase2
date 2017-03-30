import React from 'react';
import classNames from 'classnames';

import './cell.scss';

const Cell = (props) => {
  const classes = classNames({
    'dungeon-crawler-cell__container': true,
    'fill--hero': props.value === 1,
    'fill--black': props.value === 0,
    'fill--gray': props.value === 2,
    'fill--enemy': props.value === 'E',
    'fill--health': props.value === 'H',
    'fill--weapon': props.value === 'W',
    'fill--wall': props.value === '#',
    'fill--boss': props.value === 'B',
  })

  let token = '';
  if (props.value === 1) token = '\xa4';
  if (props.value === 'E') token = 'Ѫ'
  if (props.value === 'H') token = '♥'
  if (props.value === 'W') token = 'Ϯ'
  if (props.value === 'B') token = '敌'

  return (
    <div className={classes}>{token}</div>
  )
}

export default Cell;
