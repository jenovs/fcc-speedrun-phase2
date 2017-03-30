import React from 'react';

import Home from './../Home';
// import './app.scss';

import { getData, saveData } from './../../api';
import sampleRecipes from './../../sample-recipes';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      edit: null,
      lastIndex: 0,
      saveNew: false,
    };
  }

  componentDidMount() {
    let recipes = getData('recipes');
    if (!recipes) {
      recipes = sampleRecipes;
    }

    this.setState({
      recipes,
      lastIndex: recipes.length,
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.state.saveNew || this.state.edit !== null) return this.handleCancel();
      }
    })
  }

  handleEdit(id) {
    this.setState({
      edit: id,
    })
  }

  getIndexFromKey(recipes, key) {
    for (let i = 0; i < recipes.length; i++) {
      if (+recipes[i].split('\t')[0] === key) {
        return i;
      }
    }
  }

  handleDelete(id) {
    const recipes = [...this.state.recipes];
    let ind = this.getIndexFromKey(recipes, id);

    if (ind === undefined) return;

    recipes.splice(ind, 1);

    saveData('recipes', recipes);

    this.setState({
      recipes,
    });
  }

  handleSave(id, title, ingredients, color) {
    const recipes = [...this.state.recipes];

    const { saveNew } = this.state;
    const ind = this.getIndexFromKey(recipes, id);

    if (!title.trim().length) return;
    if (!ingredients.trim().length) ingredients = '*Edit to add some ingredients*';
    recipes[ind] = `${id}\t${title}\t${ingredients}`;

    saveData('recipes', recipes);

    this.setState({
      recipes,
      edit: null,
      saveNew: false,
    })
  }

  handleAdd() {
    const recipes = [...this.state.recipes];
    const { lastIndex } = this.state;

    recipes.push(`${lastIndex}\t\t`);
    this.setState({
      recipes,
      lastIndex: lastIndex + 1,
      edit: lastIndex,
      saveNew: true,
    })
  }

  handleCancel(id) {
    const recipes = [...this.state.recipes];
    const { lastIndex, saveNew } = this.state;
    if (saveNew) {
      recipes.pop();
      return this.setState({
        recipes,
        lastIndex: lastIndex - 1,
        edit: null,
        saveNew: false,
      });
    }

    this.setState({
      edit: null,
    })
  }

  render() {
    const { edit, recipes } = this.state;
    const props = {
      edit,
      recipes,
      handleAdd: this.handleAdd.bind(this),
      handleCancel: this.handleCancel.bind(this),
      handleEdit: this.handleEdit.bind(this),
      handleDelete: this.handleDelete.bind(this),
      handleSave: this.handleSave.bind(this),
    };

    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props));

    return (
      <div className="app__container">
        <Home {...props} />
      </div>
    )
  }
}
