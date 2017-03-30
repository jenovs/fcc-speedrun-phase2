import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
// import { spy, test } from 'sinon';

import Pomodoro from './Pomodoro';

describe('<Pomodoro />', () => {

  it('should render Pomodoro component', () => {
    const wrapper = shallow(<Pomodoro />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('pomodoro__container')).to.be.true;
  });
});
