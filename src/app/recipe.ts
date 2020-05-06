import { Ingredient } from '../app/models/ingredient.model';

export interface Recipe {
    id : number;
    title : string;
    ingredients : Ingredient [];
    progress : string; 
    time: number;
    difficulty: Difficulty[];
    foodStyle: FoodStyle[];
    foodType: FoodType[];

}
export enum Difficulty {
    Easy = 1, 
    Medium = 2, 
    Difficult = 3
}
export enum FoodStyle {
    NoMeat = 1,
    LowCarb = 2,    
    GlutenFree = 3,
    None = 0
}
export enum FoodType {
    MainMeal = 1,
    Soup = 2,
    Dezert = 3,
    Snack = 4,
    Breakfast = 5

}