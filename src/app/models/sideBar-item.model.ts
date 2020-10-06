export class SideBarItem {
    title: string;
    type: SideBarItemType;
    path: string;

    constructor(title: string, type:SideBarItemType, path:string) {
        this.title = title;
        this.type = type;
        this.path = path;
    }
}
export enum SideBarItemType{
    Checkbox,
    Range,
}