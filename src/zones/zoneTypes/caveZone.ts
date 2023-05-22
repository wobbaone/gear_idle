import { AdventureActivityType } from "../../activities/adventureActivity";
import { Inventory } from "../../inventory/inventoryState";
import { Items } from "../../inventory/items";
import { MessagingBus } from "../../messagingBus";
import { Utils } from "../../utils";
import { IZone } from "./zone";

export class CavesZone implements IZone {
    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Caves";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        
        const adContainer: HTMLDivElement = document.createElement("div");
        adContainer.className = "adventuring-zone-container adventuring-zone-"+this.getName();
        adContainer.style.backgroundSize = 'contain';
        adContainer.style.backgroundPosition = 'center';
        body.appendChild(adContainer);

        const content: HTMLDivElement = document.createElement("div");
        content.className = "adventuring-zone-content";
        adContainer.appendChild(content);

        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Mining in " + this.getName();
        content.appendChild(profileText);

        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = "Leave " + this.getName();
        backButton.className = "back-button";
        backButton.onclick = () => {
            MessagingBus.publishToZoneChange(null); 
        }
        content.appendChild(backButton);
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    private activityTypes: ReadonlyArray<AdventureActivityType> = [
        AdventureActivityType.Mining,
        AdventureActivityType.Combat
    ].sort();

    getActivityTypes(): ReadonlyArray<AdventureActivityType> {
        return this.activityTypes;
    }   

    getName(): string {
        return "Caves";
    }

    onGameTick(): void {
        const orePerTick: number = Utils.randomIntBetween(1, 2);
        
        MessagingBus.publishToResourceChange(Items.getItem(Items.OreCopperItem).getId(), orePerTick);
    }
}