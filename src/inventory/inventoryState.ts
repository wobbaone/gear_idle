import { InventoryData } from "./inventoryData";

export namespace Items {
    export enum Item {
        Ore = 0,
        Wood = 1,
        Meat
    }

    class ItemData {
        itemList: ItemEntry[] = ItemData.buildItemList();

        static buildItemList(): ItemEntry[] {
            const list: ItemEntry[] = [];
            for (const itemEnumEntry in Item) {
                const id: number = Number(itemEnumEntry);
                if (isNaN(id)) {
                    continue;
                }
                if (id !== list.length) {
                    console.error("Item enum is out of order");
                    return [];
                }

                list.push(new ItemEntry(id, Item[id]));
            }

            return list
        }
    }  

    export class InventoryState { 
        private items: ItemState[];

        private constructor() {
            this.items = [];
        }

        getItems(): ItemState[] {
            return this.items;
        }

        static fromInventoryData(data: InventoryData): InventoryState {
            const state: InventoryState =  new InventoryState();
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

    export class ItemEntry {
        private name: string;
        private id: number;

        constructor(id: number, name: string) {
            this.id = id;
            this.name = name;
        }

        getName(): string {
            return this.name;
        }
        
        getId(): number {
            return this.id;
        }
    }

    const itemData: ItemData = new ItemData()

    export function listAllItems() : ItemEntry[] {
        return itemData.itemList;
    }
}