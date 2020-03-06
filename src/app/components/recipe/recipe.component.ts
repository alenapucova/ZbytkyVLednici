import { Component, OnInit } from '@angular/core';

import { Recipe, Difficulty, FoodStyle } from '../../recipe';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  getRecipes(): void {
    this.recipes = this.recipeService.getRecipes(null);
  }
  ngOnInit() {
    this.getRecipes()
  }
  
  getDifficulty(difficulty: Difficulty){
    if(difficulty === Difficulty.Easy){
      return "Snadné"
    } else if (difficulty === Difficulty.Medium){
      return "Středně obtížné"
    } else if (difficulty === Difficulty.Difficult) {
      return "Náročné"
    }    
  }
  getFoodStyle(foodStyle: FoodStyle){
    if(foodStyle === FoodStyle.GlutenFree){
      return "Bez lepku"
    } else if (foodStyle === FoodStyle.LowCarb){
      return "Low Carb"
    } else if (foodStyle === FoodStyle.NoMeat) {
      return "Bez masa"
    }    
  }
 
}
