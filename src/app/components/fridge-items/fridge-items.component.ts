import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  Ingredient,
  IngredientUtils
} from "src/app/models/ingredient.model";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import { Criteria } from "src/app/models/criteria.model";
import { IngredientsService } from "src/app/ingredients.service";
import { UserService } from 'src/app/user.service';
import { User } from 'src/app/user.model';

@Component({
  selector: "app-fridge-items",
  templateUrl: "./fridge-items.component.html",
  styleUrls: ["./fridge-items.component.scss"]
})
export class FridgeItemsComponent implements OnInit {
  @Input() showCriteria = true;
  @Input() favouriteIngredients: Ingredient[] = new Array<Ingredient>();
  //@Input() localStorage: boolean = true;
  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();
  @Output() criteriaChanged = new EventEmitter<Criteria>();

  chosenIngredient: Ingredient;
  input: string;
  selectedOption: string = "";
  chosenIngredients: Ingredient[] = new Array<Ingredient>();
  amount: number;
  item: string;
  myControl = new FormControl();
  user: User;

  options: Ingredient[] = [];

  filteredOptions: Observable<Ingredient[]>;

  constructor(private ingredientService: IngredientsService, private userService: UserService, ) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(
      profile => {
        this.user = profile.user;
        this.userService.getFavouriteIngredients(this.user._id).subscribe(favouriteIngredients => {
          this.chosenIngredients = favouriteIngredients;
          this.favouriteIngredients = favouriteIngredients;
          console.log('favouriteIngredients', this.favouriteIngredients);
        })
      })


    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.options = ingredients;
      this.upDateOptions();
    });
    if (localStorage) {
      //this.chosenIngredients = this.favouriteIngredients;

    } else {
      this.loadLocalStorage();
    }
  }

  displayFn(ingredient: Ingredient): string {
    return ingredient && ingredient.name ? ingredient.name : "";
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase(); //delete diaktritika

    return this.options.filter(
      option =>
        option.name
          .toLowerCase() /*delete diaktritika*/
          .indexOf(filterValue) === 0
    );
  }

  //zvolena surovina z auto complete
  itemSelected(selected: MatAutocompleteSelectedEvent) {
    this.chosenIngredient = selected.option.value;
  }

  addItem() {
    if (this.item !== "") {
      //pokud je prazdne pole, nedovolit pridat surovinu do seznamu

      this.chosenIngredient.amount = this.amount;

      if (this.isNumber(this.amount)) {
        //zkontrolovat, ze amount je číslo
        //pridani suroviny do seznamu
        this.chosenIngredients.push(this.chosenIngredient);
        //vymazani suroviny z nabidky
        this.removeOption(this.options, this.chosenIngredient._id);
        //po pridani surovin vymazat input pole
        this.amount = null;
        this.item = "";

        this.chosenIngredient = null;

        this.ingredientsChanged.emit(this.chosenIngredients);

        if (localStorage) {
          localStorage.setItem("items", JSON.stringify(this.chosenIngredients));
        }
        this.upDateOptions();
      } else {
        console.log("not a number");
      }
    }
  }

  deleteItem(item: Ingredient) {
    const index: number = this.chosenIngredients.indexOf(item);
    if (index !== -1) {
      this.chosenIngredients.splice(index, 1);
      this.ingredientsChanged.emit(this.chosenIngredients);
      this.options.push(item);
      this.upDateOptions();
    }
    if (localStorage) {
      localStorage.setItem("items", JSON.stringify(this.chosenIngredients));
    }
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  removeOption(options: Ingredient[], id: string) {
    for (let i = 0; i < options.length; i++) {
      if (options[i]._id === id) {
        options.splice(i--, 1);
      }
    }
  }
  upDateOptions() {
    this.options.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }
  onCriteriaChanged(value: Criteria) {
    this.criteriaChanged.emit(value);
  }
  loadLocalStorage() {
    let localStoreItems = JSON.parse(localStorage.getItem("items"));
    console.log('localstorage');
    if (localStoreItems) {
      this.chosenIngredients = localStoreItems as Ingredient[];
      //this.ingredientsChanged.emit(this.chosenIngredients);
    }

  }
  getUnitName(unit: string): string {
    return IngredientUtils.getUnitName(unit);
  }
}
