import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient, Unit, IngredientUtils } from 'src/app/models/ingredient.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { SideBarItem } from 'src/app/models/sideBar-item.model';
import { NameAndValue } from 'src/app/models/name-and-value.model';
import { Criteria } from 'src/app/models/criteria.model';
import { StorageService } from 'src/app/storage.service';
import { all } from 'q';



@Component({
  selector: 'app-fridge-items',
  templateUrl: './fridge-items.component.html',
  styleUrls: ['./fridge-items.component.scss']
})
export class FridgeItemsComponent implements OnInit {

  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();
  @Output() criteriaChanged = new EventEmitter<Criteria>();

  chosenIngredient: Ingredient;
  input: string;
  selectedOption: string = '';
  allItems: Ingredient[] = new Array<Ingredient>();
  amount: number;
  item: string;
  myControl = new FormControl();

  options: Ingredient[] = [
    new Ingredient('mléko', 1, Unit.Ml),
    new Ingredient('vejce', 2, Unit.Ks),
    new Ingredient('těstoviny', 3, Unit.G),
    new Ingredient('rýže', 4, Unit.G),
    new Ingredient('kuřecí maso', 5, Unit.G),
    new Ingredient('smetana', 6, Unit.Ml),
    new Ingredient('cibule', 7, Unit.Ks),
    new Ingredient('bazalkové pesto', 8, Unit.G),
    new Ingredient('dýně', 9, Unit.G),
    new Ingredient('brambory', 10, Unit.G),
    new Ingredient('máslo', 11, Unit.G),
    new Ingredient('stroužek česneku', 12, Unit.Ks),
    new Ingredient('strouhaný sýr', 13, Unit.G),
    new Ingredient('kuskus', 14, Unit.G),
    new Ingredient('zelenina', 15, Unit.G),
    new Ingredient('sojová omáčka', 16, Unit.G),

  ];
  filteredOptions: Observable<Ingredient[]>;

  ngOnInit() {
    this.upDateOptions();
    this.loadLocalStorage();
  }



  displayFn(ingredient: Ingredient): string {
    return ingredient && ingredient.name ? ingredient.name : '';
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();//delete diaktritika

    return this.options.filter(option => option.name.toLowerCase()/*delete diaktritika*/.indexOf(filterValue) === 0);
  }

  //zvolena surovina z auto complete 
  itemSelected(selected: MatAutocompleteSelectedEvent) {
    this.chosenIngredient = selected.option.value;
    // this.unit = this.chosenIngredient.unit.toString();
    console.log(this.chosenIngredient)
  }

  addItem() {
    if (this.item !== '') { //pokud je prazdne pole, nedovolit pridat surovinu do seznamu

      this.chosenIngredient.amount = this.amount;

      if (this.isNumber(this.amount)) { //zkontrolovat, ze amount je číslo
        //pridani suroviny do seznamu
        this.allItems.push(this.chosenIngredient);
        console.log('ingredience', this.chosenIngredient.id);
        //vymazani suroviny z nabidky
        this.removeOption(this.options, this.chosenIngredient.id);
        //po pridani surovin vymazat input pole
        this.amount = null;
        this.item = '';
        this.chosenIngredient = null;

        this.ingredientsChanged.emit(this.allItems);


        localStorage.setItem("items", JSON.stringify(this.allItems));



      } else {
        console.log('not a number')
      }
    }
  }

  deleteItem(item: Ingredient) {
    const index: number = this.allItems.indexOf(item);
    if (index !== -1) {
      this.allItems.splice(index, 1);
      this.ingredientsChanged.emit(this.allItems);
      this.options.push(item);
      this.upDateOptions();

    }
    localStorage.setItem("items", JSON.stringify(this.allItems));
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0)
  }

  removeOption(options: Ingredient[], id: number) {
    for (let i = 0; i < options.length; i++) {
      if (options[i].id === id) {
        options.splice(i--, 1);
      }
    }
  }
  upDateOptions() {

    this.options.sort((a, b) => a.name.localeCompare(b.name));
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  onCriteriaChanged(value: Criteria) {
    this.criteriaChanged.emit(value);
   // localStorage.setItem("criteria", JSON.stringify(value));
  }
  loadLocalStorage() {
    let localStoreItems = JSON.parse(localStorage.getItem("items"));
    //let localStoreCriteria = JSON.parse(localStorage.getItem("criteria"))
    //console.log(localStoreCriteria);
    //console.log(localStoreCriteria)
    
    //console.log(this.criteriaChanged)

    if(localStoreItems) {
      this.allItems = localStoreItems  as Ingredient[];
      this.ingredientsChanged.emit(this.allItems);
    }
   // if(localStoreCriteria) {
     // this.criteriaChanged = localStoreCriteria;
     
      //this.criteriaChanged.emit(this.allItems);
    //}

    //this.allItems = (JSON.parse(localStorage.getItem("items")) as Ingredient[]);
    //this.ingredientsChanged.emit(this.allItems);
    console.log(this.allItems);


    //localStorage.clear()

  }
  getUnitName(unit: Unit): string {
    return IngredientUtils.getUnitName(unit);
  }
}
