"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const findRandomRecipe = () => {
    return operators_1.map((response) => response.data.results[Math.floor(Math.random() * response.data.results.length)]);
};
exports.findRandomRecipe = findRandomRecipe;
const makeRandomFullRecipe = () => {
    return operators_1.map((response) => {
        const recipeWithNutrition = {
            title: response.title,
            href: response.href,
            ingredients: response.ingredients,
            thumbnail: response.thumbnail,
            nutrition: []
        };
        return recipeWithNutrition;
    });
};
exports.makeRandomFullRecipe = makeRandomFullRecipe;
const reduceDownstreamNutritionResponse = (recipe) => {
    console.log("hit111");
    return operators_1.map((response) => {
        console.log("hit");
        const arr = [];
        response.data.foods.forEach((item) => {
            const downstreamNutritionResponse = {
                food_name: item.food_name,
                serving_qty: item.serving_qty,
                nf_calories: item.nf_calories,
                nf_total_fat: item.nf_total_fat,
                nf_saturated_fat: item.nf_saturated_fat,
                nf_cholesterol: item.nf_cholesterol,
                nf_sodium: item.nf_sodium,
                nf_total_carbohydrate: item.nf_total_carbohydrate,
                nf_dietary_fiber: item.nf_dietary_fiber,
                nf_sugars: item.nf_sugars,
                nf_protein: item.nf_protein,
                nf_potassium: item.nf_potassium
            };
            arr.push(downstreamNutritionResponse);
        });
        recipe.nutrition = arr;
        return recipe;
    });
};
exports.reduceDownstreamNutritionResponse = reduceDownstreamNutritionResponse;
//# sourceMappingURL=recipes.util.js.map