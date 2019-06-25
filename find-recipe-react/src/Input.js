import React from 'react';
import './Input.css';

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        found: false,
        recipe: {},
        cuisine: "Any",
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
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
            console.log(`http://localhost:3000/recipes/random/?i=${this.state.ingredient1},${this.state.ingredient2},${this.state.ingredient3}&q=${this.state.cuisine}`)
            await fetch(`http://localhost:3000/recipes/random/?i=${this.state.ingredient1},${this.state.ingredient2},${this.state.ingredient3}&q=${this.state.cuisine}`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        recipe: result,
                        found: true
                    });
            }).catch((error) => { 
                console.log(error); 
            });
            document.getElementById('recipe-response').style.display = "block";

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
        const found = this.state.found;
        return (
            <div className="input">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <div className="custom-select">
                                Cuisine* :
                                <select value={this.state.cuisine} onChange={this.onSelectChange}>
                                    <option value="">Any Cuisine</option>                                    
                                    <option value="American">American</option>
                                    <option value="Chinese">Chinese</option>
                                    <option value="Colombian">Colombian</option>
                                    <option value="French">French</option>
                                    <option value="Greek">Greek</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Japanese">Japanese</option>
                                    <option value="Korean">Korean</option>
                                    <option value="Lebanese">Lebanese</option>
                                    <option value="Mediterranean">Mediterranean</option>
                                    <option value="Mexican">Mexican</option>
                                    <option value="Spanish">Spanish</option>
                                    <option value="Caribbean">Italian</option>
                                    <option value="Thai">Thai</option>
                                </select>
                            </div>
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
                        <div className="submit">
                            <input name="submit-button" type="submit" value="Submit"/>
                        </div>
                            
                    </form>
                </div>
                <div id="recipe-response" style={{display: this.state.found ? 'block' : 'none' }} >
                    <h4>You should cook <a href={this.state.recipe.href} target="_blank">{this.state.recipe.title}</a> today!</h4>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>Ingredients: {this.state.recipe.ingredients}</p>
                </div>
            </div>
        );
        
    }
}

export default Input;