import React from 'react';

import Home from './../Home';
// import './app.scss';

const recentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const alltimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alltime: [],
      recent: [],
      showRecent: true,
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(alltimeUrl),
      fetch(recentUrl),
    ])
    .then(data => Promise.all([data[0].json(), data[1].json()]))
    .then(json => {
      this.setState({
        alltime: json[0],
        recent: json[1],
      })
    })
  }

  toggleSort() {
    const { showRecent } = this.state;
    this.setState({
      showRecent: !showRecent,
    })
  }

  render() {
    const { alltime, recent, showRecent } = this.state;
    // console.log(alltime, recent);
    const props = {
      handleClick: this.toggleSort.bind(this),
      alltime,
      recent,
      showRecent,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
