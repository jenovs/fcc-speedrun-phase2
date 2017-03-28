import React from 'react';
import { Link } from 'react-router';

import './main.scss';

const Navbar = (props) => {
  return (
    <nav>
      <div>{props.pathname}</div>
      <Link to={'/'}>Home</Link>
    </nav>
  )
}

export default Navbar;
