import React from 'react';

import './board.scss';

const Board = (props) => (
  <div className="board__container">
    {props.children}
  </div>
);

export default Board;
