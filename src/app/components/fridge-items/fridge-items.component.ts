import { Component, OnInit } from '@angular/core';
import { fridgeItem } from 'src/app/models/fridgeItem.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
//import {MatAutocompleteModule} from '@angular/material/autocomplete';


export interface Ingredient {
  singleIngredient: string;
}

@Component({
  selector: 'app-fridge-items',
  templateUrl: './fridge-items.component.html',
  styleUrls: ['./fridge-items.component.scss']
})
export class FridgeItemsComponent implements OnInit {
  
  allItems: fridgeItem[] = new Array<fridgeItem>();
  
  myControl = new FormControl();
  options: Ingredient[] = [
    {singleIngredient: 'mléko'},
    {singleIngredient: 'vejce'},
    {singleIngredient: 'těstoviny'},
    {singleIngredient: 'rýže'},
    {singleIngredient: 'kuřecí maso'},
    {singleIngredient: 'smetana'},
    {singleIngredient: 'cibule'},
  ];
  filteredOptions: Observable<Ingredient[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: Ingredient): string {
    return user && user.singleIngredient ? user.singleIngredient : '';
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.singleIngredient.toLowerCase().indexOf(filterValue) === 0);
  }

  addItem(item){
    if(item != ''){
      console.log(`${item.value}`);
      this.allItems.push(new fridgeItem(item.value));
      item.value = '';      
    }  
  }

  deleteItem(item:fridgeItem){
    const index: number = this.allItems.indexOf(item);
    if(index !== -1) {
      this.allItems.splice(index,1);
    }
  } 
}
