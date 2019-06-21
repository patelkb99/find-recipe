import React from 'react';
import './Input.css';

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        cuisine: "Any",
        ingredient1: "",
        ingredient2: "",
        ingredient3: ""
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onInputChange = this.onInputChange.bind(this);

    }

    onInputChange(event) {
        this.setState({ingredient1: event.target.value});
    }
  
    handleSubmit(event) {
        this.setState({
            cuisine: event.target.value,
            ingredient1: event.target.value
        });
        alert("Cuisine: " + this.state.cuisine + " & Ingredient: " + this.state.ingredient1 );
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Is going:
                    <select value={this.state.cuisine}>
                        <option selected value="Any">Any</option>
                        <option value="Asian">Asian</option>
                        <option value="Italian">Italian</option>
                        <option value="Thai">Thai</option>
                    </select>
                </label>
                <br></br>
                <label>
                    Ingredient:
                    <input
                        name="Ingredient 1"
                        type="text"
                        value={this.state.ingredient1}
                        onChange={this.onInputChange} />
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        );
    }
  }

  export default Input;