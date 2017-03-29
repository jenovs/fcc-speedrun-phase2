import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Channels from './Channels';

describe(`<Channels />`, () => {

  const props = {
    channels: [{
      _id: 42,
      name: 'neo',
      bio: 'he is the one'
    }, {
      _id: 451,
      name: 'trinity'
    }],
    getStreamInfo: () => Promise.resolve()
  };

  it(`should render <Channels /> component if props.channels passed`, () => {
    const wrapper = shallow(<Channels {...props} />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.hasClass(`channels__container`)).to.be.true;
  });

  it(`should render <Channels /> component with text 'Loading...' if no props passed`, () => {
    const wrapper = shallow(<Channels />);

    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('div').text()).to.be.equal('Loading...');
    expect(wrapper.find('Channel')).to.have.length(0);

  });

  it(`should render two <Channel /> components and pass props`, () => {
    const wrapper = mount(<Channels {...props} />);

    expect(wrapper.find('Channel')).to.have.length(2);
    expect(wrapper.find('Channel').get(0).props.name).to.equal(props.channels[0].name);
    expect(wrapper.find('Channel').get(0).props.bio).to.equal(props.channels[0].bio);
    expect(wrapper.find('Channel').get(1).props._id).to.equal(props.channels[1]._id);
  });

  it(`should assign key id if no _id present`, () => {
    const wrapper = mount(<Channels channels={[{name: 'mr.nobody'}]} />);

    expect(wrapper.find('Channel')).to.have.length(1);
    expect(wrapper.find('Channel').key()).to.equal('x0');
  });
});
