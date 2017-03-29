import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Logo from './Logo';

describe('<Logo />', () => {

  it('Should render <Logo /> component', () => {
    const wrapper = shallow(<Logo />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div > img')).to.have.length(1);
    expect(wrapper.find('div').children()).to.have.length(1);
    expect(wrapper.find('img')).to.have.length(1);
    expect(wrapper.hasClass('logo__container')).to.be.true;
  });

  it('Should pass props.src to img', () => {
    const src = 'image_url';
    const wrapper = shallow(<Logo src={src} />);

    expect(wrapper.find('img').props().src).to.equal(src);
  });

  it('no props', () => {
    const wrapper = shallow(<Logo />);

    expect(wrapper.find('img')).to.have.length(1);
  })
});
