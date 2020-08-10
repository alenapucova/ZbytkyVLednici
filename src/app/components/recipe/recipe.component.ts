import { Component, Input, OnInit } from "@angular/core";

import { Recipe, Difficulty, FoodStyle } from "../../recipe";
import { UserService } from "src/app/user.service";
import { User } from "src/app/user.model";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent {
  @Input() recipes: Recipe[];
  user: User;
  favouriteRecipes: string[];

  noGluten: string = "../../../assets/img/wheat.svg";
  noMeat: string = "../../../assets/img/nomeat.svg";
  lowCarb: string = "../../../assets/img/lc.svg";

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.favouriteRecipes = this.user.favouriteRecipes.map(recipes => recipes._id);
    });
    console.log(this.recipes.map(recipe => recipe.foodStyle))
  }

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
    if (foodStyle.toString() === "GlutenFree") {
      return this.noGluten;
    } else if (foodStyle.toString() === "NoMeat") {
      return this.noMeat;
    } else if (foodStyle.toString() === "LowCarb") {
      return this.lowCarb;
    }
  }
  getFavouriteRecipe(recipe: Recipe) {
    this.userService
      .setFavouriteRecipe(this.user._id, recipe._id)
      .subscribe(favRecipe => {
        console.log("fav", favRecipe);
      });
    this.user.favouriteRecipes.push({ _id: recipe._id });
  }
  isFavourite(recipe: Recipe): boolean {
    if (this.favouriteRecipes) {
      return this.favouriteRecipes.includes(recipe._id);
    }
  }
}
