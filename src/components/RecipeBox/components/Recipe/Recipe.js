import React from 'react';
import { Panel } from 'rc-collapse';
import marked from 'marked';

// import RadioSelector from './../RadioSelector';
import Button from './../Button';

// import './rc-collapse.scss';
import './recipe.scss';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: props.i,
      title: props.title,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
    if (e.target.type === 'textarea') {
      e.target.style.height = '5px';
      e.target.style.height = (e.target.scrollHeight + 5)+"px";

    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ingredients: newProps.i,
      title: newProps.title,
    })
  }

  render() {
    const { handleCancel, handleDelete, handleEdit, handleSave } = this.props;
    const { ingredients, title } = this.state;

    if (this.props.edit) {
      return (
        <div className="recipe__container">
          <div><input type="text" name="title" onChange={this.handleChange} value={title} placeholder="Title (required)"/></div>
          <div><textarea name="ingredients" autoFocus onFocus={this.handleChange} onChange={this.handleChange} value={ingredients} placeholder="Ingredients (markdown formatting supported)"/></div>
          <div className="recipe__controls">
            <Button handleClick={handleSave.bind(this, title, ingredients)} value="Save" color="primary"/>
            <Button handleClick={handleCancel} value="Cancel" color="danger" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="recipe__container">
          <div dangerouslySetInnerHTML={{__html: marked(ingredients)}}></div>
          <div className="recipe__controls">
            <Button handleClick={handleEdit} value="Edit" color="primary" />
            <Button handleClick={handleDelete} value="Delete" color="danger" />
          </div>
        </div>
      )
    }
  }
}

export default Recipe;
