import { Recipe } from '../recipe';
import { Ingredient } from './ingredient.model';

export class SuggestedRecipe {
    ingredient: Ingredient;
    recipes: Recipe[];
}