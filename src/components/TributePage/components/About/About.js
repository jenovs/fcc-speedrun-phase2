import React from 'react';
import { Link } from 'react-router';

import './main.scss';

export default class About extends React.Component {
  render() {
    return (
      <div className="about__container">
        <div className="about__links">
          <Link to="/tribute-page">Home</Link>
        </div>
        <div className="about__text">
          <p>This is a tribute page made for the "Chingu FCC Speedrun Challenge".</p>
          <p>The objective of this challeng is to make as many FCC projects as possible in two weeks.</p>
          <p>As the tribute page is the first challenge in FCC's curriculum, I started with it. Gosh, I've forgotten how boring is plain old HTML/CSS &#x1f612;, so I decided to make this project a bit more challenging.</p>
          <p>Inspired by this mpj's video</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/7ctkTFv6XdA" frameBorder="0" allowFullScreen></iframe>
          <p>I started to overengineer &#x1f603;</p>
          <p>So this app detects browser language and makes a request to a backend API (it's effectively the sixth microservices/API project &#x1f603;). The backend requests the localized <a href="http://lipsum.com/" target="_blank">lipsum.com</a> page, extracts the data and send it back to the frontend as a JSON. If <a href="http://lipsum.com/" target="_blank">lipsum.com</a> doesn't have localized page for that language, the English version is requested.</p>
          <p>Frontend parses received JSON and displays it on the screen.</p>
          <hr/>
          <h4>Stack</h4>
          <h5>Backend:</h5>
          <p>Node, Express, Cheerio.js (for scraping)</p>
          <h5>Frontend:</h5>
          <p>React, SASS</p>
        </div>
      </div>
    )
  }
}
