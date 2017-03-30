import React from 'react';

import MapGraph from './../MapGraph';

import './home.scss';

const Home = (props) => {
  const { width, height } = props;

  return (
    <div className="map-graph-home__container" id="home">
      <MapGraph {...props} totalWidth={width} totalHeight={height}/>
    </div>
  )
};

export default Home;
