import { Injectable } from "@angular/core";
import { Recipe } from "./recipe";
import { Ingredient } from "./models/ingredient.model";
import { Criteria } from "./models/criteria.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { style } from "@angular/animations";

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
                recipeIngredient.amount <= ingredient.amount
            ).length > 0
        )
      );
    }
    /*
        if (criteria) {
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
    console.warn("filtered recipes", filteredRecipes);
    return filteredRecipes;
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.uri}/recipe/${id}`);
  }
}
