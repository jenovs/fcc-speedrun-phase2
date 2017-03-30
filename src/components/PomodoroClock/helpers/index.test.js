import { expect } from 'chai';

import { parseTime } from './';

describe('parseTime', () => {

  it('should return parsed time', () => {
    expect(parseTime(60)).to.equal('01 : 00');
    expect(parseTime(5)).to.equal('00 : 05');
    expect(parseTime(62)).to.equal('01 : 02');
    expect(parseTime(75)).to.equal('01 : 15');
    expect(parseTime(601)).to.equal('10 : 01');
  });
});
