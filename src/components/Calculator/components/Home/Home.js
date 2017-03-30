import React from 'react';

import './home.scss';

import Calculator from './../Calculator';

const Home = (props) => (
  <div className="home__container">
    <Calculator {...props} />
  </div>
);

export default Home;
