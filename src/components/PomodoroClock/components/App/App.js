import React from 'react';

import Home from './../Home';

// import './app.scss';

import buttonMap from './../../buttonMap';
const time = {
  work: 25,
  breakTime: 5,
}

// const audio = new Audio('https://s3.amazonaws.com/vj-fcc/alarm.mp3');
const audio = new Audio('./sounds/alarm.mp3');

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      work: time.work,
      breakTime: time.breakTime,
      timer: time.work * 60,
      running: false,
      activeTimer: 'Work',
      first: true,
    };

    this.handleCountdown = this.handleCountdown.bind(this);
  }

  handleClick(id) {
    const { activeTimer, breakTime, first, running, work } = this.state;
    if (buttonMap[id] === 'Start') {

      if (this.state.running) return;

      // Workaround to play the sound on iPhone
      if (first) {
        audio.volume = 0;
        audio.play();
        audio.pause();
        audio.currentTime = 0;
      }

      this.setState({
        running: true,
        first: false,
      }, this.handleCountdown);
    }

    if (buttonMap[id] === 'Stop') {
      this.setState({
        running: false,
      })
    }

    else if (buttonMap[id] === 'Reset') {
      this.setState({
        running: false,
        timer: this.state.work * 60,
        activeTimer: 'Work',
      })
    }

    else if (running) return;

    if (id === 0) {

      const updWork = work - 1 > 0 ? work - 1 : 1;
      this.setState({
        work: updWork,
        timer: updWork * 60,
      });
    }

    else if (id === 1) {
      const timer = this.state.work + 1;
      this.setState({
        timer: timer * 60,
        work: timer,
      });
    }


    else if (id === 2) {
      const timer = breakTime - 1 > 0 ? breakTime - 1 : 1;
      if (activeTimer === 'Break') {
        return this.setState({
          breakTime: timer,
          timer: timer * 60,
        });
      }
      this.setState({
        breakTime: timer,
      });
    }

    else if (id === 3) {
      const timer = breakTime + 1;
      if (activeTimer === 'Break') {
        return this.setState({
          breakTime: timer,
          timer: timer * 60,
        });
      }
      this.setState({
        breakTime: timer,
      });
    }
  }

  handleCountdown() {
    const { activeTimer, breakTime, running, timer, work } = this.state;

    if (!this.state.running) return;

    if (timer === 0) {
      const label = activeTimer === 'Work' ? 'Break' : 'Work';
      const newTime = activeTimer === 'Work' ? breakTime : work;
      audio.volume = 0.2;
      audio.currentTime = 0;
      audio.play();

      this.setState({
        running: false,
        activeTimer: label,
        timer: newTime * 60,
      });
      return;
    }

    this.setState({
      running: true,
      timer: this.state.timer - 1,
    }, () => {
      setTimeout(() => {
        this.handleCountdown()
      }, 1000)
    });
  }

  render() {
    const { activeTimer, breakTime, running, timer, work } = this.state;
    const props = {
      handleClick: this.handleClick.bind(this),
      activeTimer,
      breakTime,
      running,
      timer,
      work,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
