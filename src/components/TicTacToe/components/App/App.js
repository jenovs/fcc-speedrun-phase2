import React from 'react';

import Home from './../Home';

import {
  checkEmptyCell,
  checkWinner,
  findWinningMove,
  getMovesCount,
  getRandomEmptyCell
} from './../../api';

// import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      userMove: true,
      userToken: 'X',
      aiToken: 'O',
      win: [],
      status: 'Shall we play a game?',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMoves = this.handleMoves.bind(this);
    this.aiMove = this.aiMove.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.userMove = this.userMove.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handleSelectToken = this.handleSelectToken.bind(this);
  }

  handleNewGame() {
    const userMove = this.state.userToken === 'X';
    this.setState({
      userMove,
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      win: [],
      status: 'Shall we play a game?',
    }, () => {
      if (!this.state.userMove) this.aiMove();
    })
  }

  handleSelectToken(token) {
    const userToken = token;
    const aiToken = userToken === 'X' ? 'O' : 'X';

    this.setState({
      userToken,
      aiToken
    }, this.handleNewGame);
  }

  handleClick(id) {
    const board = [...this.state.board];
    const { userMove, win } = this.state;

    if (!userMove) return;
    if (getMovesCount(board) >= 9) return;
    if (win.length) return;
    if (!checkEmptyCell(board, id)) return;

    this.handleMoves(id);
  }

  handleMoves(id) {
    const board = [...this.state.board];
    const { userMove, userToken, aiToken } = this.state;

    if(getMovesCount(board) >= 9) return this.gameOver();

    const token = userMove ? aiToken : userToken;
    const win = checkWinner(board, token);

    if (win.length) {
      return this.setState({
        win,
      }, this.gameOver)
    }

    if (userMove && id !== undefined) return this.userMove(id);
    else if (!userMove) return this.aiMove();
  }

  gameOver() {
    const { win, userMove } = this.state;
    let status = '';

    if (!win.length) status = 'Draw';
    else if (userMove) status = 'You lose :(';
    else if (!userMove) status = 'You win :)';

    this.setState({
      status,
    }, () => {
      setTimeout(this.handleNewGame, 2000);
    });
  }

  userMove(id) {
    const board = [...this.state.board];
    const { userToken } = this.state;

    board[id] = userToken;

    this.setState({
      board,
      userMove: false,
      status: 'Thinking...'
    }, this.handleMoves);

  }

  aiMove() {
    const board = [...this.state.board];
    const { aiToken, userToken, userMove } = this.state;

    if (getMovesCount(board) >= 9) return;

    let move = findWinningMove(board, aiToken);

    if (move) {
      board[move] = aiToken;
      return this.setState({
        board,
        userMove: true,
        status: 'Your move.'
      }, this.handleMoves);
    }

    move = findWinningMove(board, userToken);

    if (move) {
      board[move] = aiToken;
      return this.setState({
        board,
        userMove: true,
        status: 'Your move.'
      }, this.handleMoves);
    };

    move = getRandomEmptyCell(board);

    board[move] = aiToken;

    setTimeout(() => {
      this.setState({
        board,
        userMove: true,
        status: 'Your move.'
      }, this.handleMoves);
    }, 200)
  }

  render() {
    const board = [...this.state.board];
    const { status, userToken, win } = this.state;
    const props = {
      handleClick: this.handleClick,
      handleNewGame: this.handleNewGame,
      handleSelectToken: this.handleSelectToken,
      board,
      status,
      userToken,
      win,
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
