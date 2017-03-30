import React from 'react';

import Button from './../Button';
import Controls from './../Controls';
import Display from './../Display';
import Pomodoro from './../Pomodoro';

import buttonMap from './../../buttonMap';
import { parseTime } from './../../helpers';

import './home.scss';

const Home = (props) => (
  <div className="pomodoro-home__container">
    <Pomodoro {...props}>
      <Display text={`Work \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 \xa0 Break`} className="pomodoro-home__label"/>
      <Controls {...props}>
        <Button {...props} dataId={0} value={buttonMap[0]} />
        <Display text={String(props.work)} className="pomodoro-home__time-setting" />
        <Button {...props} dataId={1} value={buttonMap[1]} />
        <Button {...props} dataId={2} value={buttonMap[2]}/>
        <Display text={String(props.breakTime)} className="pomodoro-home__time-setting" />
        <Button {...props} dataId={3} value={buttonMap[3]} />
      </Controls>
      <Display text={props.activeTimer} className="pomodoro-home__timer-label" />
      <Display text={parseTime(props.timer)} className="pomodoro-home__timer" />
      <Controls>
        {props.running ?
          <Button {...props} dataId={6} value={buttonMap[6]} /> :
          <Button {...props} dataId={4} value={buttonMap[4]} />
        }
        <Button {...props} dataId={5} value={buttonMap[5]} />
          </Controls>
    </Pomodoro>
  </div>
);

export default Home;
