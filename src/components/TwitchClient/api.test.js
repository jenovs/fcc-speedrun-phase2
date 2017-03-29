import { expect } from 'chai';

import { fillEmptyChannels } from './api'

describe('api test', () => {

  const channelList = ['neo', 'trinity', 'morpheus'];
  const response = {
    users: [
      {
        _id: 1,
        name: 'neo'
      }, {
        _id: 3,
        name: 'trinity'
      }]
  };

  it('should run fill empty names', () => {
    const result = fillEmptyChannels(channelList, response);

    expect(result.length).to.equal(channelList.length);
    expect(result[2].name).to.equal(channelList[2]);
    expect(result[2]._id).to.equal(null);
  });
})
