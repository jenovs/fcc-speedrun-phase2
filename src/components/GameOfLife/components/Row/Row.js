import React from 'react';

import './row.scss';

const Row = (props) => {
  return (
    <div className="row__container">
      {props.children}
    </div>
  )
}

export default Row;
