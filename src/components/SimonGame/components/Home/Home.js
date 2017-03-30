import React from 'react';

import Pad from './../Pad';

import './home.scss';

const Home = (props) => (
  <div className="simon-game-home__container">
    <div className="simon-game-home__status">
      Steps: {props.level + 1}<br/>
      {props.status}
    </div>
    <div className="simon-game-home__button-start">
      <button onClick={props.handleStart}>Start/Restart</button>
    </div>
    <div className="simon-game-home__button-strict">
      <button onClick={props.toggleStrict}>{props.strict ? 'Strict: ON' : 'Strict: OFF'}</button>
    </div>
    <div className="simon-game-home__pads">
      <Pad id={0} {...props} handleClick={props.handleClick.bind(this, 0)}/>
      <Pad id={1} {...props} handleClick={props.handleClick.bind(this, 1)}/>
      <Pad id={2} {...props} handleClick={props.handleClick.bind(this, 2)}/>
      <Pad id={3} {...props} handleClick={props.handleClick.bind(this, 3)}/>
    </div>
  </div>
);

export default Home;
