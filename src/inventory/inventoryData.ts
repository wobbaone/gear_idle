import { MessagingBus } from "../utils/messagingBus";
import { Inventory } from "./inventoryState";

export class InventoryData {
    private parentId: number;
    private stackableResources: Map<number, number>;

    constructor(parentId: number) {
        this.stackableResources = new Map<number, number>();
        this.parentId = parentId;

        MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
    }

    getInventoryState(): Inventory.State{
        return Inventory.State.fromInventoryData(this);
    }

    addResource(entityId: number, resourceId: number, count: number): void {
        if (this.parentId !== entityId) {
            return;
        }

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

    getStackableResources(): Map<number, number> {
        return this.stackableResources;
    }
}