import { Recipe, Difficulty, FoodStyle } from './recipe';
import { IngredientItem } from './ingredientItem';

export const RECIPES: Recipe[] = [
    {
        id:1, 
        title: 'Míchaná vejce', 
        ingredients:['vejce'],
        progress: 'zamichat a smazit', 
        time: 30,
        difficulty: Difficulty.Easy, 
        foodStyle: FoodStyle.GlutenFree
    },
    {
        id:2, 
        title: 'Testoviny', 
        ingredients: ['testoviny', 'pesto'],
        progress: 'zamichat a smazit', 
        time: 20,
        difficulty: Difficulty.Medium, 
        foodStyle: FoodStyle.NoMeat
    },
    {
        id:3, 
        title: 'Chleba s maslem', 
        ingredients: ['chleba', 'maslo'],
        progress: 'zamichat a smazit', 
        time: 10,difficulty: 
        Difficulty.Difficult, 
        foodStyle: FoodStyle.LowCarb
    }, 
    {
        id:4, 
        title: 'Brambory', 
        ingredients: ['brambory', 'kuřecí maso'],
        progress: 'zamichat a smazit', 
        time: 50,
        difficulty: Difficulty.Easy, 
        foodStyle: FoodStyle.NoMeat
    },   
];