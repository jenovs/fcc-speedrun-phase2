import React from 'react';

import Scatterplot from './../Scatterplot';

import './home.scss';

const Home = (props) => {
  const { data, width, height } = props;

  return (
    <div className="scatterplot-home__container" id="home">
      {data ? <Scatterplot {...props} totalWidth={width} totalHeight={height}/> : <div>Loading....</div>}
    </div>
  )
};

export default Home;
