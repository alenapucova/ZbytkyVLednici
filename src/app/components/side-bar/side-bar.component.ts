import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { SideBarItem as SideBarItem, SideBarItemType } from '../../models/sideBar-item.model';
import { SideBarRange } from 'src/app/models/sideBarRange.model';
import { SideBarCheckbox } from 'src/app/models/sideBarCheckbox.model';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideBarComponent implements OnInit {

  items : SideBarItem[];
  itemType = SideBarItemType;

  constructor() { 
    this.items = [
      new SideBarRange("Časová náročnost",10,90,30),
      new SideBarCheckbox("Styl stravování", ["Bez masa", "Low carb","Bez lepku"]),
      new SideBarCheckbox("Obtížnost",["Snadné","Středně náročné","Náročné"]),
      new SideBarRange("Počet porcí",1,4,2),
      new SideBarCheckbox("Druh pokrmu", ["Hlavní chod","Polévka","Dezert"]),
    ]
}
  ngOnInit() {
    
  }

  openDescription(event: any, name: string, option:string[]): void {
    console.log(name);
    console.log(option);
    
  }
}
