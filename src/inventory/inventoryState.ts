import { InventoryData } from "./inventoryData";
import { ItemState } from "./itemState";
import { Items } from "./items";

export namespace Inventory {
    class ItemData {
        itemList: Items.Entry[];
        itemMap: Map<string, number>;

        constructor() {
            this.itemList = [];
            this.itemMap = new Map<string, number>();

            this.addItemToItemList(Items.OreCopper.Item);
            this.addItemToItemList(Items.WoodBirch.Item);
            this.addItemToItemList(Items.MeatBoar.Item);
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

    export function getEntriesWithAnyPropertyTag(tags: string[]) : Items.Entry[] {
        const results: Items.Entry[] = [];

        for(const itemValue of itemData.itemList) {
            if (itemValue.propertyContainsAnyTag(tags)) {
                results.push(itemValue);
            }
        }

        return results;
    }
}