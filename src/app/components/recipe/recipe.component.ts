import { Component, Input, OnInit } from "@angular/core";

import { Recipe, Difficulty, FoodStyle } from "../../recipe";
import { Ingredient } from "src/app/models/ingredient.model";
import { UserService } from "src/app/user.service";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent {
  @Input() recipes: Recipe[];

  noGluten: string = "../../../assets/img/wheat.svg";
  noMeat: string = "../../../assets/img/nomeat.svg";
  lowCarb: string = "../../../assets/img/lc.svg";
  none: string = "";

  constructor(public userService: UserService) {}

  getDifficulty(difficulty: Difficulty) {
    if (difficulty.toString() === "Easy") {
      return "Snadné";
    } else if (difficulty.toString() === "Medium") {
      return "Středně obtížné";
    } else if (difficulty.toString() === "Difficult") {
      return "Náročné";
    }
  }
  getFoodStyle(foodStyle: FoodStyle): string {
    console.warn("foodstyle type", typeof foodStyle);
    if (foodStyle.toString() === "GlutenFree") {
      return this.noGluten;
    } else if (foodStyle.toString() === "LowCarb") {
      return this.lowCarb;
    } else if (foodStyle.toString() === "NoMeat") {
      return this.noMeat;
    } else if (foodStyle.toString() === "None") {
      return this.none;
    }
  }
}
