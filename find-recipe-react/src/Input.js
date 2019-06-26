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
        cuisines: [
            'american',
            'chinese',
            // 'columbian',
            'french',
            // 'greek',
            'indian',
            'italian',
            // 'japanese',
            // 'korean',
            // 'mexican',
            // 'spanish',
            // 'caribbean',
            // 'thai',
        ]
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

    onClick(image) {
        if (`${image.id}.png` === "america-selected.png") {
            image.src = `${image.id}.png`;
        } else {
            for (let i = 0; i < (this.state.cuisines.length); i++) {
                var currentCountry = this.state.cuisines[i];
                var temp = document.getElementById(`${currentCountry}`);
                temp.src = `${temp.id}.png`;
                this.state.cuisine = image.id;
            }
            image.src = `${image.id}-selected.png`;
        }
        console.log(this.state.cuisine);
    }

    // onClick(image) {
    //     console.log(image)
    //     if (image === "america-selected.png") {
    //         image.src = `${image.id}.png`;
    //     } else {
    //         for (let i = 0; i < (this.state.cuisines.length); i++) {
    //             var currentCountry = this.state.cuisines[i];
    //             var temp = document.getElementById(`${currentCountry}`);
    //             temp.src = `${temp.id}.png`;
    //             this.state.cuisine = image.id;
    //         }
    //         image.src = `${image.id}-selected.png`;
    //     }
    //     console.log(this.state.cuisine);
    // }

    render() {
        return (
            <div className="filters">
                <div className="cuisine-images">
                    {/* <span id="american" class="flag-icon flag-icon-us flag-icon-squared" title="American Food" onClick={() => this.onClick(document.getElementById("american"))}> </span>
                    <span id="chinese" class="flag-icon flag-icon-cn flag-icon-squared" title="Chinese Food"> </span>
                    <span id="italy" class="flag-icon flag-icon-it flag-icon-squared" title="Italian Food"> </span>
                    <span id="french" class="flag-icon flag-icon-fr flag-icon-squared" title="French Food"> </span>
                    <span id="indian" class="flag-icon flag-icon-in flag-icon-squared" title="Indian Food"> </span> */}

                    <img id="american" src="american.png" alt="American Flag Circle" height="15%" onClick={() => this.onClick(document.getElementById("american"))}  title="American Food"/>
                    <img id="french" src="french.png" alt="French Flag Circle" height="15%" onClick={() => this.onClick(document.getElementById("french"))}  title="French Food"/>
                    <img id="italian" src="italian.png" alt="Italian Flag Circle" height="15%" onClick={() => this.onClick(document.getElementById("italian"))}  title="Italian Food"/>
                    <img id="indian" src="indian.png" alt="Indian Flag Circle" height="15%" onClick={() => this.onClick(document.getElementById("indian"))}  title="Indian Food"/>
                    <img id="chinese" src="chinese.png" alt="Chinese Flag Circle" height="15%" onClick={() => this.onClick(document.getElementById("chinese"))}  title="Chinese Food"/>
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <label className="ingredient-input">
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
                    <p>Ingredients: {this.state.recipe.ingredients}</p>
                </div>
            </div>
        );
        
    }
}

export default Input;