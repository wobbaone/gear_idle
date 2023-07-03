import { Inventory } from "../inventory/inventoryState";
import { MessagingBus } from "../utils/messagingBus";
import { Player } from "../player";
import { Utils } from "../utils/utils";
import { AActivity } from "./activity";
import { ItemState } from "../inventory/itemState";
import { StackableProperty, StackablePropertyState } from "../inventory/items/itemProperties/stackableProperty";
import { AItemPropertyState } from "../inventory/itemPropertyState";
import { EdibleProperty } from "../inventory/items/itemProperties/edibleProperty";

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

        const stackableItems: ItemState[] = Player.getCharacterData().getInventory().getStackableItems();  
        for (const item of stackableItems) {
            const itemDiv: HTMLDivElement = document.createElement("div");
            itemDiv.className = "item-element";

            const nameSpan: HTMLSpanElement = document.createElement("span");
            nameSpan.innerHTML = item.getData().getName();
            itemDiv.appendChild(nameSpan);

            const stackSizeArr: AItemPropertyState[] = item.getPropertyStatesWithTag(StackableProperty.TAG);
            if (stackSizeArr.length === 0) {
                inventoryContainer.appendChild(itemDiv);
                continue;
            }

            const stackSize: AItemPropertyState = stackSizeArr[0];
            if (!(stackSize instanceof StackablePropertyState)) {
                inventoryContainer.appendChild(itemDiv);
                continue;
            }

            const count: number = stackSize.getCount();

            const countSpan: HTMLSpanElement = document.createElement("span");
            countSpan.innerHTML = count + "";
            itemDiv.appendChild(countSpan);
            
            if (item.getPropertyStatesWithTag(EdibleProperty.TAG)) {
                itemDiv.onclick = () => Player.getCharacterData().getEquipment().equipFood(item);
            }

            inventoryContainer.appendChild(itemDiv);
        }

        const otherItems: ItemState[] = Player.getCharacterData().getInventory().getItems();  
        for (const item of otherItems) {
            const itemDiv: HTMLDivElement = document.createElement("div");
            itemDiv.className = "item-element";

            const nameSpan: HTMLSpanElement = document.createElement("span");
            nameSpan.innerHTML = item.getData().getName();
            itemDiv.appendChild(nameSpan);

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