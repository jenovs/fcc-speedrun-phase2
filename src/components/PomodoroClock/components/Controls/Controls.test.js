import React from 'react';
import { expect } from 'chai';
// import chai, {expect} from 'chai';
// import chaiEnzyme from 'chai-enzyme';
import { mount, shallow } from 'enzyme';
import { spy, test } from 'sinon';

// chai.use(chaiEnzyme());

import Controls from './Controls';

describe('<Controls />', () => {

  it('should render <Controls /> component', () => {
    const wrapper = shallow(<Controls />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('controls__container')).to.be.true;
  });

  it('should render children', () => {
    const Child = '<div>Child</div>'
    const wrapper = shallow(
      <Controls>
        <span>Child1</span>
        <div>Child2</div>
      </Controls>)

    // expect(wrapper.prop('children').length).to.equal(2);
    expect(wrapper.children().length).to.equal(2);
    expect(wrapper.childAt(0).type()).to.equal('span');
    expect(wrapper.childAt(1).type()).to.equal('div');

    // expect(wrapper.find('div').children().find('div')).to.equal(1);
  });
});
