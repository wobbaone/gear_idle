import { MessagingBus } from "../utils/messagingBus";
import { Inventory } from "./inventoryState";
import { AItemPropertyState } from "./itemPropertyState";
import { ItemState } from "./itemState";
import { Items } from "./items";
import { StackableProperty, StackablePropertyState } from "./items/itemProperties/stackableProperty";

export class InventoryData {
    private parentId: number;
    private items: ItemState[];
    private stackableItems: Map<number, ItemState>;

    constructor(parentId: number) {
        this.items = [];
        this.stackableItems = new Map<number, ItemState>();

        this.parentId = parentId;

        MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
    }

    addResource(entityId: number, resourceId: number, count: number): void {
        if (this.parentId !== entityId) {
            return;
        }

        const itemEntry: Items.Entry | null = Inventory.getEntryFromId(resourceId);
        if (itemEntry === null) {
            console.log("Resource with id does not exist: " + resourceId);
            return;
        }

        if (!itemEntry.hasPropertyWithTag(StackableProperty.TAG)) {
            this.items.push(itemEntry.createState());
            return;
        }

        if (!this.stackableItems.has(resourceId)) {
            this.stackableItems.set(resourceId, itemEntry.createState());
        }

        const currentState: ItemState | undefined = this.stackableItems.get(resourceId);
        if (currentState === undefined) {
            console.log("Couldn't update resource with id: " + resourceId);
            return;
        }

        const stackableProperties: AItemPropertyState[] = currentState.getPropertyStatesWithTag(StackableProperty.TAG);
        for (const property of stackableProperties) {
            if (property instanceof StackablePropertyState) {
                property.setCount(property.getCount() + count);
            }
        }
    }

    getStackableItems(): ItemState[] {
        const result: ItemState[] = [];
        for (const item of this.stackableItems.values()) {
            result.push(item);
        }

        return result;
    }

    getItems(): ItemState[] {
        return this.items;
    }
}