import React from 'react';
import { Link } from 'react-router'

import './home.scss';

const Home = (props) => (
  <div className="home__container">
    <Link to='/tribute-page'>Tribute Page</Link>
    <Link to='/random-quote-machine'>Random Quote Machine</Link>
    <Link to='/local-weather'>Show the Local Weather</Link>
    <Link to='/wikipedia-viewer'>Wikipedia Viewer</Link>
    <Link to='/twitch-client'>Twitch Client</Link>
    <Link to='/calculator'>Calculator</Link>
    <Link to='/pomodoro-clock'>Pomodoro Clock</Link>
    <Link to='/tic-tac-toe'>Tic Tac Toe</Link>
    <Link to='/simon-game'>Simon Game</Link>
    <hr />
    <Link to='/markdown-previewer'>Markdown Previewer</Link>
    <Link to='/camper-leaderboard'>Camper Leaderboard</Link>
    <Link to='/recipe-box'>Recipe Box</Link>
    <Link to='/game-of-life'>Game of Life</Link>
    <Link to='/dungeon-crawler'>Dungeon Crawler</Link>
  </div>
);

export default Home;
