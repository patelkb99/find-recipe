import React from 'react';
import './Input.css';
import Hover from './Hover';

const cuisines = [
    {flag:'american', abb:'us'},
    {flag:'chinese', abb:'cn'},
    {flag:'colombian', abb:'co'},
    {flag:'french', abb:'fr'},
    {flag:'greek', abb:'gr'},
    {flag:'indian', abb:'in'},
    {flag:'italian', abb:'it'},
    {flag:'japanese', abb:'jp'},
    {flag:'korean', abb:'kr'},
    {flag:'mexican', abb:'mx'},
    {flag:'spanish', abb:'es'},
    {flag:'thai', abb:'th'},
];

const Countries = (props) => {    
    return (
        <div className="cuisine-images">
            {props.countries.map(country => 
            <span 
                id={country.flag} 
                key={country.flag} 
                value={country.flag} 
                className={"flag-icon flag-icon-" + country.abb + " flag-icon-squared"}
                title={country.flag +" food"}
                onClick={() => props.onClick(country.flag)}
            />
            )}
        </div>
    );
};

const Results = (props) => {

}

class Input extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        found: false,
        recipe: {
            title: "",
            href: "",
            ingredients: "",
            thumbnail: "",
            nutrition: [{
                food: "",
                serving_qty: 0,
                calories: 0,
                total_fat: 0,
                saturated_fat: 0,
                cholesterol: 0,
                sodium: 0,
                carbohydrate: 0,
                fiber: 0,
                sugars: 0,
                protein: 0,
                potassium: 0
            }]
        },
        cuisine: "",
        ingredient1: "",
        ingredient2: "",
        ingredient3: "",
        nutrients: [],
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onFlagImageClick = this.onFlagImageClick.bind(this);
    };

    buildURL = () => {
        var url = "";
        if (this.state.ingredient1.length > 0 ) {url += this.state.ingredient1 + ",";}
        if (this.state.ingredient2.length > 0 ) {url += this.state.ingredient2 + ",";}
        if (this.state.ingredient3.length > 0 ) {url += this.state.ingredient3 + ",";}
        var fullURL = `http://www.recipepuppy.com/api/?i=${url}&q=${this.state.cuisine}`;
        return fullURL;
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        var fullURL = this.buildURL();
        try {
            console.log(fullURL);
            let result = await fetch(fullURL, {
                mode: "cors"
            });
            let response = result.json()
            console.log(response);

            this.setState({
                recipe: response,
                found: true
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
    };

    onFlagImageClick = (val) => {
        let image = document.getElementById(val);
        if (this.state.cuisine === val) {
            image.style.border = "1px solid #EEEEEE";
            this.setState({ cuisine: "" });
        } else {
            cuisines.map(country => {
                return document.getElementById(country.flag).style.border = "1px solid #EEEEEE";
            });
            image.style.border = "4px solid #71EDE2";
            this.setState({ cuisine: val });
        }
    };

    render() {
        return (
            <div className="filters">
                <Countries countries={cuisines} onClick={this.onFlagImageClick}/>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <input
                            name="Ingredient 1"
                            type="text"
                            value={this.state.ingredient1}
                            onChange={event => this.setState({ingredient1: event.target.value})} 
                            required
                        />
                        <input
                            name="Ingredient 2"
                            type="text"
                            value={this.state.ingredient2}
                            onChange={event => this.setState({ingredient2: event.target.value})} 
                            required
                        />
                        <input
                            name="Ingredient 3"
                            type="text"
                            value={this.state.ingredient3}
                            onChange={event => this.setState({ingredient3: event.target.value})} 
                            required
                        />
                        <br />
                        <div className="submit">
                            <input name="submit-button" type="submit" value="Find A Recipe!"/>
                        </div> 
                    </form>
                </div>

                <div id="recipe-response" style={{display: this.state.found ? 'block' : 'none' }} >
                    <h4 className="what-to-cook">You should cook <a href={this.state.recipe.href} target="_blank" rel="noopener noreferrer">{this.state.recipe.title}</a> today!</h4>
                    <div id="ingredient-list">
                        Ingredients:
                    </div>
                    <Hover nutrition={ this.state.recipe.nutrition} ingredients={this.state.recipe.ingredients} found={this.state.found }/>
                </div>
            </div>
        );
        
    }
}

export default Input;