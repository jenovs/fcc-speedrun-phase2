import React from 'react';

import './dataRow.scss';

const DataRow = (props) => (
  <div className="dataRow__container">
    <div className="dataRow">{props.nr}</div>
    {/* <div><img src={props.img} /></div> */}
    <div className="dataRow dataRow__username"><img src={props.img} /><div>{props.username}</div></div>
    <div className="dataRow dataRow__count">{props.alltime}</div>
    <div className="dataRow dataRow__count">{props.recent}</div>
  </div>
)

export default DataRow;
