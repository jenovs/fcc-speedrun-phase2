import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy, stub, test } from 'sinon';

import App from './App';

describe('<App />', () => {

  it('should render <App /> component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').hasClass('app__container')).to.be.true;
  });
});
