import React from 'react';

import Cell from './../Cell';
import Row from './../Row';

import './home.scss';

const Home = (props) => {
  if (!props.array) return <div>Loading...</div>
  return (
    <div className="dungeon-crawler-home__container">
      {props.status ? <div className="dungeon-crawler-home__game-status">{props.status}</div> : <div>Health: {props.health}, Level: {props.level}, XP: {props.xp}, Weapon: {props.inHand}</div>}
      <div className="dungeon-crawler-home__board">
        {props.array.map((row, i) => {
          return (
            <Row key={i}>
              {row.map((cell, j) => (
                <Cell
                  key={j}
                  value={cell}
                />
              ))}
            </Row>
          )
        })}
      </div>
    </div>
  )
};

export default Home;
