import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';

import App from './../components/App';
import Home from './../components/Home';

import labels from './../keyLabels';

describe('Interface test', () => {

  it('should call handleClick when key clicked', () => {
    const handleClickSpy = spy(App.prototype, 'handleClick');
    const wrapper = mount(<App><Home /></App>);

    expect(wrapper.find('Key')).to.have.length(labels.length);
    wrapper.find('Key > button').first().simulate('click');

    expect(App.prototype.handleClick.callCount).to.equal(1);
    expect(App.prototype.handleClick.args[0][0]).to.equal(labels[0]);

    handleClickSpy.reset();

    wrapper.find('Key > button').at(4).simulate('click');
    wrapper.find('Key > button').at(11).simulate('click');

    expect(App.prototype.handleClick.callCount).to.equal(2);
    expect(App.prototype.handleClick.getCall(0).args[0][0]).to.equal(labels[4]);
    expect(App.prototype.handleClick.getCall(1).args[0][0]).to.equal(labels[11]);

    handleClickSpy.restore();
  });
})
