import React from 'react';
import { Link } from 'react-router';

import './main.scss';
import links from './../../medium-links.json';

const openMedium = (pathname) => {
  window.open(links[pathname])
}

const Navbar = (props) => {
  const { pathname } = props;
  const projectName = pathname.substr(1).replace('-', ' ');
  return (
    <nav>
      <div>
        <Link to={'/'}>Home</Link>
        <div className="navbar__project-div">{projectName}</div>
        <div
          onClick={openMedium.bind(null, pathname)}
          className="navbar__image-div"
        ></div>
      </div>
    </nav>
  )
}

export default Navbar;
