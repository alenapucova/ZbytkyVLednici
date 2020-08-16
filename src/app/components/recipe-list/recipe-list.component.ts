import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user.model';
import { Recipe } from 'src/app/recipe';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  @Input() recipes: Recipe[];
  user: User;
  favouriteRecipes: string[];

  constructor(public userService: UserService, private _snackBar: MatSnackBar, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.userService.loggedIn()) {
      this.userService.getProfile().subscribe(profile => {
        this.user = profile.user;
        this.favouriteRecipes = this.user.favouriteRecipes.map(recipes => recipes._id);
        this.ref.detectChanges();
      });
    }
  }
  isFavourite(recipe: Recipe): boolean {
    if (this.favouriteRecipes) {
      return this.favouriteRecipes.includes(recipe._id);
    }
    return false;
  }
  setFavourite(value: { id: string, isFavourite: boolean }) {
    if (value.isFavourite) {
      this.userService
        .setFavouriteRecipe(this.user._id, value.id)
        .subscribe();
      this.user.favouriteRecipes.push({ _id: value.id });
      this._snackBar.open("Recept byl uložen do oblíbených", "Skrýt", {
        duration: 3000
      });
    } else {
      this.user.favouriteRecipes = this.user.favouriteRecipes.filter(recipe => recipe._id !== value.id);
      this.userService
        .setFavouriteRecipe(this.user._id, value.id)
        .subscribe();
      this._snackBar.open("Recept byl smazán z oblíbených", "Skrýt", {
        duration: 3000
      });
    }


  }


}
