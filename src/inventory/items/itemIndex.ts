import { Inventory } from "../inventoryState"
import { Entry } from "./itemEntry";

export * from "./itemTypes/meatBoarItem"
export * from "./itemTypes/oreCopperItem"
export * from "./itemTypes/woodBirch"
export * from "./itemEntry"

export function getItem(item: new(id: number) => Entry): Entry {
    const entry: Entry | null =  Inventory.getEntryFromClassName(item.name);

    if (entry === null) {
        console.error("Could not get an item with class: " + item.name);
        return new class extends Entry {}(-1, "Error item", "");
    }

    return entry;
}