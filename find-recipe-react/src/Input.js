import React from 'react';
import './Input.css';
// import Recipe from './App';

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        recipe: {},
        cuisine: "Any",
        ingredient1: "",
        ingredient2: "",
        ingredient3: ""
      };
  
      this.onIngredient1Change = this.onIngredient1Change.bind(this);
      this.onIngredient2Change = this.onIngredient2Change.bind(this);
      this.onIngredient3Change = this.onIngredient3Change.bind(this);
      this.onSelectChange = this.onSelectChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onIngredient1Change(event) {
        this.setState({
            ingredient1: event.target.value
        });
    }

    onIngredient2Change(event) {
        this.setState({
            ingredient2: event.target.value
        });
    }

    onIngredient3Change(event) {
        this.setState({
            ingredient3: event.target.value
        });
    }

    onSelectChange(event) {
        this.setState({
            cuisine: event.target.value
        });
    }
  
    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.ingredient1);
        console.log(this.state.cuisine);


        try {
            await fetch(`http://localhost:3000/recipes/random/?i=${this.state.ingredient1},${this.state.ingredient2},${this.state.ingredient3}&q=${this.state.cuisine}`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        recipe: result
                    });
            }).catch((error) => { 
                console.log(error); 
            });
            alert("Cuisine: " + this.state.recipe.title + " + Ingredients: " + this.state.recipe.ingredients );
        } catch (error) {
            console.log(error);
        }
        this.setState({
            cuisine: "Any",
            ingredient1: "",
            ingredient2: "",
            ingredient3: "",
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Cuisine* :
                    <select value={this.state.cuisine} onChange={this.onSelectChange} required>
                        <option defaultValue="Any">Any</option>
                        <option value="Asian">Asian</option>
                        <option value="Italian">Italian</option>
                        <option value="Thai">Thai</option>
                    </select>
                </label>
                <br></br>
                <label>
                    Ingredient 1:
                    <input
                        name="Ingredient 1"
                        type="text"
                        value={this.state.ingredient1}
                        onChange={this.onIngredient1Change} />
                    <br></br>
                    Ingredient 2:
                    <input
                        name="Ingredient 2"
                        type="text"
                        value={this.state.ingredient2}
                        onChange={this.onIngredient2Change} />
                    <br></br>
                    Ingredient 3:
                    <input
                        name="Ingredient 3"
                        type="text"
                        value={this.state.ingredient3}
                        onChange={this.onIngredient3Change} />
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>
        );
    }
  }

  export default Input;