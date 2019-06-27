import React from 'react';
import './Input.css';
import ReactTooltip from 'react-tooltip'

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        found: false,
        recipe: {},
        cuisine: "",
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
        cuisines: [
            'american',
            'chinese',
            'colombian',
            'french',
            'greek', 
            'indian',
            'italian',
            'japanese',
            'korean',
            'mexican',
            'spanish',
            'thai',
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
        try {
            var url = "";
            if (this.state.ingredient1 !== "" ) {
                url += this.state.ingredient1 + ",";
            }
            if (this.state.ingredient2 !== "" ) {
                url += this.state.ingredient2 + ",";
            }
            if (this.state.ingredient3 !== "" ) {
                url += this.state.ingredient3 + ",";
            }
            await fetch(`http://localhost:3000/recipes/random/?i=${url}&q=${this.state.cuisine}`)
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
            ingredient1: "",
            ingredient2: "",
            ingredient3: "",
        });
    }  

    onClick(image) {
        if (image.style.border === "4px solid #71EDE2") {
            image.style.border="1px solid #EEEEEE";
        } else {
            for (let i = 0; i < (this.state.cuisines.length); i++) {
                var currentCountry = this.state.cuisines[i];
                var temp = document.getElementById(`${currentCountry}`);
                temp.style.border = "1px solid #EEEEEE";
            }
            this.setState({
                cuisine: image.id,
            });
            image.style.border="4px solid #71EDE2";
        }
    }

    render() {          
        return (
            <div className="filters">
                <div className="cuisine-images">
                    <span id="american" className="flag-icon flag-icon-us flag-icon-squared" title="American Food" onClick={() => this.onClick(document.getElementById("american"))}> </span>                    
                    <span id="chinese" className="flag-icon flag-icon-cn flag-icon-squared" title="Chinese Food" onClick={() => this.onClick(document.getElementById("chinese"))}> </span>
                    <span id="colombian" className="flag-icon flag-icon-co flag-icon-squared" title="Colombian Food" onClick={() => this.onClick(document.getElementById("colombian"))}> </span>
                    <span id="french" className="flag-icon flag-icon-fr flag-icon-squared" title="French Food" onClick={() => this.onClick(document.getElementById("french"))}> </span>
                    <span id="greek" className="flag-icon flag-icon-gr flag-icon-squared" title="Greek Food" onClick={() => this.onClick(document.getElementById("greek"))}> </span>
                    <span id="indian" className="flag-icon flag-icon-in flag-icon-squared" title="Indian Food" onClick={() => this.onClick(document.getElementById("indian"))}> </span>
                    <span id="italian" className="flag-icon flag-icon-it flag-icon-squared" title="Italian Food" onClick={() => this.onClick(document.getElementById("italian"))}> </span>
                    <span id="japanese" className="flag-icon flag-icon-jp flag-icon-squared" title="Japanese Food" onClick={() => this.onClick(document.getElementById("japanese"))}> </span>
                    <span id="korean" className="flag-icon flag-icon-kr flag-icon-squared" title="Korean Food" onClick={() => this.onClick(document.getElementById("korean"))}> </span>
                    <span id="mexican" className="flag-icon flag-icon-mx flag-icon-squared" title="Mexican Food" onClick={() => this.onClick(document.getElementById("mexican"))}> </span>
                    <span id="spanish" className="flag-icon flag-icon-es flag-icon-squared" title="Spanish Food" onClick={() => this.onClick(document.getElementById("spanish"))}> </span>
                    <span id="thai" className="flag-icon flag-icon-th flag-icon-squared" title="Thai Food" onClick={() => this.onClick(document.getElementById("thai"))}> </span>
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <label className="ingredient-input">
                            <input
                                name="Ingredient 1"
                                type="text"
                                value={this.state.ingredient1}
                                // placeholder="optional ingredient one"
                                onChange={this.onIngredient1Change} />
                            <input
                                name="Ingredient 2"
                                type="text"
                                value={this.state.ingredient2}
                                // placeholder="optional ingredient one"
                                onChange={this.onIngredient2Change} />
                            <input
                                name="Ingredient 3"
                                type="text"
                                value={this.state.ingredient3}
                                // placeholder="optional ingredient one"
                                onChange={this.onIngredient3Change} />
                        </label>
                        <br></br>
                        <div className="submit">
                            <input name="submit-button" type="submit" value="Find A Recipe!"/>
                        </div> 
                    </form>
                </div>
                <div id="recipe-response" style={{display: this.state.found ? 'block' : 'none' }} >
                    <h4>You should cook <a href={this.state.recipe.href} target="_blank" rel="noopener noreferrer">{this.state.recipe.title}</a> today!</h4>
                    <p>Ingredients: {this.state.recipe.ingredients}</p>
                    {/* <p data-tip={{this.state.recipe}}>Ingredients: {this.state.recipe.ingredients}</p> */}
                    {/* <ReactTooltip /> */}
                </div>
            </div>
        );
        
    }
}

export default Input;