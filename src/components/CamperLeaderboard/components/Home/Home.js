import React from 'react';
// import FlipMove from 'react-flip-move';

import DataRow from './../DataRow';
import TitleRow from './../TitleRow';

import './home.scss';

const Home = (props) => {
  const data = props.showRecent ? props.recent : props.alltime;
  // console.log(data);
  if (!data.length) return <div>Loading...</div>
  return (<div className="leaderboard-home__container">
    <TitleRow {...props} />
    {data.map((item, i) => {
      return (
        <DataRow key={i} nr={i+1} {...item} />
      )
    })}
  </div>
)};

export default Home;
