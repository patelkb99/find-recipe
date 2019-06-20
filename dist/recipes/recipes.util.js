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
    return operators_1.map((response) => {
        const arr = [];
        response.data.foods.forEach((item) => {
            const downstreamNutritionResponse = {
                food: item.food_name,
                serving_qty: item.serving_qty,
                calories: item.nf_calories,
                total_fat: item.nf_total_fat,
                saturated_fat: item.nf_saturated_fat,
                cholesterol: item.nf_cholesterol,
                sodium: item.nf_sodium,
                carbohydrate: item.nf_total_carbohydrate,
                fiber: item.nf_dietary_fiber,
                sugars: item.nf_sugars,
                protein: item.nf_protein,
                potassium: item.nf_potassium
            };
            arr.push(downstreamNutritionResponse);
        });
        recipe.nutrition = arr;
        return recipe;
    });
};
exports.reduceDownstreamNutritionResponse = reduceDownstreamNutritionResponse;
//# sourceMappingURL=recipes.util.js.map