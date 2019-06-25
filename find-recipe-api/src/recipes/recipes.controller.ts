import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RecipesService } from './recipes.service'
import { Recipe, RecipeWithNutrition } from './interfaces/recipe.interface';
import { map, flatMap } from 'rxjs/operators';
import config from '../config';
import { findRandomRecipe, reduceDownstreamNutritionResponse, makeRandomFullRecipe } from './recipes.util'


@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    getAllRecipes(@Query('i') i: string, @Query('q') q: string): Observable<Recipe[]> {
        return this.recipesService.getRecipePuppyData(`http://www.recipepuppy.com/api/?i=${i}&q=${q}`).pipe(map(response => response.data.results));
    }

    @Get('/random')
    getRandomRecipe(@Query('i') i: string, @Query('q') q: string): Observable<RecipeWithNutrition> {
        return this.recipesService.getRecipePuppyData(`http://www.recipepuppy.com/api/?i=${i}&q=${q}`).pipe(
            findRandomRecipe(),
            makeRandomFullRecipe(),
            flatMap((recipe) => {
                var headers = {
                    'x-app-id': `${config.NUTRITION_APP_ID}`,
                    'x-app-key': `${config.NUTRITION_APP_KEY}`,
                    'x-remote-user-id': `${config.NUTRITION_REMOTE_USER_ID}`
                };
                var payload = {
                    'query': recipe.ingredients
                };
                return this.recipesService.getDownstreamFoodsResponseData('https://trackapi.nutritionix.com/v2/natural/nutrients', payload, headers).pipe(
                    reduceDownstreamNutritionResponse(recipe)
                );
            })
        );
    }

    // // temporary hard coded values to use for front end development
    // // Free Nutritionix Subscription has a 50 call limit per day
    // @Get('/random')
    // getRandomRecipe(@Query('i') i: string, @Query('q') q: string): RecipeWithNutrition {
    //     return {
    //         title: "Easy Stracciatella Italian Soup",
    //         href: "http://www.recipezaar.com/Easy-Stracciatella-Italian-Soup-275229",
    //         ingredients: "cheese, chicken broth, eggs, spinach, pasta, salt",
    //         thumbnail: "http://img.recipepuppy.com/529552.jpg",
    //         nutrition: [
    //             {
    //                 food: "cheese",
    //                 serving_qty: 1,
    //                 calories: 113.12,
    //                 total_fat: 9.33,
    //                 saturated_fat: 5.28,
    //                 cholesterol: 27.72,
    //                 sodium: 182.84,
    //                 carbohydrate: 0.87,
    //                 fiber: 0,
    //                 sugars: 0.13,
    //                 protein: 6.4,
    //                 potassium: 21.28
    //             },
    //             {
    //                 food: "chicken broth",
    //                 serving_qty: 1,
    //                 calories: 14.94,
    //                 total_fat: 0.52,
    //                 saturated_fat: 0.03,
    //                 cholesterol: 4.98,
    //                 sodium: 923.79,
    //                 carbohydrate: 1.1,
    //                 fiber: 0,
    //                 sugars: 1.07,
    //                 protein: 1.59,
    //                 potassium: 44.82
    //             },
    //             {
    //                 food: "eggs",
    //                 serving_qty: 1,
    //                 calories: 71.5,
    //                 total_fat: 4.76,
    //                 saturated_fat: 1.56,
    //                 cholesterol: 186,
    //                 sodium: 71,
    //                 carbohydrate: 0.36,
    //                 fiber: 0,
    //                 sugars: 0.19,
    //                 protein: 6.28,
    //                 potassium: 69
    //             },
    //             {
    //                 food: "spinach pasta",
    //                 serving_qty: 1,
    //                 calories: 175.5,
    //                 total_fat: 1.27,
    //                 saturated_fat: 0.29,
    //                 cholesterol: 44.55,
    //                 sodium: 8.1,
    //                 carbohydrate: 33.8,
    //                 fiber: null,
    //                 sugars: null,
    //                 protein: 6.83,
    //                 potassium: 49.95
    //             },
    //             {
    //                 food: "salt",
    //                 serving_qty: 0.25,
    //                 calories: 0,
    //                 total_fat: 0,
    //                 saturated_fat: 0,
    //                 cholesterol: 0,
    //                 sodium: 581.37,
    //                 carbohydrate: 0,
    //                 fiber: 0,
    //                 sugars: 0,
    //                 protein: 0,
    //                 potassium: 0.12
    //             }
    //         ]
    //     }
    // }



}
