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
  allRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  selectedIngredients: Ingredient[];
  selectedCriteria: Criteria;

  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.allRecipes = recipes;
      this.onChange();
    });
  }

  onIngredientChange(ingredients: Ingredient[]) {

    ingredients.map(ingredient => ingredient.name)

    this.selectedIngredients = ingredients;
    this.onChange();
  }
  onCriteriaChanged(criteria: Criteria) {
    this.selectedCriteria = criteria;
    this.onChange();
  }

  onChange() {
    this.filteredRecipes = this.recipeService.getFilteredRecipes(
      this.allRecipes,
      this.selectedIngredients,
      this.selectedCriteria
    );
  }
}
