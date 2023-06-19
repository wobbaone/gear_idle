import { AdventureActivityType } from "../../activities/adventureActivity";
import { MessagingBus } from "../../utils/messagingBus";
import { IRenderer } from "../../renderers/renderer";
import { Utils } from "../../utils/utils";
import { IDeletable } from "../../utils/deletable";
import { ZoneManager } from "../zones";
import { CharacterData } from "../../entities/characterData";
import { Enemies } from "../../enemies/enemies";
import { HTMLContainer } from "../../utils/htmlContainer";


export abstract class AZoneRenderer implements IRenderer, IDeletable {
    protected players: (CharacterData | null)[][] = [[null, null], [null, null], [null, null]];
    protected enemies: (Enemies.AEnemy | null)[][] = [[null, null], [null, null], [null, null]];

    protected parentZone: AZone;
    protected zoneContent: HTMLContainer | null = null;

    protected zoneActionListener: MessagingBus.Subscription<MessagingBus.ExecuteZoneActionEvent>;

    private activityProgressListener: MessagingBus.Subscription<number>;
    private id: number | null = null;

    constructor(parentZone: AZone, zoneActionListener: MessagingBus.Subscription<MessagingBus.ExecuteZoneActionEvent>) {
        this.parentZone = parentZone;
       
        this.zoneActionListener = zoneActionListener;

        this.activityProgressListener = MessagingBus.subscribeToAddActivityProgress((activityProgress: number) => {
            this.updateZoneContent();
        }, 1000)
    }

    abstract buildDOM(): void 
    
    setId(id: number): void {
        this.id = id;
    }

    getId(): number | null {
        return this.id;
    }

    delete(): void {
        this.clearDOM();
        this.activityProgressListener.unsubscribe();
        this.zoneActionListener.unsubscribe();
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    addPlayer(character: CharacterData): void {
        this.players[0][0] = character;
    }

    onGameTick(): void {
        MessagingBus.publishToAddActivityProgress(1);
    }

    protected createZoneHeaderElement(name: string): HTMLDivElement {
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = name;
        return headerText;
    }

    protected createBackButton(text: string): HTMLDivElement {
        const backButton: HTMLDivElement = document.createElement("div");
        backButton.innerHTML = text;
        backButton.className = "back-button";
        backButton.onclick = () => {
            MessagingBus.publishToZoneChange(null); 
        }
        return backButton;
    }

    protected createParentContainer(): HTMLDivElement {
        const parentContainer: HTMLDivElement = document.createElement("div");
        parentContainer.className = "adventuring-zone-container adventuring-zone-" + this.parentZone.getName();

        return parentContainer;
    }

    protected createContentContainer(): HTMLDivElement {
        const contentContainer: HTMLDivElement = document.createElement("div");
        contentContainer.className = "adventuring-zone-content";

        return contentContainer;
    }

    protected createZoneContentContainer(): HTMLContainer {
        const zoneContent: HTMLDivElement = document.createElement("div");
        zoneContent.className = "fight-content-column";
        
        return new HTMLContainer(zoneContent);
    }

    protected drawPlayer(parent: HTMLContainer, name: string, data: CharacterData, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";
        
        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = name;

        const healthData = data.getHealth();
        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource("./images/player.png");
        imageElement.getElement().className = "player";

        return elementDiv;
    }

    protected drawEmptySquare(parent: HTMLContainer, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";
        
        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = "";

        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = "";

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource("./images/blankSlot.png");
        imageElement.getElement().className = "blank"; 

        return elementDiv;
    }

    protected drawEnemy(parent: HTMLContainer, enemy: Enemies.AEnemy, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";
        
        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = enemy.getName();

        const healthData = enemy.getHealth();
        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource(enemy.getImageSource());
        imageElement.getElement().className = "monster";   

        return elementDiv;
    }

    protected updateZoneContent(): void { 
        if (this.zoneContent === null) {
            return
        }

        for (let i: number = 0; i < 3; i++) {
            const fightRow: HTMLContainer = this.zoneContent.createOrFindElement("div", "fightRow"+i);
            fightRow.getElement().className = "fight-content-row";

            const player1: (CharacterData | null) = this.players[i][0];
            if (player1 === null) {
                this.drawEmptySquare(fightRow, i * 5);
            } else {
                this.drawPlayer(fightRow, "Player", player1, i * 5);
            }

            const player2 = this.players[i][1];
            if (player2 === null) {
                this.drawEmptySquare(fightRow, i * 5 + 1);
            } else {
                this.drawPlayer(fightRow, "Player", player2, i * 5 + 1);
            }

            this.drawEmptySquare(fightRow, i * 5 + 2);

            const enemy1 = this.enemies[i][0];
            if (enemy1 === null) {
                this.drawEmptySquare(fightRow, i * 5 + 3);
            } else {
                this.drawEnemy(fightRow, enemy1, i * 5 + 3);
            }

            const enemy2 = this.enemies[i][1];
            if (enemy2 === null) {
                this.drawEmptySquare(fightRow, i * 5 + 4);
            } else {
                this.drawEnemy(fightRow, enemy2, i * 5 + 4);
            }
        }
    }
}

export abstract class AZone {
    abstract getActivityTypes(): ReadonlyArray<AdventureActivityType>
    abstract getName(): string

    abstract createState(): AZoneRenderer

    clearDOM(): void {
        Utils.clearAllDOM();
    }
}