import React from 'react';
import './Hover.css';
import ReactTooltip from 'react-tooltip'

class Hover extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nutrients: [],
            individualNutrition: []
        }
    }

    extractData() {
        // remove old ingredient divs
        for (let i = 0; i < this.state.nutrients.length; i++) {
            var elem = document.getElementById("block" + i);
            if (elem) {elem.remove();}
        }
        this.state.nutrients = [];

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
            console.log(temp);
        }
        
    }   

    createDivs() {
        var arr = this.props.ingredients.split(", ");
        var arrayDiv = [];

        for (let i = 0; i < arr.length; i++) {
            arrayDiv[i] = document.createElement('div');
            arrayDiv[i].id = 'block' + i;
            arrayDiv[i].style = "margin: 2px";
            let paragraph = document.createElement('p');
            // let tip = document.createElement('ReactTooltip');
            if (i === arr.length - 1) {paragraph.textContent = arr[i]}
            else {paragraph.textContent = arr[i] + ", ";}
            paragraph.textContent = arr[i] + ", ";
            paragraph.setAttribute("data-tip", `${this.state.individualNutrition[i]}`);
            paragraph.setAttribute("data-for", `i${i}`);
            // tip.setAttribute("id", `i${i}`)
            arrayDiv[i].appendChild(paragraph);
            arrayDiv[i].appendChild(paragraph);
            document.getElementById('ingredient-list').appendChild(arrayDiv[i]);
        }     
    }

    render() {
        if (this.props.ingredients) {
            return (
                <div> 
                    <div id="ingredients">
                        {this.extractData()}
                        {this.createDivs()}
                        <div>
                            <ReactTooltip id='i0'/>
                            <ReactTooltip id='i1'/>
                            <ReactTooltip id='i2'/>
                            <ReactTooltip id='i3'/>
                            <ReactTooltip id='i4'/>
                            <ReactTooltip id='i5'/>
                            <ReactTooltip id='i6'/>
                            <ReactTooltip id='i7'/>
                            <ReactTooltip id='i8'/>
                            <ReactTooltip id='i9'/>
                            <ReactTooltip id='i10'/>
                        </div>
                    </div>    
                </div>  
            )
        } else {
            return (
                <div></div>   
            )
        }
        
    }
}

export default Hover;