import { Inventory } from "../inventoryState"
import { Entry } from "./itemEntry";

export * from "./meatBoarItem"
export * from "./oreCopperItem"
export * from "./woodBirch"
export * from "./weapon"
export * from "./armor"
export * from "./itemEntry"

export function getItem(item: new(id: number) => Entry): Entry {
    const entry: Entry | null =  Inventory.getEntryFromClass(item);

    if (entry === null) {
        console.log("Could not get an item with class: " + item.toString());
        return new class extends Entry {}(-1, "Error item", "");
    }

    return entry;
}