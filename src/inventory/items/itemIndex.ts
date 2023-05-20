import { Inventory } from "../inventoryState"
import { ItemEntry } from "../itemEntry";

export * from "./meatBoarItem"
export * from "./oreCopperItem"
export * from "./woodBirch"

export function getItem(item: new(id: number) => ItemEntry): ItemEntry {
    return Inventory.getEntryFromClass(item);
}