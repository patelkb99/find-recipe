import { map} from 'rxjs/operators';
import { AxiosResponse } from 'axios';
import { Recipe, RecipePuppyData, VeryLongThing, RecipeWithNutrition, DownstreamNutritionResponse } from './interfaces/recipe.interface';

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
    console.log("hit111")
    return map((response : AxiosResponse<VeryLongThing>) => {
        console.log("hit");
        const arr: DownstreamNutritionResponse[] = [];
        response.data.foods.forEach((item) => {
            const downstreamNutritionResponse:DownstreamNutritionResponse = {
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
            }
            arr.push(downstreamNutritionResponse);
        });
        recipe.nutrition = arr;
        return recipe;
    });
}

export { findRandomRecipe, reduceDownstreamNutritionResponse, makeRandomFullRecipe }