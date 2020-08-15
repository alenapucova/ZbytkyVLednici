import { Injectable } from "@angular/core";
import { Recipe } from "./recipe";
import { Ingredient } from "./models/ingredient.model";
import { Criteria } from "./models/criteria.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { SuggestedRecipe } from './models/suggestedRecipe.model';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  uri = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.uri}/recipes`);
  }
  getFilteredRecipes(
    recipes: Recipe[],
    ingredients?: Ingredient[],
    criteria?: Criteria
  ): Recipe[] {
    let crit;
    let filteredRecipes: Recipe[] = recipes;
    if (ingredients && ingredients.length > 0) {
      filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.every(
          recipeIngredient =>
            ingredients.filter(
              ingredient =>
                recipeIngredient._id === ingredient._id &&
                recipeIngredient.amount * criteria.portions <= ingredient.amount
            ).length > 0
        )
      );
    }

    if (criteria) {
      console.log("criterie", criteria);
      if (criteria.style && criteria.style.length > 0) {
        crit = criteria.style.filter(style => style.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(style => recipe.foodStyle.includes(style.name)
          )
        );
      }
      if (criteria.typeOfMeal && criteria.typeOfMeal.length > 0) {
        crit = criteria.typeOfMeal.filter(type => type.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(type => recipe.foodType.includes(type.name))
        );
      }
      if (criteria.difficulty && criteria.difficulty.length > 0) {
        crit = criteria.difficulty.filter(diff => diff.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(diff => recipe.difficulty.includes(diff.name))
        );
      }
      if (criteria.time) {
        filteredRecipes = filteredRecipes.filter(
          recipe => recipe.time <= criteria.time
        );
      }
    }
    console.warn("filtered recipes", filteredRecipes);
    return filteredRecipes;
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.uri}/recipe/${id}`);
  }


  getSuggestedRecipes(recipes: Recipe[], ingredients?: Ingredient[], criteria?: Criteria): SuggestedRecipe[] {
    console.log('suggested recipes ON');
    let crit;
    let suggestedRecipes: SuggestedRecipe[] = [];
    if (ingredients && ingredients.length > 0) {
      recipes.forEach(recipe => {
        const missingIngredients = recipe.ingredients.filter(recipeIngredient =>
          !ingredients.find(ingredient =>
            recipeIngredient._id === ingredient._id &&
            recipeIngredient.amount * criteria.portions <= ingredient.amount)
        );
        if (missingIngredients && missingIngredients.length === 1) {
          const missingIngredient = suggestedRecipes.find(suggested => suggested.ingredient._id === missingIngredients[0]._id);
          if (missingIngredient) {
            missingIngredient.recipes.push(recipe);
          } else {
            suggestedRecipes.push({
              ingredient: missingIngredients[0],
              recipes: [recipe]
            });
          }
        }
      });
    }

    /*if (criteria) {
      console.log("criterie", criteria);
      if (criteria.style && criteria.style.length > 0) {
        crit = criteria.style.filter(style => style.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(style => {
            recipe.foodStyle.includes(style.id);
            console.log("id", style.id);
          })
        );
      }
      if (criteria.typeOfMeal && criteria.typeOfMeal.length > 0) {
        crit = criteria.typeOfMeal.filter(type => type.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(type => recipe.foodType.includes(type.id))
        );
      }
      if (criteria.difficulty && criteria.difficulty.length > 0) {
        crit = criteria.difficulty.filter(diff => diff.checked);

        filteredRecipes = filteredRecipes.filter(recipe =>
          crit.every(diff => recipe.difficulty.includes(diff.id))
        );
      }
      if (criteria.time) {
        filteredRecipes = filteredRecipes.filter(
          recipe => recipe.time <= criteria.time
        );
      }
    }*/
    console.warn("suggestedRecipes", suggestedRecipes);
    return suggestedRecipes;
  }
}