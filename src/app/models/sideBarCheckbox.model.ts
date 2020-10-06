import { SideBarItem, SideBarItemType } from './sideBar-item.model';
import { NameAndValue } from './name-and-value.model';

export class SideBarCheckbox extends SideBarItem{
    title: string;
    options: NameAndValue[];
    path: string;

    constructor(title:string, options:NameAndValue[], path:string) {
        super(title, SideBarItemType.Checkbox,path);
        this.title = title;
        this.options = options;
        this.path = this.path;
    }
}