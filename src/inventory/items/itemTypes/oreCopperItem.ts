import { Entry } from "../itemEntry";
import { StackableProperty } from "../itemProperties/stackableProperty";

export namespace OreCopper {
    export class Item extends Entry {
        constructor(id: number) {
            super(id, "Copper Ore", "");
            this.addProperty(new StackableProperty(this));
        }
    }
}