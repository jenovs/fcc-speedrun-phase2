import { expect } from 'chai';

import { validate } from './';

describe('helpers/validate()', () => {

  describe('array is empty', () => {

    it('should update array if number or decimal', () => {

      expect(validate([], '5').length).to.equal(1);
      expect(validate([], '5')[0]).to.equal('5');
      expect(validate([], 5).length).to.equal(1);
      expect(validate([], 5)[0]).to.equal(5);
      expect(validate([], '.').length).to.equal(1);
      expect(validate([], '.')[0]).to.equal('.');
      expect(validate([], '+').length).to.equal(0);
      expect(validate([], 'C').length).to.equal(0);
    });
  });

  describe('array not empty, user input is decimal', () => {

    it('last input was a number', () => {
      let input = ['8'];
      expect(validate(input, '.').length).to.equal(2);
      expect(validate(input, '.')[1]).to.equal('.');

      input = ['.', '5', '+', '7'];
      expect(validate(input, '.').length).to.equal(5);
      expect(validate(input, '.')[4]).to.equal('.');

      input = ['.', '5'];
      expect(validate(input, '.').length).to.equal(2);
      expect(validate(input, '.')[1]).to.equal('5');
    });

    it('last input was decimal', () => {
      let input = ['.'];
      expect(validate(input, '.').length).to.equal(1);
      expect(validate(input, '.')[0]).to.equal('.');
    });

    it('last input was operator', () => {
      let input = ['6', '+'];
      expect(validate(input, '.').length).to.equal(3);
      expect(validate(input, '.')[2]).to.equal('.');
    });
  });

  describe('array not empty, user input is operator', () => {

    it('last input was a number', () => {
      let input = ['5'];
      expect(validate(input, '+').length).to.equal(2);
      expect(validate(input, '+')[1]).to.equal('+');
    });

    it('last input was an operator; should replace operator', () => {
      let input = ['5', '+'];
      expect(validate(input, '*').length).to.equal(2);
      expect(validate(input, '*')[0]).to.equal('5');
      expect(validate(input, '*')[1]).to.equal('*');
    });

    it('last input was a decimal; should replace decimal', () => {
      let input = ['5', '.'];
      expect(validate(input, '*').length).to.equal(2);
      expect(validate(input, '*')[0]).to.equal('5');
      expect(validate(input, '*')[1]).to.equal('*');
    });
  });

  describe('array not empty, user input is number', () => {

    it('should update the array', () => {
      let input = ['5', '.'];
      expect(validate(input, '7').length).to.equal(3);
      expect(validate(input, '7')[0]).to.equal('5');
      expect(validate(input, '7')[1]).to.equal('.');
      expect(validate(input, '7')[2]).to.equal('7');

      input = ['5', '6'];
      expect(validate(input, '7').length).to.equal(3);
      expect(validate(input, '7')[0]).to.equal('5');
      expect(validate(input, '7')[1]).to.equal('6');
      expect(validate(input, '7')[2]).to.equal('7');

      input = ['5', '-'];
      expect(validate(input, '7').length).to.equal(3);
      expect(validate(input, '7')[0]).to.equal('5');
      expect(validate(input, '7')[1]).to.equal('-');
      expect(validate(input, '7')[2]).to.equal('7');
    });
  });
});
