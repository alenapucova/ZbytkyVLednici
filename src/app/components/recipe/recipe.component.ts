import { Component, Input, OnInit } from '@angular/core';

import { Recipe, Difficulty, FoodStyle } from '../../recipe';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

  @Input() recipes: Recipe[];

  noGluten: string = "../../../assets/img/wheat.svg";
  noMeat: string = "../../../assets/img/nomeat.svg";
  lowCarb: string = "../../../assets/img/lc.svg";
  none: string = "";

  getDifficulty(difficulty: Difficulty){
    if(difficulty === Difficulty.Easy){
      return "Snadné"
    } else if (difficulty === Difficulty.Medium){
      return "Středně obtížné"
    } else if (difficulty === Difficulty.Difficult) {
      return "Náročné"
    }    
  }
  getFoodStyle(foodStyle: FoodStyle): string{
    if(foodStyle === FoodStyle.GlutenFree){
      return this.noGluten
    } else if (foodStyle === FoodStyle.LowCarb){
      return this.lowCarb
    } else if (foodStyle === FoodStyle.NoMeat) {
      return this.noMeat
    } else if (foodStyle === FoodStyle.None) {
      return this.none
    }     
  }
}
