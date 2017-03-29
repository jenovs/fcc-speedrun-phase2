
import React from 'react';
import { Link } from 'react-router';

import Temperature from './Temperature';

import './home.scss';

function parseForecast(data, metric) {
  const deg = metric ? `\xB0C` : `\xB0F`

  return data.map((day, i) => (

    <div key={i} className="home__forecast-day">
      {day.date.weekday_short}<br/>
      <img src={day.icon_url.replace('http', 'https')}/><br/>
      {metric ? day.low.celsius : day.low.fahrenheit}{deg} ... {metric ? day.high.celsius : day.high.fahrenheit}{deg}
    </div>

  ))
}

const Home = (props) => {
  let forecast;
  if (props.weather) {
    forecast = props.weather.forecast.simpleforecast.forecastday;
  }
  if (!props.weather) {
    return (
      <div className="home__container">
        <div>Loading...</div>
      </div>
    )
  }
  return (
    <div className="home__container">
      <div className="home__current-weather">
        <div>{props.weather.weather.display_location.full}</div>
        <Temperature
          show_c={props.temp_c}
          temp_c={props.weather.weather.temp_c}
          temp_f={props.weather.weather.temp_f}
          handleToggle={props.handleToggle}
        />
        <div>{props.weather.weather.weather}</div>
        <div><img width="100px" src={props.weather.weather.icon_url.replace('http', 'https')} /></div>
      </div>
      <div className="home__forecast">{parseForecast(forecast, props.temp_c)}</div>
    </div>
  )
}

export default Home;
