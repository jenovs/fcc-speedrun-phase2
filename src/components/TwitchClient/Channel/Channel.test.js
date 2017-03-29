import React from 'react';
import { expect, assert } from 'chai';
import { mount, shallow } from 'enzyme';
import { spy } from 'sinon';

import Channel from './Channel';

describe('<Channel />', () => {

  it(`calls componentDidMount`, () => {
    const componentDidMountSpy = spy(Channel.prototype, 'componentDidMount');
    const wrapper = mount(<Channel />);
    expect(Channel.prototype.componentDidMount.calledOnce).to.equal(true);

    componentDidMountSpy.restore();
  });

  it(`calls getStreamInfo if state._id isn't null`, () => {
    const getStreamInfoSpy = spy(Channel.prototype, 'getStreamInfo');
    const wrapper = mount(<Channel getStreamInfo={() => {return Promise.resolve()}} _id={123}/>);

    expect(getStreamInfoSpy.called).to.be.true;
    expect(getStreamInfoSpy.calledOnce).to.be.true;
    expect(getStreamInfoSpy.calledWithExactly(123)).to.be.true;

    getStreamInfoSpy.restore();
  });

  it(`doesn't call getStreamInfo if state._id is null`, () => {
    const getStreamInfoSpy = spy(Channel.prototype, 'getStreamInfo')
    const wrapper = mount(<Channel getStreamInfo={() => {}} />);

    expect(getStreamInfoSpy.called).to.be.false;

    getStreamInfoSpy.restore();

  });

  it(`should update state after successful getStreamInfo call`, () => {

    const fakeAjaxCall = () => {
      return Promise.resolve({stream: 'ok'})
    }

    const wrapper = shallow(<Channel getStreamInfo={fakeAjaxCall} />);
    wrapper.instance().getStreamInfo(123);

    return Promise.resolve()
      .then(() => {
        expect(wrapper.update().state('stream')).to.equal('ok');
      });
  });

  it(`should handle click on Channel component`, () => {
    const props = {
      _id: 123,
      name: 'matrix'
    }
    const handleClickSpy = spy(Channel.prototype, 'handleClick');
    const wrapper = shallow(<Channel {...props} />);
    wrapper.find('div').first().simulate('click');

    expect(handleClickSpy.calledOnce).to.be.true;
    expect(handleClickSpy.calledWithExactly(props.name)).to.be.true;

    handleClickSpy.restore();
  });

  it(`should handle click on Channel component when name is null`, () => {
    const handleClickSpy = spy(Channel.prototype, 'handleClick');
    const wrapper = shallow(<Channel />);
    wrapper.find('div').first().simulate('click');

    expect(handleClickSpy.calledOnce).to.be.true;
    expect(handleClickSpy.calledWithExactly(undefined)).to.be.true;

    handleClickSpy.restore();
  });
});
