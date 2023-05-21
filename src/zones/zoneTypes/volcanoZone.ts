import { AdventureActivityType } from "../../activities/adventureActivity";
import { Utils } from "../../utils";
import { IZone } from "./zone";
import { MessagingBus } from "../../messagingBus";
import { Items } from "../../inventory/items";

export class VolcanoZone implements IZone {
    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = this.getName();
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        body.className = "adventuring-zone-"+this.getName();
        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Woodcutting in " + this.getName();
        body.appendChild(profileText);

        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = "Leave " + this.getName() ;
        backButton.className = "back-button";
        backButton.onclick = () => {
            body.className = "";
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
        return "Volcano";
    }

    onGameTick(): void {
        const woodPerTick: number = Utils.randomIntBetween(1, 2);
        
        MessagingBus.publishToResourceChange(Items.getItem(Items.WoodBirchItem).getId(), woodPerTick);
    }
}