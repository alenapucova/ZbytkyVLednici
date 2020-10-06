import { Recipe } from './recipe.model';
import { Ingredient } from './ingredient.model';

export class SuggestedRecipe {
    ingredient: Ingredient;
    recipes: Recipe[];
}