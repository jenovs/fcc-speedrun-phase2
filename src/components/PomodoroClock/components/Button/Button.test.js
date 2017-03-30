import React from 'react';
// import { expect } from 'chai';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, test } from 'sinon';

chai.use(chaiEnzyme());

import Button from './Button';

describe('<Button />', () => {

  it('should render <Button /> component', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.hasClass('btn')).to.be.true;
    expect(wrapper.find('input')).to.have.attr('type', 'button');
  });

  it(`should have 'border-radius:50%' when round is set to true`, () => {
    const wrapper = shallow(<Button round={true}/>);

    expect(wrapper).to.have.style('border-radius', '50%');
  });

  it('should have id', () => {
    const wrapper = shallow(<Button dataId={123}/>);

    expect(wrapper).to.have.data('id', 123);
  });

  it(`it should call 'handleClick' when clicked`, test(() => {
    const props = {
      handleClick: spy(),
    }
    const wrapper = shallow(<Button {...props} />);

    wrapper.find('input').simulate('click');
    expect(props.handleClick.callCount).to.equal(1);

    wrapper.find('input').simulate('click');
    expect(props.handleClick.callCount).to.equal(2);
  }));
});
