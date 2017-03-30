import React from 'react';

import './tooltip.scss';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
      {data.year} - {months[data.month-1]}<br/>
      {(data.variance + 8.66).toFixed(3)}&deg;C<br/>
      <span>{data.variance}&deg;C</span>
    </div>
    )
}

export default Tooltip;
