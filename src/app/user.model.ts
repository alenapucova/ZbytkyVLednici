export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  favouriteRecipes:
  {
    _id: string;
  }[],
  favouriteIngredients:
  {
    _id: string;
    amount: number;
  }[]
}
