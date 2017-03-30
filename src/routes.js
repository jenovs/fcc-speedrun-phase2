import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import BarChart from './components/BarChart/components/App';
import Calculator from './components/Calculator/components/App';
import CamperLeaderboard from './components/CamperLeaderboard/components/App';
import DungeonCrawler from './components/DungeonCrawler/components/App';
import ForceGraph from './components/ForceGraph/components/App';
import GameOfLife from './components/GameOfLife/components/App';
import Heatmap from './components/Heatmap/components/App';
import Home from './components/Home';
import LocalWeather from './components/LocalWeather/App';
import MarkdownPreviewer from './components/MarkdownPreviewer/components/App';
import PomodoroClock from './components/PomodoroClock/components/App';
import RandomQuoteMachine from './components/RandomQuoteMachine/App';
import RecipeBox from './components/RecipeBox/components/App';
import Scatterplot from './components/Scatterplot/components/App';
import SimonGame from './components/SimonGame/components/App';
import TicTacToe from './components/TicTacToe/components/App';
import TributePage from './components/TributePage/App';
import TwitchClient from './components/TwitchClient/App';
import WikipediaViewer from './components/WikipediaViewer/App';
// import TributePageAbout from './components/TributePage/About';

import NotFound404 from './components/NotFound404';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='tribute-page' component={TributePage} />
    <Route path='random-quote-machine' component={RandomQuoteMachine} />
    <Route path='local-weather' component={LocalWeather} />
    <Route path='wikipedia-viewer' component={WikipediaViewer} />
    <Route path='twitch-client' component={TwitchClient} />
    <Route path='calculator' component={Calculator} />
    <Route path='pomodoro-clock' component={PomodoroClock} />
    <Route path='tic-tac-toe' component={TicTacToe} />
    <Route path='simon-game' component={SimonGame} />
    <Route path='markdown-previewer' component={MarkdownPreviewer} />
    <Route path='camper-leaderboard' component={CamperLeaderboard} />
    <Route path='recipe-box' component={RecipeBox} />
    <Route path='game-of-life' component={GameOfLife} />
    <Route path='dungeon-crawler' component={DungeonCrawler} />
    <Route path='bar-chart' component={BarChart} />
    <Route path='scatterplot-chart' component={Scatterplot} />
    <Route path='heatmap' component={Heatmap} />
    <Route path='force-graph' component={ForceGraph} />
    {/* <Route path='tribute-page/about' component={TributePageAbout} /> */}

    <Route path='*' component={NotFound404} />
  </Route>
);
