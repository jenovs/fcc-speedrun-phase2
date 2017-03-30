import React from 'react';

import Board from './../Board';
import Cell from './../Cell';
import Controls from './../Controls';

import './home.scss';

const Home = (props) => (
  <div className="tictactoe-home__container">
    <Controls {...props}/>
    <div className="tictactoe-home__status">{props.status}</div>
    <Board>
      {props.board.map((cell, i) => {
        return (
          <Cell
            key={i}
            id={i}
            value={cell}
            won={props.win.length && !!~props.win.indexOf(i)}
            {...props} />
        )
      })}
    </Board>
    {/* <button className="home__new-game-button" onClick={props.handleNewGame}>New game</button> */}
  </div>
);

export default Home;
