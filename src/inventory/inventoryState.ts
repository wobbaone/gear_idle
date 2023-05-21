import { InventoryData } from "./inventoryData";
import { Entry } from "./items/itemEntry";
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
        private item: Entry;
        private count: number;

        constructor(item: Entry, count: number) {
            this.item = item;
            this.count = count;
        }

        getItem(): Entry {
            return this.item;
        }

        getCount(): number {
            return this.count;
        }
    }

    class ItemData {
        itemList: Entry[];
        itemMap: Map<string, number>;

        constructor() {
            this.itemList = [];
            this.itemMap = new Map<string, number>();

            this.addItemToItemList(Items.OreCopperItem);
            this.addItemToItemList(Items.WoodBirchItem);
            this.addItemToItemList(Items.MeatBoarItem);
        }

        private addItemToItemList<T extends Entry>(ctor: new(id: number) => T): void {
            const index: number = this.itemList.length;

            this.itemMap.set(ctor.name, index);
            this.itemList.push(new ctor(index));
        }
    }  

    const itemData: ItemData = new ItemData()

    export function listAllItems() : Entry[] {
        return itemData.itemList;
    }

    export function getEntryFromId(id: number) : Entry | null {
        if (id < 0 || id >= itemData.itemList.length) {
            console.error("Could not find item with ID: " + id);
            return null;
        }

        return itemData.itemList[id];
    }

    export function getEntryFromClass(ctor: new(id: number) => Entry) : Entry | null {
        if (!itemData.itemMap.has(ctor.name)) {
            console.error("Could not find item from class: " + ctor.toString());
            return null;
        }

        let id: number | undefined = itemData.itemMap.get(ctor.name);
        if (id === undefined) {
            id = -1;
        }

        return getEntryFromId(id);
    }
}