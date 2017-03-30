import React from 'react';

import Home from './../Home';

import { getRandomArray } from './../../api';
// import './app.scss';

const sounds = [
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
];

const len = 20;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      moves: getRandomArray(len),
      strict: false,
      playNext: 0,
      playing: null,
      level: 0,
      userMoves: 0,
      disableUser: true,
      status: 'Press start',
    };

    this.gameLoop = this.gameLoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUserMove = this.handleUserMove.bind(this);
    this.playAllSounds = this.playAllSounds.bind(this);
    this.playSound = this.playSound.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
  }

  componentDidMount() {
    sounds.forEach(sound => {
      sound.volume = 0;
      sound.play();
    });
  }

  gameLoop() {
    const { level, moves, playNext } = this.state;
    this.playAllSounds();
  }

  toggleStrict() {
    const { strict } = this.state;
    this.setState({
      strict: !strict,
    }, this.handleStart());
  }

  handleStart() {
    this.setState({
      moves: getRandomArray(len),
      playNext: 0,
      playing: null,
      level: 0,
      userMoves: 0,
      disableUser: true,
      status: 'Listen',
    }, () => {
      setTimeout(this.gameLoop, 1000);
    });
  }

  playAllSounds() {
    const { level, moves, playNext } = this.state;
    if (level === len) {
      return this.setState({
        disableUser: true,
        level: -1,
        status: 'You win!!!'
      }, () => {
        setTimeout(this.handleStart, 5000);
      });
    };
    if (playNext > level) {
      return this.setState({
        disableUser: false,
        userMoves: 0,
        status: 'Repeat'
      });
    };
    const audio = sounds[moves[playNext]];
    audio.volume = 0.2;

    this.setState({
      playNext: playNext + 1,
      playing: moves[playNext],
      status: 'Listen',
    }, () => {
      audio.play();
      setTimeout(this.resetHighlight, 500);
    });
  }

  resetHighlight() {
    this.setState({
      playing: null,
    }, () => {
      setTimeout(this.playAllSounds, 200)
    });
  }

  handleClick(id) {
    const { moves, userMoves, level, disableUser } = this.state;

    if (disableUser) return;

    this.playSound(id);
    this.handleUserMove(id);
  }

  handleUserMove(id) {
    const { moves, userMoves, level, disableUser, strict } = this.state;

    // wrong button pressed
    if (id !== moves[userMoves]) {
      return this.setState({
        userMoves: 0,
        disableUser: true,
        playNext: 0,
        status: 'Wrong!!!'
      }, () => {
        if (!strict) setTimeout(this.playAllSounds, 1000);
        else setTimeout(this.handleStart, 1000);
      });
    }

    if (userMoves === level) {
      return this.setState({
        level: level + 1
      }, () => {
        setTimeout(this.playAllSounds, 1000)
      })
    }
    this.setState({
      userMoves: userMoves + 1,
      disableUser: userMoves > level,
      playNext: 0,
    }, () => {
      if (this.state.userMoves > level) this.playAllSounds;
    })
  }

  muteSounds() {
    sounds.forEach(sound => {
      sound.volume = 0;
      sound.currentTime = 0;
    });
  }

  playSound(id) {
    const { userMoves, level } = this.state;
    this.muteSounds();
    sounds[id].volume = 0.2;
    sounds[id].play();
  }

  render() {
    const { playing, level, disableUser, status, strict } = this.state;
    const props = {
      handleClick: this.handleClick,
      handleStart: this.handleStart,
      toggleStrict: this.toggleStrict,
      disableUser,
      level,
      playing,
      status,
      strict,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
