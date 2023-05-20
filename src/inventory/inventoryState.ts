import { InventoryData } from "./inventoryData";
import { ItemEntry } from "./itemEntry";
import { Items } from "./items";

export namespace Inventory {
    export class State { 
        private items: ItemState[];

        private constructor() {
            this.items = [];
        }

        getItems(): ItemState[] {
            return this.items;
        }

        static fromInventoryData(data: InventoryData): State {
            const state: State =  new State();
            const stackableResources: Map<number, number> = data.getStackableResources();

            stackableResources.forEach((count: number, id: number) => {
                state.items.push(new ItemState(itemData.itemList[id], count));
            });

            return state;
        }
    }

    export class ItemState {
        private item: ItemEntry;
        private count: number;

        constructor(item: ItemEntry, count: number) {
            this.item = item;
            this.count = count;
        }

        getItem(): ItemEntry {
            return this.item;
        }

        getCount(): number {
            return this.count;
        }
    }

    class ItemData {
        itemList: ItemEntry[];
        itemMap: Map<new(id: number) => ItemEntry, number>;

        constructor() {
            this.itemList = [];
            this.itemMap = new Map<new(id: number) => ItemEntry, number>();

            this.addItemToItemList(Items.OreCopperItem);
            this.addItemToItemList(Items.WoodBirchItem);
            this.addItemToItemList(Items.MeatBoarItem);
        }

        private addItemToItemList<T extends ItemEntry>(ctor: new(id: number) => T): void {
            const index: number = this.itemList.length;

            this.itemMap.set(ctor, index);
            this.itemList.push(new ctor(index));
        }
    }  

    const itemData: ItemData = new ItemData()

    export function listAllItems() : ItemEntry[] {
        return itemData.itemList;
    }

    export function getEntryFromId(id: number) : ItemEntry {
        if (id < 0 || id >= itemData.itemList.length) {
            console.error("Could not find item with ID: " + id);
            return new ItemEntry(-1, "Error Item", "");
        }

        return itemData.itemList[id];
    }

    export function getEntryFromClass(ctor: new(id: number) => ItemEntry) : ItemEntry {
        if (!itemData.itemMap.has(ctor)) {
            console.error("Could not find item from class: " + ctor.toString());
            return new ItemEntry(-1, "Error Item", "");
        }

        let id: number | undefined = itemData.itemMap.get(ctor);
        if (id === undefined) {
            id = -1;
        }

        return getEntryFromId(id);
    }
}