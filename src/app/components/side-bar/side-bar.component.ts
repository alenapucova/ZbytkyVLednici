import { Component, OnInit, AfterViewInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { SideBarItem as SideBarItem, SideBarItemType } from '../../models/sideBar-item.model';
import { SideBarRange } from 'src/app/models/sideBarRange.model';
import { SideBarCheckbox } from 'src/app/models/sideBarCheckbox.model';
import { NameAndValue } from 'src/app/models/name-and-value.model';
import { Criteria } from 'src/app/models/criteria.model';
import { PortionsService } from 'src/app/portions.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {

  @Output() criteriaChanged = new EventEmitter<Criteria>();
  criteria: Criteria = new Criteria();
  
  
  portions = new SideBarRange("Počet porcí", 1, 4, 2, '../../../assets/img/plus.svg');
  time =  new SideBarRange("Časová náročnost", 10, 90, 30, '../../../assets/img/alarm.svg');
  style = new SideBarCheckbox("Styl stravování", [{id: 1, name: "Bez masa", checked: false},{id: 2, name: "Low carb", checked: false},{id: 3, name: "Bez lepku", checked: false}], '../../../assets/img/style.svg');
  difficulty = new SideBarCheckbox("Obtížnost", [{id: 1, name: "Snadné", checked: false},{id: 2, name: "Středně náročné", checked: false},{id: 3, name: "Náročné", checked: false}], '../../../assets/img/difficulty.svg');
  typeOfMeal = new SideBarCheckbox("Druh pokrmu", [{id: 1, name: "Hlavní chod", checked: false},{id: 2, name: "Polévka", checked: false},{id: 3, name: "Dezert", checked: false},{id: 4, name: "Svačinka", checked: false},{id: 5, name: "Snídaně", checked: false}], '../../../assets/img/meal.svg');

  itemType = SideBarItemType;

  constructor(private portionService: PortionsService) {    
    
  }
  ngOnInit() {
    this.loadCriteriaStorage();
    this.portionService.portion.subscribe(res => {
      this.portions.value = res;
    });   
  }
  onTimeChanged() {
    this.criteria.time = this.time.value;
    this.criteriaChanged.emit(this.criteria);
    this.saveCriteriaStorage();
    
  }
  onPortionsChanged() {
    this.criteria.portions = this.portions.value;
    this.criteriaChanged.emit(this.criteria);
    this.saveCriteriaStorage();
    this.portionService.nextPortions(this.criteria.portions);
  }
  onStyleChanged(option: NameAndValue, $event: any) {
    this.criteria.style = this.style.options;
    console.log('onstylechanged');
    console.log($event);
    this.criteriaChanged.emit(this.criteria);
    this.saveCriteriaStorage();
  }
  onDifficultyChanged() {
    this.criteria.difficulty = this.difficulty.options;
    this.criteriaChanged.emit(this.criteria);
    this.saveCriteriaStorage();
  }
  onTypeOfMealChanged() {
    this.criteria.typeOfMeal = this.typeOfMeal.options;
    this.criteriaChanged.emit(this.criteria);
    this.saveCriteriaStorage();
  }
  saveCriteriaStorage() {
    localStorage.setItem("criteria", JSON.stringify(this.criteria));
  }
  loadCriteriaStorage() {
    let localStoreCriteria = JSON.parse(localStorage.getItem("criteria"));


    if(localStoreCriteria) {
      this.criteria = localStoreCriteria;
      this.criteria.style && (this.style.options = this.criteria.style);
      this.criteria.typeOfMeal && (this.typeOfMeal.options = this.criteria.typeOfMeal);
      this.criteria.difficulty && (this.difficulty.options = this.criteria.difficulty);
      this.criteria.time && (this.time.value = this.criteria.time);
      this.criteria.portions && (this.portionService.nextPortions(this.criteria.portions));
       
      this.criteriaChanged.emit(this.criteria);
    }
    
    console.log(localStoreCriteria);
  }
} 

