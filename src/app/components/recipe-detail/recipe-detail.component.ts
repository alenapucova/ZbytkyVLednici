import { Component, OnInit } from "@angular/core";

import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { IngredientUtils, Unit } from "src/app/models/ingredient.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.scss"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe();
  portion: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipeById(params.get("id")).subscribe(recipe => {
        this.recipe = recipe;
      });
      this.portion = +params.get("portions");
      console.log('portions', this.portion);
    });
  }
  getFullAmount(amount: number): number {
    return this.portion * amount;
  }
  getPortions(): number {
    return this.portion;
  }
  getUnitName(unit: string): string {
    return IngredientUtils.getUnitName(unit);
  }
}
