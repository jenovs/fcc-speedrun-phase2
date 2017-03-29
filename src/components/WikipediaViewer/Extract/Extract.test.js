import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Extract from './Extract';

describe('<Extract />', () => {
  
  it('Should render <Extract /> component', () => {

    const text = 'Lorem ipsum dolor sit amet.';

    const wrapper = shallow(<Extract text={text}/>);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.instance().props.text).to.equal(text);
    expect(wrapper.text()).to.equal(text);
  });

  it('Should have expected className', () => {
    const wrapper = shallow(<Extract text="text"/>);
    expect(wrapper.hasClass('extract__container')).to.be.true;
  });

  it('Should render without props', () => {
    const wrapper = shallow(<Extract />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.text()).to.be.empty;
  })
});
