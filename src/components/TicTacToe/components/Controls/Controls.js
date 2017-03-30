import React from 'react';

import './controls.scss';

const Controls = (props) => {
  const styleX = props.userToken === 'X' ? "controls__button--selected" : "controls__button";
  const styleO = props.userToken === 'O' ? "controls__button--selected" : "controls__button";
  return (
    <div className="controls__container">
      <div className="controls__label">
        <p>Your token</p>
        <p><strong>X</strong> will move first. Always.</p>
      </div>

      <div className="controls__btn-container">
        <button
          onClick={props.handleSelectToken.bind(this, 'X')}
          className={styleX}>X</button>
        <button
          onClick={props.handleSelectToken.bind(this, 'O')}
          className={styleO}>O</button>
      </div>
    </div>
  )
};

export default Controls;
