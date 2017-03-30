import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, test } from 'sinon';

import Numpad from './Numpad';

import labels from './../../keyLabels';

describe('<Numpad />', () => {

  it('should render <Numpad /> component', () => {
    const wrapper = shallow(<Numpad />);

    expect(wrapper.find('div')).to.have.length(1);
    // expect(wrapper.prop('label')).to.equal(1);
    // expect(wrapper.instance().props.labels).to.equal('1234567890.+-*/=C');
  });

  it('should render <Key /> components', () => {
    const wrapper = shallow(<Numpad />);

    expect(wrapper.find('Key')).to.have.length(labels.length);
    expect(wrapper.find('Key').get(3).props.label).to.equal(labels[3]);
    expect(wrapper.find('Key').last().props().label).to.equal(labels[labels.length-1]);
  });

  it('should add handleClick with corresponding labels as args to <Key /> components', () => {
    const handleClick = {bind: () => {}};
    const handleClickSpy = spy(handleClick, 'bind');
    const wrapper = shallow(<Numpad handleClick={handleClick} />);

    expect(handleClickSpy.callCount).to.equal(labels.length);
    expect(handleClickSpy.firstCall.calledWithExactly(this, labels[0])).to.be.true;
    expect(handleClickSpy.lastCall.calledWithExactly(this, labels[labels.length-1])).to.be.true;

    handleClickSpy.restore();
  });
});
