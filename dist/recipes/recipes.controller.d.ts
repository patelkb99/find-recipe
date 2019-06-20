import { Observable } from 'rxjs';
import { RecipesService } from './recipes.service';
import { Recipe, RecipeWithNutrition } from './interfaces/recipe.interface';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    getAllRecipes(i: string, q: string): Observable<Recipe[]>;
    getRandomRecipe(i: string, q: string): Observable<RecipeWithNutrition>;
}
