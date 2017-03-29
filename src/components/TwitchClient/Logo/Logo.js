import React from 'react';

import './logo.scss';

const Logo = (props) => (
  <div className="logo__container">
    <img src={props.src} />
  </div>
);

export default Logo;
