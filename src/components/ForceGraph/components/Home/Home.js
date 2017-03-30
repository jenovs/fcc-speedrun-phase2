import React from 'react';

import ForceGraph from './../ForceGraph';

import './home.scss';

const Home = (props) => {
  const { data, width, height } = props;

  return (
    <div className="force-graph-home__container" id="home">
      {data ? <ForceGraph {...props} totalWidth={width} totalHeight={height}/> : <div>Loading....</div>}
    </div>
  )
};

export default Home;
