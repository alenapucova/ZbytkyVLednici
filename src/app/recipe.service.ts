import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';
import { Ingredient } from './models/ingredient.model';
import { Criteria } from './models/criteria.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor() { }

  getRecipes(ingredients?: Ingredient[], criteria?: Criteria): Recipe[] {
    let recipes = RECIPES;
    let crit;
    if (ingredients && ingredients.length > 0) {

      recipes = RECIPES.filter((recipe) => recipe.ingredients.every(recipeIngredient =>
        ingredients.filter(ingredient => recipeIngredient.id === ingredient.id && recipeIngredient.amount <= ingredient.amount /* && criteria.portions * recipeIngredient.amount*/).length > 0)
      );
    }
    console.log(recipes);
    
   
    if(criteria) {
      if(criteria.style && criteria.style.length > 0) {
        crit = criteria.style.filter(style => style.checked );
       
        recipes = recipes.filter(recipe => crit.every(style => recipe.foodStyle.includes(style.id)));
        
      }
      if(criteria.typeOfMeal && criteria.typeOfMeal.length > 0) {
        crit = criteria.typeOfMeal.filter(type => type.checked );
       
        recipes = recipes.filter(recipe => crit.every(type => recipe.foodType.includes(type.id)));
        
      }
      if(criteria.difficulty && criteria.difficulty.length > 0) {
        crit = criteria.difficulty.filter(diff => diff.checked );
       
        recipes = recipes.filter(recipe => crit.every(diff => recipe.difficulty.includes(diff.id)));
        
      }
      if(criteria.time) {
        recipes = recipes.filter(recipe => recipe.time <= criteria.time);        
      }
    }

    console.log(recipes);

    return recipes;
  }

  getRecipe(id: number): Recipe {
    const recipe = RECIPES.filter(recipe => recipe.id === id);
    return recipe[0];
  }
}
