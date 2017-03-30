import React from 'react';

import './tooltip.scss';

const Tooltip = (props) => {
  const { x, y, data } = props;

  const styles = {
    position: 'fixed',
    left: props.x,
    top: props.y,
  }

  return (
    <div
      style={styles}
      className="tooltip__container"
    >
      Name: {data.properties.name}<br/>
      Mass: {data.properties.mass}<br/>
      Year: {data.properties.year}
    </div>
    )
}

export default Tooltip;
