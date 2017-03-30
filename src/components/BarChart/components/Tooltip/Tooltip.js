import React from 'react';

import './tooltip.scss';

const Tooltip = (props) => {
  const { x, y, opacity } = props;

  const styles = {
    position: 'fixed',
    left: props.x - 50,
    top: props.y - 60,
  }

  return <div style={styles} className="tooltip__container" >{props.data[0]}<br/>${props.data[1]} Billion</div>
}

export default Tooltip;
