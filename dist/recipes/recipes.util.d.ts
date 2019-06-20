import { AxiosResponse } from 'axios';
import { Recipe, RecipePuppyData, NutritionixResponse, RecipeWithNutrition } from './interfaces/recipe.interface';
declare const findRandomRecipe: () => import("rxjs").OperatorFunction<AxiosResponse<RecipePuppyData>, Recipe>;
declare const makeRandomFullRecipe: () => import("rxjs").OperatorFunction<Recipe, RecipeWithNutrition>;
declare const reduceDownstreamNutritionResponse: (recipe: RecipeWithNutrition) => import("rxjs").OperatorFunction<AxiosResponse<NutritionixResponse>, RecipeWithNutrition>;
export { findRandomRecipe, reduceDownstreamNutritionResponse, makeRandomFullRecipe };
