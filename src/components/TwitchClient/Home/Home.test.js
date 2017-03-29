import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Home from './Home';

describe('<Home />', () => {

  it('Should render <Home /> component', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('home__container')).to.be.true;
  });
});
