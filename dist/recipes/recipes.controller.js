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
let RecipesController = class RecipesController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    getAllRecipes(i, q) {
        return this.recipesService.getRecipePuppyData(`http://www.recipepuppy.com/api/?i=${i}&q=${q}`).pipe(operators_1.map(response => response.data.results));
    }
    getRandomRecipe(i, q) {
        return {
            title: "Easy Stracciatella Italian Soup",
            href: "http://www.recipezaar.com/Easy-Stracciatella-Italian-Soup-275229",
            ingredients: "cheese, chicken broth, eggs, spinach, pasta, salt",
            thumbnail: "http://img.recipepuppy.com/529552.jpg",
            nutrition: [
                {
                    "food": "cheese",
                    "serving_qty": 1,
                    "calories": 113.12,
                    "total_fat": 9.33,
                    "saturated_fat": 5.28,
                    "cholesterol": 27.72,
                    "sodium": 182.84,
                    "carbohydrate": 0.87,
                    "fiber": 0,
                    "sugars": 0.13,
                    "protein": 6.4,
                    "potassium": 21.28
                },
                {
                    "food": "chicken broth",
                    "serving_qty": 1,
                    "calories": 14.94,
                    "total_fat": 0.52,
                    "saturated_fat": 0.03,
                    "cholesterol": 4.98,
                    "sodium": 923.79,
                    "carbohydrate": 1.1,
                    "fiber": 0,
                    "sugars": 1.07,
                    "protein": 1.59,
                    "potassium": 44.82
                },
                {
                    "food": "eggs",
                    "serving_qty": 1,
                    "calories": 71.5,
                    "total_fat": 4.76,
                    "saturated_fat": 1.56,
                    "cholesterol": 186,
                    "sodium": 71,
                    "carbohydrate": 0.36,
                    "fiber": 0,
                    "sugars": 0.19,
                    "protein": 6.28,
                    "potassium": 69
                },
                {
                    "food": "spinach pasta",
                    "serving_qty": 1,
                    "calories": 175.5,
                    "total_fat": 1.27,
                    "saturated_fat": 0.29,
                    "cholesterol": 44.55,
                    "sodium": 8.1,
                    "carbohydrate": 33.8,
                    "fiber": null,
                    "sugars": null,
                    "protein": 6.83,
                    "potassium": 49.95
                },
                {
                    "food": "salt",
                    "serving_qty": 0.25,
                    "calories": 0,
                    "total_fat": 0,
                    "saturated_fat": 0,
                    "cholesterol": 0,
                    "sodium": 581.37,
                    "carbohydrate": 0,
                    "fiber": 0,
                    "sugars": 0,
                    "protein": 0,
                    "potassium": 0.12
                }
            ]
        };
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
    __metadata("design:returntype", Object)
], RecipesController.prototype, "getRandomRecipe", null);
RecipesController = __decorate([
    common_1.Controller('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipesService])
], RecipesController);
exports.RecipesController = RecipesController;
//# sourceMappingURL=recipes.controller.js.map