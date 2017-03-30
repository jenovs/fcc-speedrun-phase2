import React from 'react';

// import './app.scss';
import Home from './../Home';
import labels from './../../keyLabels';
import { validate } from './../../helpers';

const numbers = '1234567890';
const operators = '+-*/';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expression: [],
    };
  }

  handleClick(symb) {
    this.parseSymbol(symb);
  }

  parseSymbol(symb) {
    let { expression } = this.state;

    if (symb === 'C') expression = [];

    // NOTE Quick bugfix without tests
    else if (symb === '=') {
      while (!~numbers.indexOf(expression[expression.length-1])) expression.pop();
      let result = String(eval(expression.join('')));
      if (result === 'NaN' || result === 'Infinity') expression = [result];
      else expression = result.split('');
    }

    else if (symb !== 'C' && symb !== '=') expression = validate(expression, symb);

    this.setState({
      expression
    });
  }

  render() {
    const { expression } = this.state;
    const props = {
      expression,
      labels,
      handleClick: this.handleClick.bind(this),
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
