"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const recipes_service_1 = require("./recipes.service");
const operators_1 = require("rxjs/operators");
const config_1 = require("../config");
const recipes_util_1 = require("./recipes.util");
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    getAllRecipes(i, q) {
        return this.recipesService.getRecipePuppyData(`http://www.recipepuppy.com/api/?i=${i}&q=${q}`).pipe(operators_1.map(response => response.data.results));
    }
    getRandomRecipe(i, q) {
        return this.recipesService.getRecipePuppyData(`http://www.recipepuppy.com/api/?i=${i}&q=${q}`).pipe(recipes_util_1.findRandomRecipe(), recipes_util_1.makeRandomFullRecipe(), operators_1.flatMap((recipe) => {
            var headers = {
                'x-app-id': `${config_1.default.NUTRITION_APP_ID}`,
                'x-app-key': `${config_1.default.NUTRITION_APP_KEY}`,
                'x-remote-user-id': `${config_1.default.NUTRITION_REMOTE_USER_ID}`
            };
            var payload = {
                'query': recipe.ingredients
            };
            return this.recipesService.getDownstreamFoodsResponseData('https://trackapi.nutritionix.com/v2/natural/nutrients', payload, headers)
                .pipe(recipes_util_1.reduceDownstreamNutritionResponse(recipe));
        }));
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('i')), __param(1, common_1.Query('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], RecipesController.prototype, "getAllRecipes", null);
__decorate([
    common_1.Get('/random'),
    __param(0, common_1.Query('i')), __param(1, common_1.Query('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], RecipesController.prototype, "getRandomRecipe", null);
RecipesController = __decorate([
    common_1.Controller('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map