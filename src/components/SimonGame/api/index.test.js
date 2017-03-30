import { expect } from 'chai';
import { spy, stub } from 'sinon';

import * as api from './';
// import { getRandomArray } from './';

describe('Logic test', () => {

  // it('should run tests', () => {
  //   // console.log(api.getRandomNumber());
  //   console.log(api.testRandom());
  //   const getRandomStub = stub(api, 'getRandomNumber')
  //   // getRandomStub.onCall(0).returns(5);
  //   getRandomStub.onCall(1).returns(7);
  //   console.log(api.testRandom());
  //   console.log(api.testRandom());
  //   // console.log(api.getRandomNumber());
  //   // api.testRandom();
  //
  //   getRandomStub.restore();
  // });

  it('should get an array of 20 random integers from 0 to 3', () => {
    const arr = api.getRandomArray(20);
    expect(arr).to.have.length(20);
    expect(arr[0]).to.be.an('number');
    expect(arr.every(i => (i < 4 && typeof i === 'number'))).to.be.true;
  });
});
