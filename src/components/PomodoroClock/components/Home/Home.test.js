import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Home from './Home';

describe('<Home />', () => {

  it('should render <Home /> component', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('home__container')).to.be.true;
  });

  it('should render children', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('Pomodoro')).length.to.be(1);
    expect(wrapper.find('Pomodoro > Controls')).length.to.be(2);
    expect(wrapper.find('Pomodoro > Display')).length.to.be(3);
    expect(wrapper.find('Pomodoro').childAt(1).name()).to.equal('Controls');
    expect(wrapper.find('Pomodoro').childAt(2).name()).to.equal('Display');
    expect(wrapper.find('Pomodoro').childAt(4).name()).to.equal('Controls');
  });
});
