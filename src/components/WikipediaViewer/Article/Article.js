import React from 'react';

import Extract from './../Extract/Extract';

import './main.scss';

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotate: Math.random() * 20 - 10,
      fullurl: this.props.data.fullurl,
      style: 'article__container hidden'
    };
  }

  componentDidMount() {
    this.animate();
  }

  fetchArticle(id) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&pageids=${id}&prop=extracts&explaintext=true`
    fetch(url)
    .then(res => res.json())
    .then(json => {
      this.setState({
        extract: json.query.pages[id].extract
      })
    })
  }

  handleHover(id) {
    if (!this.state.extract) {
      this.fetchArticle(id);
    }
  }

  handleMove(e) {
    if (!this.state.showExtract) {
      this.setState({
        showExtract: true
      })
    }
  }

  handleLeave() {
    this.setState({
      showExtract: false
    })
  }

  handleClick() {
    window.open(this.state.fullurl);
  }

  animate() {
    setTimeout(() => {
      this.setState({
        style: 'article__container'
      })
    }, 300);
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleHover.bind(this, this.props.data.pageid)}
        onMouseMove={this.handleMove.bind(this)}
        onMouseLeave={this.handleLeave.bind(this)}
        onClick={this.handleClick.bind(this)}
        // onTouchStart={this.handleHover.bind(this, this.props.data.pageid)}
        // onTouchMove={this.handleMove.bind(this)}
        // onTouchCancel={this.handleLeave.bind(this)}
        className={this.state.style}
        style={{transform: `rotate(${this.state.rotate}deg)`}}
      >
        {(this.state.showExtract && this.state.extract) ?
          <Extract text={this.state.extract.substring(0, 150) + '...'}/> :
          <div className="article__title">{this.props.data.title}</div>
        }
      </div>
    )
  }
}
