import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import channels from './../defaultChannels';
import { getUserIds, getStreamInfo } from './../api';

import App from './App';

describe('<App />', () => {

  it('Should render <App /> component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').hasClass('app__container')).to.be.true;
  });

  it(`calls componentDidMount and parseChannelList`, () => {
    const componentDidMountSpy = spy(App.prototype, 'componentDidMount');
    const parseChannelListStub = stub(App.prototype, 'parseChannelList');
    const wrapper = mount(<App />);

    expect(App.prototype.componentDidMount.calledOnce).to.be.true;
    expect(App.prototype.parseChannelList.calledOnce).to.be.true;
    expect(App.prototype.parseChannelList.calledWithExactly(channels)).to.be.true;

    componentDidMountSpy.restore();
    parseChannelListStub.restore();
  });
});
