import { InventoryData } from "./inventoryData";
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
        private item: Items.Entry;
        private count: number;

        constructor(item: Items.Entry, count: number) {
            this.item = item;
            this.count = count;
        }

        getItem(): Items.Entry {
            return this.item;
        }

        getCount(): number {
            return this.count;
        }
    }

    class ItemData {
        itemList: Items.Entry[];
        itemMap: Map<string, number>;

        constructor() {
            this.itemList = [];
            this.itemMap = new Map<string, number>();

            this.addItemToItemList(Items.OreCopperItem);
            this.addItemToItemList(Items.WoodBirchItem);
            this.addItemToItemList(Items.MeatBoarItem);
        }

        private addItemToItemList<T extends Items.Entry>(ctor: new(id: number) => T): void {
            const index: number = this.itemList.length;

            this.itemMap.set(ctor.name, index);
            this.itemList.push(new ctor(index));
        }
    }  

    const itemData: ItemData = new ItemData()

    export function listAllItems() : Items.Entry[] {
        return itemData.itemList;
    }

    export function getEntryFromId(id: number) : Items.Entry | null {
        if (id < 0 || id >= itemData.itemList.length) {
            console.error("Could not find item with ID: " + id);
            return null;
        }

        return itemData.itemList[id];
    }

    export function getEntryFromClass(ctor: new(id: number) => Items.Entry) : Items.Entry | null {
        return getEntryFromClassName(ctor.name);
    }

    export function getEntryFromClassName(className: string) : Items.Entry | null {
        if (!itemData.itemMap.has(className)) {
            console.error("Could not find item from class: " + className);
            return null;
        }

        let id: number | undefined = itemData.itemMap.get(className);
        if (id === undefined) {
            id = -1;
        }

        return getEntryFromId(id);
    }
}