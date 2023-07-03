import { ItemState } from "../../itemState";
import { Entry } from "../itemEntry";
import { EdibleProperty } from "../itemProperties/edibleProperty";
import { StackableProperty } from "../itemProperties/stackableProperty";

export namespace MeatBoar {
    export class Item extends Entry {
        constructor(id: number) {
            super(id, "Boar Meat", "");
            this.addProperty(new EdibleProperty(this, 3));
            this.addProperty(new StackableProperty(this));
        }
    }
}