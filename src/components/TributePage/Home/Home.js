import React from 'react';
import { Link } from 'react-router';

import Loading from './../Loading';
import Text from './../Text';
import Title from './../Title';

import './main.scss';

const parseText = (data) => {
  let parsed = [];
  let key = 0;
  for (let item in data) {
    parsed.push(<div key={key}><Title title={data[item].title} /><Text text={data[item].text} /></div>)
    key++;
  }
  return parsed
}

const Home = (props) => {

  if (!props.description || !props.translations) return <Loading />

  return (
    <div className="tribute-home__container">
      {/* <div className="home__links">
        <Link to="/tribute-page/about">About</Link>
        {props.lang !== 'en' && <button className="home__button" onClick={props.switchLang.bind(this, 'en')}>Switch to English</button>}
      </div> */}
      <div className="tribute-home__title">
        <div>
          <h1 id="title">Lorem Ipsum</h1>
        </div>
        <div>
          <a id="tribute-link" href="http://lipsum.com" target="_blank">lipsum.com</a>
        </div>
      </div>
      <hr width="100%"/>
      {/* <div id="img-div">
        <img id="image"/>
        <p id="img-caption"></p>
      </div> */}
      <div id="tribute-info">
        <div className="tribute-home__description">
          {parseText(props.description)}
        </div>
        <hr/>
        <div className="tribute-home__translations">
          {parseText(props.translations)}
        </div>
      </div>
    </div>
  )
}

export default Home;
