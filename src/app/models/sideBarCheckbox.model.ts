import { SideBarItem, SideBarItemType } from './sideBar-item.model';

export class SideBarCheckbox extends SideBarItem{
    title: string;
    options: string[];

    constructor(title:string, options:string[]) {
        super(title, SideBarItemType.Checkbox);
        this.title = title;
        this.options = options;
    }
}