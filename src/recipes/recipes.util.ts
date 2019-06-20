import { map} from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Recipe, RecipePuppyData, VeryLongThing, RecipeWithNutrition, IngredientsNutrition } from './interfaces/recipe.interface';

const findRandomRecipe = () => {
    return map((response: AxiosResponse<RecipePuppyData>) => response.data.results[Math.floor(Math.random()*response.data.results.length)]);
}

const makeRandomFullRecipe = () => {
    return map((response: Recipe) => {
        const recipeWithNutrition: RecipeWithNutrition = {
            title: response.title,
            href: response.href,
            ingredients: response.ingredients,
            thumbnail: response.thumbnail,
            nutrition: []
        }
        return recipeWithNutrition;
    });
}

const reduceDownstreamNutritionResponse = (recipe: RecipeWithNutrition) => {
    return map((response : AxiosResponse<VeryLongThing>) => {
        const arr: IngredientsNutrition[] = [];
        response.data.foods.forEach((item) => {
            const downstreamNutritionResponse:IngredientsNutrition = {
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
            }
            arr.push(downstreamNutritionResponse);
        });
        recipe.nutrition = arr;
        return recipe;
    });
}

export { findRandomRecipe, reduceDownstreamNutritionResponse, makeRandomFullRecipe }