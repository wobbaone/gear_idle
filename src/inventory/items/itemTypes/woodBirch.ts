import { StackableProperty } from "../itemProperties/stackableProperty";
import { Entry } from "./../itemEntry";

export namespace WoodBirch {
    export class Item extends Entry {
        constructor(id: number) {
            super(id, "Birch Wood", "");
            this.addProperty(new StackableProperty(this));
        }
    }
}