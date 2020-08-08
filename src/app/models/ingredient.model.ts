export class Ingredient {
  name: string;
  _id: string;
  amount: number;
  unit: Unit;

  constructor(name: string, id: string, unit: Unit, amount?: number) {
    this.name = name;
    this._id = id;
    this.amount = amount;
    this.unit = unit;
  }

  /*  getUnitName(): string {
        switch (this.unit) {
            case Unit.G:
                return "g";
            case Unit.Ks:
                return "ks";
            case Unit.Ml:
                return "ml";
        }
    }*/
}
export enum Unit {
  G,
  Ks,
  Ml
}

export class IngredientUtils {
  public static getUnitName(unit: Unit): string {
    switch (unit) {
      case Unit.G:
        return "g";
      case Unit.Ks:
        return "ks";
      case Unit.Ml:
        return "ml";
    }
  }
}
