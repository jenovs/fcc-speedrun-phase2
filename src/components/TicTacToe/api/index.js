const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner(board, token) {

  for (let combo of winningCombos) {
    let win = combo.every(i => board[i] === token);

    if (win) return combo;
  }

  return [];
}

function findWinningMove(board, token) {

  for (let i in board) {
    if (board[i] !== 0) continue;

    let newBoard = [...board];
    newBoard[i] = token;
    let win = checkWinner(newBoard, token);
    if (win.length) return +i;
  }

  return false;
}

function checkEmptyCell(board, position) {
  if (board[position] === 0) return true;
  return false;
}

function getRandomEmptyCell(board) {
  const count = board.filter(i => i === 0).length;
  if (count <= 0) return false;

  let rnd;

  do {
    rnd = Math.floor(Math.random() * 9);
  } while (!checkEmptyCell(board, rnd));

  return rnd;
}

function getMovesCount(board) {
  return board.filter(i => i !== 0).length;
}

module.exports = {
  checkEmptyCell,
  checkWinner,
  findWinningMove,
  getMovesCount,
  getRandomEmptyCell,
}
