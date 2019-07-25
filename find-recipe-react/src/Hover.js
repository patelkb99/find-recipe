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
        if (this.props.found) {
            // remove old ingredient divs
            for (let i = 0; i < this.state.nutrients.length; i++) {
                var elem = document.getElementById("block" + i);
                if (elem) {elem.remove();}
            }
            this.state.nutrients = [];

            // add new ingredient divs
            for (let i = 0; i < this.props.nutrition.length; i++ ) {
                this.state.nutrients.push(this.props.nutrition[i]);
            }
            for (var i = 0; i < this.state.nutrients.length; i++) {
                var temp = "";
                var n = this.state.nutrients[i];
                temp += "Serving Quantity: " + n.serving_qty + ", ";
                temp += "\nCalories: " + n.calories + "cals, ";
                temp += "\nTotal Fat: " + n.total_fat + "g, ";
                temp += "\nSaturated Fat: " + n.saturated_fat + "g, ";
                temp += "\nCholesterol: " + n.cholesterol + "g, ";
                temp += "\nSodium: " + n.sodium + "g, ";
                temp += "\nCarbohydrate: " + n.carbohydrate + "g, ";
                temp += "\nFiber: " + n.fiber + "g, ";
                temp += "\nSugars: " + n.sugars  + "g, ";
                temp += "\nProtein: " + n.protein + "g, ";
                temp += "\nPotassium: " + n.potassium + "g";
                this.state.individualNutrition.push(temp);
            }
        }
    }   

    createDivs() {
        if (this.props.found) {
            var arr = this.props.ingredients.split(", ");
            var arrayDiv = [];

            for (let i = 0; i < arr.length; i++) {
                arrayDiv[i] = document.createElement('div');
                arrayDiv[i].id = 'block' + i;
                arrayDiv[i].style = "margin: 2px";
                let paragraph = document.createElement('p');

                if (i === ((arr.length) - 1)) {
                    paragraph.textContent = arr[i]
                } else {
                    paragraph.textContent = arr[i] + ", ";
                }
                paragraph.setAttribute("data-tip", `${this.state.individualNutrition[i]}`);
                paragraph.setAttribute("data-for", `i${i}`);
                
                arrayDiv[i].appendChild(paragraph);
                document.getElementById('ingredient-list').appendChild(arrayDiv[i]);
                // let tip = React.createElement('ReactTooltip', {id:`i${i}`});
                // ReactDOM.render(tip, document.getElementById('ingredient-list'));
            } 
        }
    }

    componentDidMount() {
        if (this.props.ingredients) {
            this.extractData();
            this.createDivs();
        }
    }

    render() {
        if (this.props.ingredients) {
            return (
                <div id="ingredients"> 
                    {this.extractData()}
                    {this.createDivs()}
                    {ReactTooltip.rebuild()}
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
                    <ReactTooltip id='i11'/>
                    <ReactTooltip id='i12'/>
                    <ReactTooltip id='i13'/>
                    <ReactTooltip id='i14'/>
                    <ReactTooltip id='i15'/>
                    <ReactTooltip id='i16'/>
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