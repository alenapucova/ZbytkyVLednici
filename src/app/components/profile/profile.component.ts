import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/user.service";
import { RecipeService } from "src/app/recipe.service";
import { MatSnackBar } from "@angular/material";
import { User } from "src/app/user.model";
import { Recipe } from "src/app/recipe";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  user: User;
  favouriteRecipes: Recipe[] = [];

  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
        this.userService
          .getFavouriteRecipes(this.user._id)
          .subscribe(favRecipe => {
            favRecipe.map(recipe => {
              this.recipeService
                .getRecipeById(recipe._id)
                .subscribe(favourite => {
                  this.favouriteRecipes.push(favourite);
                });
            });
          });
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  showFavouriteRecipes() { }
}
