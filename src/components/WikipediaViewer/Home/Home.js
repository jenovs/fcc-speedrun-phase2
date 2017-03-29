
import React from 'react';
import { Link } from 'react-router';

import Articles from './../Articles';
import Search from './../Search';

import './main.scss';

const Home = (props) => {
  return (
    <div className="wikiviewer-home__container">
      <div className="wikiviewer-home__search">
        <Search handleSearch={props.handleSearch}/>
      </div>
      <div>
        <Articles {...props}/>
      </div>
    </div>
  )
}

export default Home;
