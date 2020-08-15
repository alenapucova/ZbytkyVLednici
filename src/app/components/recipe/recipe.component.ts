import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";

import { Recipe, Difficulty, FoodStyle } from "../../recipe";
import { UserService } from "src/app/user.service";
import { User } from "src/app/user.model";

@Component({
  selector: "app-recipe",
  templateUrl: "./recipe.component.html",
  styleUrls: ["./recipe.component.scss"]
})
export class RecipeComponent {
  @Input() recipe: Recipe;
  @Input() isFavourite: boolean = false;
  @Output() favouriteChange = new EventEmitter<{ id: string, isFavourite: boolean }>();
  user: User;
  favouriteRecipes: string[];

  noGluten: string = "./assets/img/wheat.svg";
  noMeat: string = "./assets/img/nomeat.svg";
  lowCarb: string = "./assets/img/lc.svg";

  constructor(public userService: UserService) { }

  ngOnInit() { }

  /*getDifficulty(difficulty: Difficulty) {
    if (difficulty.toString() === "Easy") {
      return "Snadné";
    } else if (difficulty.toString() === "Medium") {
      return "Středně obtížné";
    } else if (difficulty.toString() === "Difficult") {
      return "Náročné";
    }
  }*/
  getFoodStyle(foodStyle: FoodStyle): string {
    if (foodStyle.toString() === "Bez lepku") {
      return this.noGluten;
    } else if (foodStyle.toString() === "Bez masa") {
      return this.noMeat;
    } else if (foodStyle.toString() === "Low carb") {
      return this.lowCarb;
    }
  }

  setFavouriteRecipe(event: any): void {
    this.isFavourite = !this.isFavourite;
    this.favouriteChange.emit({ id: this.recipe._id, isFavourite: this.isFavourite });

    //event.stopPropagation();
  }
}
