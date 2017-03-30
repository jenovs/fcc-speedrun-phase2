import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, test } from 'sinon';

import Calculator from './Calculator';

describe('<Calculator />', () => {

  const props = {
    labels: '1234567890',
  }

  it('should render <Calculator /> component', () => {
    const wrapper = shallow(<Calculator />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('calculator__component')).to.be.true;
  });

  it('should render <Screen /> and <Numpad /> components as children and pass props', () => {
    const wrapper = shallow(<Calculator {...props} />);

    expect(wrapper.find('div').children()).to.have.length(2);
    expect(wrapper.find('div > Numpad')).to.have.length(1);
    expect(wrapper.find('div > Screen')).to.have.length(1);
    expect(wrapper.find('Numpad')).to.have.length(1);
    expect(wrapper.find('Numpad').props().labels).to.equal(props.labels);
    expect(wrapper.find('Screen')).to.have.length(1);
    expect(wrapper.find('Screen').props().labels).to.equal(props.labels);
  });
});
