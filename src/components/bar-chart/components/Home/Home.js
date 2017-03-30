import React from 'react';

import BarChart from './../BarChart';

import './home.scss';

const Home = (props) => {
  const { data, width, height } = props;

  return (
    <div className="bar-chart-home__container" id="home">
      {data ? <BarChart {...props} totalWidth={width} totalHeight={height}/> : <div>Loading...</div>}
    </div>
  )
};

export default Home;
