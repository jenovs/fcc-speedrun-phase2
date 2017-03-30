import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy, stub, test, useFakeTimers } from 'sinon';

import App from './../components/App';
import Home from './../components/Home';

describe('Interface tests', () => {

  it('should register clicked buttons', test(function() {
    const handleClickSpy = this.spy(App.prototype, 'handleClick');
    const wrapper = mount(<App><Home /></App>)

    expect(wrapper.find('Button')).to.have.length(6);
    wrapper.find('Button').at(0).simulate('click');
    wrapper.find('Button').at(1).simulate('click');
    wrapper.find('Button').at(2).simulate('click');
    wrapper.find('Button').at(3).simulate('click');
    wrapper.find('Button').at(4).simulate('click');
    wrapper.find('Button').at(5).simulate('click');

    expect(App.prototype.handleClick.callCount).to.equal(6);
    expect(App.prototype.handleClick.getCall(0).args[0]).to.equal(0);
    expect(App.prototype.handleClick.getCall(3).args[0]).to.equal(3);

  }));

  it('should set state to running when Start clicked', test(function() {
    const handleClickSpy = this.spy(App.prototype, 'handleClick');
    const wrapper = mount(<App><Home /></App>)

    expect(wrapper.state('running')).to.be.false;

    wrapper.find('Button').at(4).simulate('click');

    expect(App.prototype.handleClick.callCount).to.equal(1);
    expect(wrapper.state('running')).to.be.true;
  }));

  // it('should reset timers and stop running when Reset clicked', test(function() {
  //   const handleClickSpy = this.spy(App.prototype, 'handleClick');
  //   const wrapper = mount(<App><Home /></App>)
  //   wrapper.setState({
  //     running: true,
  //   });
  //
  //   expect(wrapper.state('running')).to.be.true;
  //
  //   wrapper.find('Button').at(5).simulate('click');
  //
  //   expect(App.prototype.handleClick.callCount).to.equal(1);
  //   expect(wrapper.state('running')).to.be.false;
  //   expect(wrapper.state('work')).to.equal(25);
  //   expect(wrapper.state('break')).to.equal(5);
  // }));

  // it('should decrement counter', test(function(done) {
  //   const handleCountdownSpy = this.spy(App.prototype, 'handleCountdown');
  //   const wrapper = mount(<App><Home /></App>)
  //   wrapper.setState({
  //     // running: true,
  //   });
  //
  //   // expect(wrapper.state('running')).to.be.true;
  //
  //   wrapper.find('Button').at(4).simulate('click');
  //   const clock = useFakeTimers();
  //
  //   expect(App.prototype.handleCountdown.callCount).to.equal(1);
  //   expect(wrapper.state('running')).to.be.true;
  //   expect(wrapper.state('work')).to.equal(24);
  //   expect(wrapper.state('break')).to.equal(5);
  //
  //   clock.tick(5001);
  //
  //   expect(wrapper.state('work')).to.equal(23);
  //
  //   clock.restore();
  //
  // }));

  // it('test timer', () => {
  //   const clock = useFakeTimers();
  //   setTimeout(() => {
  //     console.log('waiting over');
  //   }, 1000)
  //   clock.tick(1000);
  //
  //   clock.restore();
  // })
});
