import { Injectable } from "@angular/core";
import { Recipe } from "./recipe";
import { Ingredient } from "./models/ingredient.model";
import { Criteria } from "./models/criteria.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  uri = "http://localhost:4000";
  constructor(private http: HttpClient) {}

  getRecipes(
    ingredients?: Ingredient[],
    criteria?: Criteria
  ): Observable<Recipe[]> {
    const recipes = this.http.get<Recipe[]>(`${this.uri}/recipes`);
    const o = new Subject<Recipe[]>();

    const r = recipes.subscribe(data => {
      console.log("data", data);
      let crit;
      let filteredRecipes: Recipe[] = data;
      if (ingredients && ingredients.length > 0) {
        filteredRecipes = data.filter(recipe =>
          recipe.ingredients.every(
            recipeIngredient =>
              ingredients.filter(
                ingredient =>
                  recipeIngredient.id === ingredient.id &&
                  recipeIngredient.amount <= ingredient.amount
              ).length > 0
          )
        );
      }

      if (criteria) {
        if (criteria.style && criteria.style.length > 0) {
          crit = criteria.style.filter(style => style.checked);

          filteredRecipes = filteredRecipes.filter(recipe =>
            crit.every(style => recipe.foodStyle.includes(style.id))
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
      }

      console.log("filtered", filteredRecipes);
      o.next(filteredRecipes);
    });

    return o;
  }

  /*getRecipe(id: number): Recipe {
    const recipe = RECIPES.filter(recipe => recipe.id === id);
    return recipe[0];
  }*/
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.uri}/recipe/${id}`);
  }
}
