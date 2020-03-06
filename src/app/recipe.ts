export interface Recipe {
    id : number;
    title : string;
    ingredients : string[];
    progress : string; 
    time: number;
    difficulty: Difficulty;
    foodStyle: FoodStyle;

}
export enum Difficulty {
    Easy, 
    Medium, 
    Difficult
}
export enum FoodStyle{
    LowCarb,
    NoMeat,
    GlutenFree,
}