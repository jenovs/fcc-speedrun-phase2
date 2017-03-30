import { expect } from 'chai';
import { stub } from 'sinon';

import {
  checkEmptyCell,
  checkWinner,
  findWinningMove,
  getMovesCount,
  getRandomEmptyCell,
} from './';

describe.only('Logic tests', () => {

  describe('checkWinner', () => {

    it('should return array of combo if winning combo present', () => {
      // horizontal line
      let board = ['X', 'X', 'X', 'O', 'O', 0, 0, 0, 0];
      let token = 'X';
      expect(checkWinner(board, token)).to.eql([0, 1, 2]);

      // horizontal line another token
      board = ['X', 'X', 0, 'O', 'O', 'O', 0, 0, 0];
      token = 'O';
      expect(checkWinner(board, token)).to.eql([3, 4, 5]);

      // vertical line
      board = [0, 'X', 'O', 'X', 'X', 'O', 'O', 'X', 0];
      token = 'X';
      expect(checkWinner(board, token)).to.eql([1, 4, 7]);

      // diagonal
      board = ['O', 'X', 'X', 0, 'O', 0, 0, 'X', 'O'];
      token = 'O';
      expect(checkWinner(board, token)).to.eql([0, 4, 8]);
    });

    it('should return empty array if no winning combos present', () => {
      let board = ['X', 'O', 0, 0, 0, 0, 0, 0, 0];
      let token = 'O';
      expect(checkWinner(board, token)).to.have.length(0);
      expect(checkWinner(board, token)).to.be.an('array');
    });
  });

  describe('findWinningMove', () => {

    it('should return index of next winning move for given token', () => {
      let board = ['X', 'X', 0, 'O', 'O', 0, 0, 0, 0];
      let token = 'X';
      expect(findWinningMove(board, token)).to.equal(2);

      board = ['O', 'X', 0, 'O', 'O', 0, 0, 0, 0];
      token = 'O';
      expect(findWinningMove(board, token)).to.equal(5);
    });

    it('should return false if no winning moves possible', () => {
      let board = ['X', 'X', 'O', 0, 0, 0, 0, 0, 0];
      let token = 'O';
      expect(findWinningMove(board, token)).to.equal(false);
    });

    it('should return false if board is full', () => {
      let board = ['X', 'X', 'O', 'O', 'O', 'X', 'O', 'O', 'X'];
      let token = 'O';
      expect(findWinningMove(board, token)).to.equal(false);
    });
  });

  describe('checkEmptyCell', () => {

    it('should return true if cell is empty', () => {
      let board = ['X', 'X', 'O', 0, 0, 0, 0, 0, 0];
      let position = 3;
      expect(checkEmptyCell(board, position)).to.equal(true);
    });

    it('should return false if cell is not empty', () => {
      let board = ['X', 'X', 'O', 0, 0, 0, 0, 0, 0];
      let position = 2;
      expect(checkEmptyCell(board, position)).to.equal(false);
    });
  });

  describe('getRandomEmptyCell', () => {

    it('should return random empty cell', () => {
      let board = ['X', 'X', 'O', 0, 0, 0, 0, 0, 0];
      const mathStub = stub(Math, 'random');

      mathStub.onCall(0).returns(0.1);
      mathStub.onCall(1).returns(0.55);
      mathStub.onCall(2).returns(0.99);

      expect(getRandomEmptyCell(board)).to.equal(4);
      expect(getRandomEmptyCell(board)).to.equal(8);

      mathStub.restore();
    });
  });

  describe('getMovesCount', () => {

    it('should return number of moves', () => {
      let board = ['X', 'X', 'O', 0, 0, 0, 0, 0, 0];

      expect(getMovesCount(board)).to.equal(3);

      board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      expect(getMovesCount(board)).to.equal(0);
    });

  });
});
