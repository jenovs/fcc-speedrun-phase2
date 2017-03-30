import React from 'react';

import Heatmap from './../Heatmap';

import './home.scss';

const Home = (props) => {
  const { data, width, height } = props;

  return (
    <div className="heatmap-home__container" id="home">
      {data ? <Heatmap {...props} totalWidth={width} totalHeight={height}/> : <div>Loading....</div>}
    </div>
  )
};

export default Home;
