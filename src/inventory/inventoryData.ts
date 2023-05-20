import { MessagingBus } from "../messagingBus";
import { Items } from "./inventoryState";

export class InventoryData {
    private stackableResources: Map<Items.Item, number>;

    constructor() {
        this.stackableResources = new Map<Items.Item, number>();
        MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
    }

    getInventoryState(): Items.InventoryState{
        return Items.InventoryState.fromInventoryData(this);
    }

    addResource(resourceId: Items.Item, count: number): void {
        if (!this.stackableResources.has(resourceId)) {
            this.stackableResources.set(resourceId, count);
            return;
        }

        const currentCount: number | undefined = this.stackableResources.get(resourceId);
        if (currentCount === undefined) {
            console.log("Couldn't update resource with id: " + resourceId);
            return;
        }

        this.stackableResources.set(resourceId, currentCount + count);
    } 

    getStackableResources(): Map<Items.Item, number> {
        return this.stackableResources;
    }
}