import React from 'react';
import Collapse, { Panel } from 'rc-collapse';

import Button from './../Button';
import Recipe from './../Recipe';

import './rc-collapse.scss';
import './home.scss';

const parseItems = (data) => {
  return data.recipes.map((i, ind) => {
    const recipeData = i.split('\t');
    const key = recipeData[0];
    const header = recipeData[1];
    const ingredients = recipeData[2];
    // console.log(ingredients);
    return (
      <Panel header={header} key={key} className="home__panel">
        <Recipe
          title={header}
          i={ingredients}
          edit={data.edit === +key}
          handleEdit={data.handleEdit.bind(this, +key)}
          handleDelete={data.handleDelete.bind(this, +key)}
          handleSave={data.handleSave.bind(this, +key)}
          handleCancel={data.handleCancel.bind(this, +key)}
        />
      </Panel>
    )
  })
};

const styleEdit = {
  backgroundColor: 'gray',
  transition: 'background-color 0.3s'
}

const Home = (props) => (
  <div className="recipe-box-home__container">
    {/* <div className="recipe-box-home__title">Recipe Box</div> */}
    {props.edit === null
      ? <Collapse accordion={true} className="recipe-box-home__collapse">
        {parseItems(props)}
      </Collapse>
      : <Collapse accordion={true} className="recipe-box-home__collapse" activeKey={String(props.edit)} style={styleEdit}>
        {parseItems(props)}
      </Collapse>
    }
    {props.edit === null && <div className="recipe-box-home__button-add"><Button handleClick={props.handleAdd} value="Add" color="primary"/></div>}
  </div>
);

export default Home;
