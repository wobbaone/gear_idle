import { AdventureActivityType } from "../activities/adventureActivity";
import { MessagingBus } from "../messagingBus";
import { Utils } from "../utils";
import { IZone } from "./zone";

export class CavesZone implements IZone {
    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Caves";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Mining in caves";
        body.appendChild(profileText);

        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = "Leave caves";
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
        
        MessagingBus.publishToResourceChange(0, orePerTick);
    }
}