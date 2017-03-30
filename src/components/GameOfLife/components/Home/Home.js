import React from 'react';

import Button from './../Button'
import Cell from './../Cell';
import Controls from './../Controls';
import Row from './../Row';

import './home.scss';

const Home = (props) => {
  if (!props.array) return <div>Loading...</div>
  return (
    <div className="game-of-life-home__container">
      <div className="game-of-life-home__settings">
        {!props.running ? <Controls {...props} /> : <div>&nbsp;</div>}
      </div>
      <div className="game-of-life-home__controls">
        <Button type="button" value={props.running ? 'Stop' : 'Start'} color={props.running ? 'danger' : 'primary'} handleClick={props.handleClick} />
        <Button type="button" value="Clear" color="danger" handleClick={props.handleClear} />
        <Button type="button" value="Random" color="primary" handleClick={props.handleRandom} />
      </div>
      <div className="game-of-life-home__stats">
        <div className="game-of-life-home__stat-field">Generations: {props.generations}</div>
        <div className="game-of-life-home__stat-field">Population: {props.population}</div>
      </div>
      {props.array.map((row, i) => {
        return (
          <Row key={i}>
            {row.map((cell, j) => (
              <Cell
                key={j}
                value={cell}
                cellSize={props.cellSize}
                toggleCell={props.toggleCell.bind(this, i, j)}
              />
            ))}
          </Row>
        )
      })}
    </div>
  )
};

export default Home;
