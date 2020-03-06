import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import { RECIPES } from './mock-recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipes(ingredients: any[]): Recipe[]{
    return RECIPES;
  }

  getRecipe(id: number): Recipe{
    const recepie = RECIPES.filter(recepie => recepie.id === id);
    return recepie[0];
  }
}
