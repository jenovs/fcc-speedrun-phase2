import React from 'react';

import './main.scss';

const Quote = (props) => {
  name = 'Loading...';
  close = '\xa0';

  if (props.name) {
    name = props.name;
    close = '$' + props.close.toFixed(2);
  }

  return (
    <div className="quote__container">
      <div className="quote__name">{name}</div>
      <div className="quote__close">{close}</div>
    </div>
  )
}

export default Quote;
