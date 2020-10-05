import { SideBarItem, SideBarItemType } from './sideBar-item.model';

export class SideBarRange extends SideBarItem{
    title: string;
    min: number;
    max: number;
    def: number;
    path:string;
    value:number;

    constructor(title:string,min:number,max:number,def:number, path:string ) {
        super(title,SideBarItemType.Range, path);
        this.title = title;
        this.min = min;
        this.max = max;
        this.def = def;
        this.path = path;
        this.value = def;
    }
}