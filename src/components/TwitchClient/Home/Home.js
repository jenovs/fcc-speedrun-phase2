import React from 'react';

import Channels from './../Channels'

import './home.scss';

const Home = (props) => (
  <div className="twitch-home__container">
    <Channels {...props} />
  </div>
);

export default Home;
