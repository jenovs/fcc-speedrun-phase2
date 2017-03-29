import React from 'react';

import Article from './../Article';

import './main.scss';

const parseArticles = (obj) => {
  const result = [];
  for (let i in obj) {
    result.push(
      <Article
        key={obj[i].pageid}
        data={obj[i]}
      />
    )
  }
  return result;
}

const Articles = (props) => {
  if (!props.titles) return <div></div>
  return (
    <div className="articles__container">
      {parseArticles(props.titles)}
    </div>
  )
}

export default Articles;
