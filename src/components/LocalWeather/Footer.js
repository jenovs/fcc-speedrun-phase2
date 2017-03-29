import React from 'react';

import './footer.scss';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <a href="//www.wunderground.com" target="_blank">
          Powered by Weather Underground<br/>
          <img width="200px" src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_horz.png"/>
        </a>
      </footer>
    )
  }
}
