import React from 'react';
import { Link } from 'react-router';

import './main.scss';

const Navbar = (props) => {
  const { pathname } = props;
  const projectName = pathname.substr(1).replace('-', ' ');
  return (
    <nav>
      <div>
        <Link to={'/'}>Home</Link>
        <div className="navbar__project-div">{projectName}</div>
        <div className="navbar__image-div"></div>
      </div>
    </nav>
  )
}

export default Navbar;
