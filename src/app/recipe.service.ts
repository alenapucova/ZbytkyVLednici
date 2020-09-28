import { Injectable } from "@angular/core";
import { Recipe } from "./models/recipe.model";
import { Ingredient } from "./models/ingredient.model";
import { Criteria } from "./models/criteria.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SuggestedRecipe } from './models/suggestedRecipe.model';

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  // uri = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`/recipes`);
  }
  getFilteredRecipes(recipes: Recipe[], ingredients?: Ingredient[], criteria?: Criteria): Recipe[] {
    let filteredRecipes: Recipe[] = recipes;
    if (ingredients && ingredients.length > 0) {
      filteredRecipes = recipes.filter(recipe =>
        recipe.ingredients.every(
          recipeIngredient =>
            !!ingredients.find(ingredient =>
              recipeIngredient._id === ingredient._id &&
              recipeIngredient.amount * criteria.portions <= ingredient.amount)
        )
      );
    }
    filteredRecipes = this.filterByCriteria(criteria, filteredRecipes);
    return filteredRecipes;
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`/recipe/${id}`);
  }


  getSuggestedRecipes(recipes: Recipe[], ingredients?: Ingredient[], criteria?: Criteria): SuggestedRecipe[] {
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

    suggestedRecipes.forEach(suggested => this.filterByCriteria(criteria, suggested.recipes));
    return suggestedRecipes;
  }

  filterByCriteria(criteria: Criteria, recipes: Recipe[]): Recipe[] {
    let filtered: Recipe[] = recipes;
    if (criteria) {
      filtered = this.filterByCriterium(() => criteria.style, (recipe: Recipe) => recipe.foodStyle, filtered);
      filtered = this.filterByCriterium(() => criteria.typeOfMeal, (recipe: Recipe) => recipe.foodType, filtered);
      filtered = this.filterByCriterium(() => criteria.difficulty, (recipe: Recipe) => recipe.difficulty, filtered);
      if (criteria.time) {
        filtered = filtered.filter(
          recipe => recipe.time <= criteria.time
        );
      }
    }
    return filtered;
  }

  filterByCriterium(criteriaField, recipeField, recipes: Recipe[]): Recipe[] {
    if (criteriaField() && criteriaField().length > 0) {
      const crit = criteriaField().filter(criterium => criterium.checked);
      return recipes.filter(recipe =>
        crit.every(criterium => recipeField(recipe).map(s => s.toString()).includes(criterium.name))
      )
    }
    return recipes;
  }
}