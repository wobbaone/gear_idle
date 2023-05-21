import { AdventureActivityType } from "../activities/adventureActivity";
import { Utils } from "../utils";
import { IZone } from "./zone";
import { MessagingBus } from "../messagingBus";
import { Items } from "../inventory/items";

export class WarforgeCitadelZone implements IZone {
    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Warforge Citadel";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Woodcutting in Warforge Citadel";
        body.appendChild(profileText);

        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = "Leave Warforge Citadel";
        backButton.className = "back-button";
        backButton.onclick = () => {
            MessagingBus.publishToZoneChange(null); 
        }
        body.appendChild(backButton);
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    private activityTypes: ReadonlyArray<AdventureActivityType> = [
        AdventureActivityType.WoodCutting,
        AdventureActivityType.Combat
    ].sort();

    getActivityTypes(): ReadonlyArray<AdventureActivityType> {
        return this.activityTypes;
    }
    
    getName(): string {
        return "WarforgeCitadel";
    }

    onGameTick(): void {
        const woodPerTick: number = Utils.randomIntBetween(1, 2);
        
        MessagingBus.publishToResourceChange(Items.getItem(Items.WoodBirchItem).getId(), woodPerTick);
    }
}