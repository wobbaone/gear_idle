import { InventoryData } from "../inventory/inventoryData";
import { Inventory } from "../inventory/inventoryState";
import { MessagingBus } from "../utils/messagingBus";
import { Player } from "../player";
import { Utils } from "../utils/utils";
import { AActivity } from "./activity";
export class InventoryActivity extends AActivity {
    private resourceChangeCallback: MessagingBus.Subscription<MessagingBus.ResourceChangeEvent>;

    constructor() {
        super();

        this.resourceChangeCallback = MessagingBus.subscribeToResourceChange((entityId: number, resourceId: number, amount: number) => {
            if (Player.getCharacterData().getId() !== entityId) {
                return;
            }

            this.buildDOM();
        });
    }

    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Inventory";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const inventoryContainer: HTMLElement = this.drawInventoryBox();
        body.appendChild(inventoryContainer);

        const inventoryState: Inventory.State = Player.getCharacterData().getInventory().getInventoryState();
        
        const items: Inventory.ItemState[] = inventoryState.getItems();
        for (let i: number = 0; i < items.length; i++) {
            const itemDiv: HTMLDivElement = document.createElement("div");
            itemDiv.className = "item-element";

            const nameSpan: HTMLSpanElement = document.createElement("span");
            nameSpan.innerHTML = items[i].getItem().getName();
            itemDiv.appendChild(nameSpan);

            const countSpan: HTMLSpanElement = document.createElement("span");
            countSpan.innerHTML = items[i].getCount().toString();
            itemDiv.appendChild(countSpan);
            
            inventoryContainer.appendChild(itemDiv);
        }
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }   

    private drawInventoryBox(): HTMLElement {
        const zoneBoxDiv: HTMLDivElement = document.createElement("div");
        zoneBoxDiv.className = "inventory-items";

        return zoneBoxDiv;
    }

    delete(): void {
        super.delete();

        this.resourceChangeCallback.unsubscribe();
    }
}