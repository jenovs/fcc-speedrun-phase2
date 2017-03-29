import React from 'react';

import { parseLangCode } from './helpers';

import Home from './Home';
import Footer from './Footer';

import './app.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      attempts: 0,
      temp_c: true
    };

    this.getLocation = this.getLocation.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.switchTemp = this.switchTemp.bind(this);
  }

  componentDidMount() {
    navigator.permissions.query({'name': 'geolocation'})
    .then(perm => {
      if (perm.state === 'denied') {
        this.getLocationFromIp()
        .then(json => this.fetchData(json.lat, json.lon, this.getBrowserLanguage()))
      }
      // else if (perm.state === 'prompt') {
      //   this.getLocationFromIp()
      //   .then(json => this.fetchData(json.lat, json.lon, this.getBrowserLanguage()))
      //   .then(() => this.getLocation())
      // }
      else this.getLocation();
    })
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {

      const { latitude, longitude } = pos.coords;
      this.fetchData(latitude, longitude, this.getBrowserLanguage());

    }, (error) => {

      this.getLocationFromIp()
      .then(json => this.fetchData(json.lat, json.lon, this.getBrowserLanguage()))
      .catch(e => console.log(e));
    });
  }

  getBrowserLanguage() {
    const lang = navigator.language.toUpperCase();
    return parseLangCode(lang);
  }

  getLocationFromIp() {
    return fetch('//extreme-ip-lookup.com/json/')
    .then(res => res.json())
  }

  fetchData(lat, lon, lang) {
    const data = {
      lat,
      lon,
      lang
    }
    // return fetch('./response.json')
    return fetch('https://fcc.jenovs.com/api/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        weather: json
      });
    })
    .catch(e => {
      console.log(e)
      if (this.state.attempts < 3) {
        this.setState({
          attempts: this.state.attempts + 1
        }, () => {
          console.log('attempt', this.state.attempts);
          this.getLocationFromIp()
          .then(json => this.fetchData(json.lat, json.lon, this.getBrowserLanguage()))
        })
      }
    });
  }

  switchTemp() {
    this.setState({
      temp_c: !this.state.temp_c
    })
  }

  render() {
    const { lat, lon, weather, temp_c } = this.state;
    const props = {
      lat, lon, weather, temp_c,
      handleToggle: this.switchTemp
    }
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div id="main" className="app__container">
        <Home {...props} />
        <Footer />
      </div>
    )
  }
}
