import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
// import { spy, test } from 'sinon';

import Display from './Display';

describe('<Display />', () => {

  it('should render <Display /> component', () => {
    const wrapper = shallow(<Display />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div > p')).to.have.length(1);
    expect(wrapper.hasClass('display__container')).to.be.true;
  });

  it('should render text', () => {
    const props = {
      text: `Pomme d'oro`,
    }
    const wrapper = shallow(<Display {...props} />);

    expect(wrapper.find('div > p').text()).to.equal(props.text);
  })
});
