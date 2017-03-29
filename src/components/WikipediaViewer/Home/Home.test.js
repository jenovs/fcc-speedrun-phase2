import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Home from './Home';

describe('<Home />', () => {

  it('Should render <Home /> component', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('div')).to.have.length(3);
    expect(wrapper.find('Search')).to.have.length(1);
    expect(wrapper.find('Articles')).to.have.length(1);
  });
});
