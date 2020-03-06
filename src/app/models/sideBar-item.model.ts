export class SideBarItem {
    title: string;
    type: SideBarItemType;

    constructor(title: string, type:SideBarItemType) {
        this.title = title;
        this.type = type;
    }
}
export enum SideBarItemType{
    Checkbox,
    Range,
}