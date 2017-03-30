import React, { PropTypes } from 'react';

import './screen.scss';

const Screen = (props) => (
  <div className="screen__container">
    {props.expression.join('')}
  </div>
);

Screen.propTypes = {
  expression: PropTypes.array.isRequired,
};

Screen.defaultProps = {
  expression: ['0'],
}

export default Screen;
