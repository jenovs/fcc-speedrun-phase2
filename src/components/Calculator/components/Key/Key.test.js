import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import Key from './Key';

describe('<Key />', () => {

  const props = {
    handleClick: spy(),
    label: 42
  };

  it('should render <Key /> component if no props passed', () => {
    const wrapper = shallow(<Key />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('key__container')).to.be.true;
    expect(wrapper.find('div > button')).to.have.length(1);
    expect(wrapper.find('div > button').text()).to.equal(' ');
  });

  it('should handle clicks', () => {
    const wrapper = shallow(<Key {...props}/>);
    wrapper.find('button').simulate('click');

    expect(props.handleClick.callCount).to.equal(1);

    wrapper.find('button').simulate('click')
    wrapper.find('button').simulate('click')

    expect(props.handleClick.callCount).to.equal(3);
  });

  it('should handle click if no props passed', () => {
    const wrapper = shallow(<Key />);

    wrapper.find('button').simulate('click');
  });

  it('should render <Key /> component with numeric label', () => {
    const wrapper = shallow(<Key {...props}/>);

    expect(wrapper.find('button').text()).to.equal(String(props.label));
  });

  it('should render <Key /> component with string label', () => {
    props.label = 'neo';
    const wrapper = shallow(<Key {...props}/>);

    expect(wrapper.find('button').text()).to.equal(props.label);
  });

  it('should render <Key /> component if invalid label', () => {
    props.label = ['a', 5];
    const wrapper = shallow(<Key {...props}/>);

    expect(wrapper.find('button').text()).to.equal(String(props.label));
  });
})
