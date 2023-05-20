import { MessagingBus } from "../messagingBus";

export class InventoryData {
    private stackableResources: Map<number, number>;

    constructor() {
        this.stackableResources = new Map<number, number>();
        MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
    }

    addResource(resourceId: number, count: number) : void {
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
}