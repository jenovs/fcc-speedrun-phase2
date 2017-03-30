import React from 'react';

import Home from './../Home';

// import './main.scss';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lang: navigator.language.split('-')[0],
    }

    this.switchLang = this.switchLang.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.lang)
  }

  fetchData(lang) {
    fetch(`https://fcc.jenovs.com/api/lipsum/${lang}`)
    .then(res => res.json())
    .then(text => {
      this.setState({
        description: text.description,
        translations: text.translations
      });
    })
    .catch(e => console.log(e));
  }

  switchLang(lang) {
    this.setState({
      lang
    }, () => {
      this.fetchData(this.state.lang)
    });
  }

  render() {
    const { lang, description, translations } = this.state;
    const props = {
      lang,
      description,
      translations,
      switchLang: this.switchLang
    }
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div id="main" className="tribute-page-app__container">
        {/* {childrenWithProps} */}
        <Home {...props} />
      </div>
    )
  }
}
