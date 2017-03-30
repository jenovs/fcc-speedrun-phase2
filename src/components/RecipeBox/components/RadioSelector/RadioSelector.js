import React from 'react';

class RadioSelector extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: 0,
    };
  }

  handleChange(e) {
    console.log(e.target.id);
  }

  render() {
    const { selected } = this.state;
    return (
      <form onChange={this.handleChange}>
        <label htmlFor="0">
          <span
            style={{backgroundColor: 'red', width: '1rem', display: 'inline-block', border: '1px solid black'}}>
            &nbsp;
          </span>
        </label>
        <input type="radio" id="0" hidden={true} />
        <label htmlFor="1">
          <span
            style={{backgroundColor: 'green', width: '1rem', display: 'inline-block', border: '1px solid black'}}>
            &nbsp;
          </span>
        </label>
        <input type="radio" id="1" hidden={true}/>
      </form>
    )
  }
}

export default RadioSelector;
