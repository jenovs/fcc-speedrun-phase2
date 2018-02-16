import React from 'react';

import Home from './Home';

import tickers from './nasdaq100';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.setRandomTicker();
  }

  setRandomTicker() {
    let rand;
    do {
      rand = Math.floor(Math.random() * tickers.length);
    } while (rand === this.state.rand);

    this.setState(
      {
        rand,
        name: null,
        data: null,
        close: null,
      },
      this.fetchData(tickers[rand])
    );
  }

  fetchData(ind) {
    fetch(`https://charts.jenovs.com/graph/${ind}`)
      .then(res => res.json())
      .then(json => {
        if (!json.dataset) return this.setRandomTicker();
        this.setState({
          name: json.dataset.name.match(/(.+\([A-Z]+\))/)[0],
          data: json.dataset.data,
          close: json.dataset.data[0][4],
        });
      })
      .catch(e => console.log(e));
  }

  render() {
    const { name, data, close } = this.state;
    const props = {
      name,
      data,
      close,
      updateQuote: this.setRandomTicker.bind(this),
    };
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, props)
    );

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    );
  }
}
