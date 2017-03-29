import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ChannelText from './ChannelText';

describe(`<ChannelText />`, () => {

  it(`should render <ChannelText /> component`, () => {
    const props = {
      blockName: 'test',
      text: 'sample text'
    }

    const wrapper = shallow(<ChannelText {...props} />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass(`channel-${props.blockName}__container`)).to.be.true;
    expect(wrapper.find('div').text()).to.equal(props.text);
  });

  it(`should render if no props passed`, () => {
    const wrapper = shallow(<ChannelText />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('channel-__container')).to.be.true;
    expect(wrapper.find('div').text()).to.equal('');
  });

  it(`should render if text={null} passed`, () => {
    const wrapper = shallow(<ChannelText text={null} />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass('channel-__container')).to.be.true;
    expect(wrapper.find('div').text()).to.equal('');
  });
});
