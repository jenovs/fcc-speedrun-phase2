import React from 'react';

import './tooltip.scss';

const Tooltip = (props) => {
  const { x, y, data } = props;

  const styles = {
    position: 'fixed',
    left: props.x - 50,
    top: props.y - 80,
  }

  return (
    <div
      style={styles}
      className="tooltip__container"
    >
      {data.Name} ({data.Nationality})
      <br/>
      Time: {data.Time}, Place: {data.Place}
      <br/>
      Year: {data.Year}
      <br/>
      <span>{data.Doping}</span>
    </div>
    )
}

export default Tooltip;
