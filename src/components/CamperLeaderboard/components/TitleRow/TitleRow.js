import React from 'react';
import classNames from 'classnames';

import './titleRow.scss';

const TitleRow = (props) => {
  const classesAllTime = classNames({
    titleRow: true,
    titleRow__count: true,
    // 'highlight-recent': props.showRecent,
    'highlight-alltime': !props.showRecent,
  });

  const classesRecent = classNames({
    titleRow: true,
    titleRow__count: true,
    'highlight-recent': props.showRecent,
    // 'highlight-alltime': !props.showRecent,
  });

  return (
    <div onClick={props.handleClick} className="titleRow__container">
      <div className="titleRow">#</div>
      <div className="titleRow titleRow__username">Username</div>
      <div className={classesAllTime}>All Time</div>
      <div className={classesRecent}>Recent</div>
    </div>
  )
}

export default TitleRow;
