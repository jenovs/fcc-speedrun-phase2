import React from 'react';

import './main.scss';

const options = {
  placeholder: 'Search Wikipedia...'
}

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
      size: 20,
    };
  }

  handleSearch(e) {
    e.preventDefault();
    if (!this.state.term.trim().length) return ;
    const searchTerm = this.state.term;
    this.setState({
      term: ''
    });
    this.props.handleSearch(searchTerm);
  }

  handleChange(e) {
    this.setState({
      term: e.target.value
    })
  }

  render() {
    return (
      <div className="search__container">
        <form className="search__form" onSubmit={this.handleSearch.bind(this)}>
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            placeholder={options.placeholder}
            value={this.state.term}
            autoFocus
            size={this.state.size}
          />
          <div className="search__controls">
            <div>
              <button className="search__button" type="submit"><i className="fa fa-search fa-2x" aria-hidden="true"></i></button>
            </div>
            <div>
              <button onClick={() => {window.open('https://en.wikipedia.org/wiki/Special:Random')}}><i className="fa fa-random fa-2x" aria-hidden="true"></i></button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
