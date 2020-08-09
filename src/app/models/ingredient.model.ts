export class Ingredient {
  name: string;
  _id: string;
  amount: number;
  unit: string;

  constructor(name: string, id: string, unit: string, amount?: number) {
    this.name = name;
    this._id = id;
    this.amount = amount;
    this.unit = unit;
  }
}
export enum Unit {
  G,
  Ks,
  Ml
}

export class IngredientUtils {
  public static getUnitName(unit: string): string {
    switch (unit) {
      case "G":
        return "g";
      case "Ks":
        return "ks";
      case "Ml":
        return "ml";
    }
  }
}
