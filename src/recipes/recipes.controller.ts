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
                return this.recipesService.getDownstreamFoodsResponseData('https://trackapi.nutritionix.com/v2/natural/nutrients', payload, headers)
                    .pipe(reduceDownstreamNutritionResponse(recipe));
            })
        );
    }

}