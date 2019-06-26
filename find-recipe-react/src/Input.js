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
        // countries = [
        //     "Any Cuisine",                                  
        //     "American",
        //     "Chinese",
        //     "Colombian",
        //     "French",
        //     "Greek",
        //     "Indian",
        //     "Italian",
        //     "Japanese",
        //     "Korean",
        //     "Lebanese",
        //     "Mediterranean",
        //     "Mexican",
        //     "Spanish",
        //     "Caribbean",
        //     "Thai",
        // ]
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
    
    onAmericaClick() {
        var image_america =  document.getElementById("america");
        var image_france =  document.getElementById("france");
        var image_italy =  document.getElementById("italy");

        if (image_america.getAttribute('src') === "america.png") {
            image_america.src = "america-selected.png";
            image_italy.src = "italy.png";
            image_france.src = "france.png";
            this.state.cuisine = "American";
        } else {
            image_america.src = "america.png";
        }     
    }

    onFranceClick() {
        var image_america =  document.getElementById("america");
        var image_france =  document.getElementById("france");
        var image_italy =  document.getElementById("italy");

        if (image_france.getAttribute('src') === "france.png") {
            image_france.src = "france-selected.png";
            image_america.src = "america.png";
            image_italy.src = "italy.png";
            this.state.cuisine = "French";
        } else {
            image_france.src = "france.png";
        }   
    }

    onItalyClick() {
        var image_america =  document.getElementById("america");
        var image_france =  document.getElementById("france");
        var image_italy =  document.getElementById("italy");

        if (image_italy.getAttribute('src') === "italy.png") {
            image_italy.src = "italy-selected.png";
            image_america.src = "america.png";
            image_france.src = "france.png";
            this.state.cuisine = "Italian";
        } else {
            image_italy.src = "italy.png";
        }   
    }

    render() {
        return (
            <div className="input">
                <div className="cuisine-images">
                    <img id="america" src="america.png" alt="American Flag Circle" height="15%" onClick={() => this.onAmericaClick()}  title="American Food"/>
                    <img id="france" src="france.png" alt="French Flag Circle" height="15%" onClick={() => this.onFranceClick()}  title="French Food"/>
                    <img id="italy" src="italy.png" alt="Italian Flag Circle" height="15%" onClick={() => this.onItalyClick()}  title="Italian Food"/>

                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            {/* <div className="custom-select">
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
                            </div> */}


                        </label>
                        <br></br>
                        <label>
                            <input
                                name="Ingredient 1"
                                type="text"
                                value={this.state.ingredient1}
                                onChange={this.onIngredient1Change} />
                            <input
                                name="Ingredient 2"
                                type="text"
                                value={this.state.ingredient2}
                                onChange={this.onIngredient2Change} />
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