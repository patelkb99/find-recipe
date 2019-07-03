import React from 'react';
import './Hover.css';
import ReactTooltip from 'react-tooltip'

class Hover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nutrients: [],
            individualNutrition: []
        }
    }

    extractData() {
        for (let i = 0; i < this.props.nutrition.length; i++ ) {
            this.state.nutrients.push(this.props.nutrition[i]);
        }
        for (var i = 0; i < this.state.nutrients.length; i++) {
            var temp = "";
            var n = this.state.nutrients[i];
            temp +=  "Serving Quantity: " + n.serving_qty;
            temp +=  "\nCalories : " + n.calories;
            temp +=  "\nTotal Fat: " + n.total_fat;
            temp +=  "\nSaturated Fat: " + n.saturated_fat;
            temp +=  "\nCholesterol: " + n.cholesterol;
            temp +=  "\nSodium: " + n.sodium;
            temp +=  "\nCarbohydrate: " + n.carbohydrate;
            temp +=  "\nFiber: " + n.fiber;
            temp +=  "\nSugars: " + n.sugars;
            temp +=  "\nProtein: " + n.protein;
            temp +=  "\nPotassium: " + n.potassium;
            this.state.individualNutrition.push(temp);
        }
    }   

    render() {   
        if (this.props.found) {
            return (
                <div className="ingredients">
                    {this.extractData()}
                    <div>
                        <p data-tip={`${this.state.individualNutrition[0]}`} data-for='i0'>{this.state.nutrients[0].food}, </p>
                        <ReactTooltip id='i0' style=""/>
                    </div>
                    <div>
                        <p data-tip={`${this.state.individualNutrition[1]}`} data-for='i1'>{this.state.nutrients[1].food}, </p>
                        <ReactTooltip id='i1'/>
                    </div>
                    <div>
                        <p data-tip={`${this.state.individualNutrition[2]}`} data-for='i2'>{this.state.nutrients[2].food}, </p>
                        <ReactTooltip id='i2'/>
                    </div>
                    <div>
                        <p data-tip={`${this.state.individualNutrition[3]}`} data-for='i3'>{this.state.nutrients[3].food}, </p>
                        <ReactTooltip id='i3'/>
                    </div>
                    <div>
                        <p data-tip={`${this.state.individualNutrition[4]}`} data-for='i4'>{this.state.nutrients[4].food} </p>
                        <ReactTooltip id='i4'/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                </div>   
            )
        }
        
    }
}

export default Hover;