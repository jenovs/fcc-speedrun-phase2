import React from 'react';

import Home from './Home';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { };

    this.fetchArticle = this.fetchArticle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  fetchArticle(id) {
    console.log('fetch article', id);
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&pageids=${id}&prop=extracts`
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        active: id,
        extract: json.query.pages[id].extract
      })
    })
  }

  handleSearch(term) {
    const baseUrl = 'https://en.wikipedia.org/w/api.php?'
    const params = {
      action: 'query',
      generator: 'search',
      prop: 'info',
      inprop: 'url',
      gsrsearch: `intitle:${term}`,
      gsrlimit: 500,
      format: 'json',
      origin: '*'
    }

    function makeUrl(baseUrl, params) {
      const query = Object.keys(params).map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      });

      return baseUrl + query.join('&');
    }

    fetch(makeUrl(baseUrl, params))
    .then(res => res.json())
    .then(json => {
      this.setState({
        titles: json.query.pages
      })
    })
    .catch(e => {
      const errMsg = {
        0: {
          pageid: 0,
          title: "Nothing found :(",
          fullurl: "https://en.wikipedia.org"
        }
      }
      this.setState({
        titles: errMsg
      })
    })
  }

  render() {
    const { extract, titles, active } = this.state;
    const props = {
      extract, titles, active,
      fetchArticle: this.fetchArticle,
      handleSearch: this.handleSearch
    }
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
