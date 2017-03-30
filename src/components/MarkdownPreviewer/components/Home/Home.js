import React from 'react';
import marked from 'marked';

import './home.scss';
import sample from './../../sample_input';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      input: sample,
    };
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    })
  }

  render() {
    const { input } = this.state;
    return (
      <div className="markdown-home__container">
        <div className="markdown-home__textarea">
          <textarea
            autoFocus={true}
            onChange={this.handleChange.bind(this)}
            value={input} />
        </div>
        <div className="markdown-home__output">
          <p dangerouslySetInnerHTML={{__html: marked(input)}}></p>
        </div>
      </div>
    )
  }
}

export default Home;
