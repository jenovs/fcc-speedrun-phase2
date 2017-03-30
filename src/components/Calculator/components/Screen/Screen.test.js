import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy, test } from 'sinon';

import Screen from './Screen';

describe('<Screen />', () => {

  it('should render <Screen /> component with no props', () => {
    const wrapper = shallow(<Screen />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').text()).to.equal('0');
  });

  it('shuld render <Screen /> when props passed', () => {
    const props = {
      expression: ['0', '.', '7']
    }
    const wrapper = shallow(<Screen {...props} />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').text()).to.equal('0.7');
  });
});
