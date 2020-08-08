import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Ingredient } from "src/app/models/ingredient.model";
import { Recipe } from "src/app/recipe";
import { RecipeService } from "src/app/recipe.service";
import { MatDialog } from "@angular/material/dialog";
import { Criteria } from "src/app/models/criteria.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  recipes: Recipe[] = [];
  recipe;

  selectedIngredients: Ingredient[];
  selectedCriteria: Criteria;

  constructor(private recipeService: RecipeService, public dialog: MatDialog) {}

  ngOnInit() {
  
    this.recipeService
      .getRecipes(this.selectedIngredients, this.selectedCriteria)
      .subscribe(recipes => {
        console.log("recipes", recipes);
        this.recipes = recipes;
      });
  }

  onIngredientChange(ingredients: Ingredient[]) {
    console.log(ingredients.map(ingredient => ingredient.name));
    this.selectedIngredients = ingredients;
    this.onChange();
  }
  onCriteriaChanged(criteria: Criteria) {
    this.selectedCriteria = criteria;
    this.onChange();
  }

  onChange() {
    this.recipeService
      .getRecipes(this.selectedIngredients, this.selectedCriteria)
      .subscribe(recipes => (this.recipes = recipes));
  }
}
