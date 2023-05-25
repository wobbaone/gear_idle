import { AdventureActivityType } from "../../activities/adventureActivity";
import { HealthData } from "../../characterData";
import { Enemies } from "../../enemies/enemies";
import { MessagingBus } from "../../messagingBus";
import { Player } from "../../player";
import { Utils } from "../../utils";
import { IZone } from "./zone";

export class WildernessZone implements IZone {
    private enemy: Enemies.AEnemy;

    constructor() {
        this.enemy = new Enemies.Boar();
    }

    buildDOM(): void {
        this.clearDOM();

        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Wilderness";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const adContainer: HTMLDivElement = document.createElement("div");
        adContainer.className = "adventuring-zone-container adventuring-zone-"+this.getName();
        body.appendChild(adContainer);

        const content: HTMLDivElement = document.createElement("div");
        content.className = "adventuring-zone-content";
        adContainer.appendChild(content);

        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Fighting in the wilderness";
        content.appendChild(profileText);

        const fightElement: HTMLDivElement = document.createElement("div");
        fightElement.className = "fight-content";
        
        const playerDiv: HTMLDivElement = this.drawFighter("Player", Player.getCharacterData().getHealth());
        fightElement.appendChild(playerDiv);

        const enemyDiv: HTMLDivElement = this.drawFighter(this.enemy.getName(), this.enemy.getHealth());
        fightElement.appendChild(enemyDiv);


        content.appendChild(fightElement);

        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = "Leave Wild";
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
        AdventureActivityType.WoodCutting,
        AdventureActivityType.Combat
    ].sort();

    getActivityTypes(): ReadonlyArray<AdventureActivityType> {
        return this.activityTypes;
    }  
    
    getName(): string {
        return "Wilds";
    }

    onGameTick(): void {
        
    }
    
    drawFighter(name: string, health: HealthData): HTMLDivElement {
        const playerDiv: HTMLDivElement = document.createElement("div");
        playerDiv.className = "fighter-element";
        
        const nameSpan: HTMLSpanElement = document.createElement("span");
        nameSpan.innerHTML = name;
        playerDiv.appendChild(nameSpan);

        const healthspan: HTMLSpanElement = document.createElement("span");
        healthspan.innerHTML = health.getCurrentHealth() + "/" + health.getMaxHealth();
        playerDiv.appendChild(healthspan);

        const imageElement: HTMLImageElement = document.createElement("img");
        imageElement.src = "./images/boar.png";
        imageElement.className = "monster"
        playerDiv.appendChild(imageElement);

        return playerDiv;
    }
}