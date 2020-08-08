import { Component, OnInit } from "@angular/core";

import { Recipe } from "../../recipe";
import { RecipeService } from "../../recipe.service";
import { ActivatedRoute } from "@angular/router";
import { PortionsService } from "src/app/portions.service";
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
    private portionService: PortionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeService.getRecipeById(params.get("id")).subscribe(recipe => {
        this.recipe = recipe;
        console.warn("recipe detail", this.recipe);
      });
    });

    this.portionService.portion.subscribe(res => {
      this.portion = res;
    });
  }
  getFullAmount(amount: number): number {
    return this.portion * amount;
  }
  getPortions(): number {
    return this.portion;
  }
  getUnitName(unit: Unit): string {
    return IngredientUtils.getUnitName(unit);
  }
}
