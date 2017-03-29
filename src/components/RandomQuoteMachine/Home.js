
import React from 'react';
import { Link } from 'react-router';

import './home.scss';

import Chart from './Chart';
import Quote from './Quote';

const tweetIt = (props) => {
  let twitLink = "https://twitter.com/intent/tweet?text=" + `${props.name} - $${props.close.toFixed(2)}`;
  window.open(twitLink);
}

const Home = (props) => {
  return (
    <div className="rqm-home__container">
      <Quote name={props.name} close={props.close}/>
      <Chart data={props.data} dateOnly={props.dateOnly}/>
      <div className="rqm-home__controls">
        <button onClick={props.updateQuote}>New quote</button>
        <button onClick={tweetIt.bind(null, props)}>Tweet</button>
      </div>
    </div>
  )
}

export default Home;
