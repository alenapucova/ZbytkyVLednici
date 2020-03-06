import { SideBarItem, SideBarItemType } from './sideBar-item.model';

export class SideBarRange extends SideBarItem{
    title: string;
    min: number;
    max: number;
    def: number;

    constructor(title:string,min:number,max:number,def:number ) {
        super(title,SideBarItemType.Range);
        this.title = title;
        this.min = min;
        this.max = max;
        this.def = def;
    }
}