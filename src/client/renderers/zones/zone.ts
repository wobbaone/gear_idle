import { IRenderer } from "@CLIENT/renderers/renderer"; 
import { HTMLContainer } from "@CLIENT/utils/htmlContainer";
import { Utils } from "@CLIENT/utils/utils";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { PlayerCharacterData } from "@/entities/characterData";
import { IDeletable } from "@COMMONS/utils/deletable";
import { AZoneState } from "@COMMONS/zones/zoneTypes/zone";
import { Enemies } from "@/enemies/enemies";
import { Container2D } from "@COMMONS/utils/container2d";
import { Client } from "@CLIENT/client";
import { ZoneManager } from "@COMMONS/zones/zoneManager";
import { Caves } from "./caveZone";
import { Wilderness } from "./wildernessZone";
import { Woods } from "./woodsZone";

export abstract class AZoneRenderer implements IDeletable, IRenderer {   
    protected zoneState: AZoneState;
    protected zoneContent: HTMLContainer | null = null;
    
    private activityProgressListener: MessagingBus.Subscription<MessagingBus.ActivityProgressEvent>;

    private shouldRedraw: boolean = false;

    abstract buildDOM(): void 

    constructor(zoneState: AZoneState) {    
        this.zoneState = zoneState;

        this.activityProgressListener = MessagingBus.subscribeToAddActivityProgress((entityId: number, amount: number) => {
            if (amount > 0) {
                this.shouldRedraw = true;
            }
        }, 1000);
    }

    delete(): void {
        this.clearDOM();
        this.activityProgressListener.unsubscribe();
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    onGameTick(): void {     
        if (this.shouldRedraw) {
            this.updateZoneContent();
            this.shouldRedraw = false;
        }
    }

    protected buildBasicDOM(backButtonTitle: string): void {
        this.clearDOM();

        Utils.getHeaderDiv().appendChild(this.createZoneHeaderElement(this.zoneState.getBaseZone().getName()));

        const body: HTMLElement = Utils.getContentDiv();
        const parentContainer = this.createParentContainer();

        const contentContainer: HTMLDivElement = this.createContentContainer();
        parentContainer.appendChild(contentContainer);
    
        this.zoneContent = this.createZoneContentContainer();   
        contentContainer.appendChild(this.zoneContent.getElement());

        this.updateZoneContent();

        parentContainer.appendChild(this.createBackButton(backButtonTitle));
        body.appendChild(parentContainer);
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
            MessagingBus.publishToZoneChangeRequestAction(Client.getCharacterData().getId(), null); 
        }
        return backButton;
    }

    protected createParentContainer(): HTMLDivElement {
        const parentContainer: HTMLDivElement = document.createElement("div");
        parentContainer.className = "adventuring-zone-container adventuring-zone-" + this.zoneState.getBaseZone().getName();

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

    protected drawPlayer(parent: HTMLContainer, name: string, data: PlayerCharacterData, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource("./images/player.png");
        imageElement.getElement().className = "player";

        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = name;

        const healthData = data.getHealth();
        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();

        const progressBar: HTMLContainer = elementDiv.createOrFindElement("progress", "progressElement");
        const progressBarElement: HTMLProgressElement =  progressBar.getTypedElement<HTMLProgressElement>();
        progressBarElement.value = data.getCurrentActivityProgress() / data.getActivityThreshold();
        progressBarElement.hidden = false;

        return elementDiv;
    }

    protected drawEmptySquare(parent: HTMLContainer, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource("./images/blankSlot.png");
        imageElement.getElement().className = "blank"; 
         
        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = "";

        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = "";

        const progressBar: HTMLContainer = elementDiv.createOrFindElement("progress", "progressElement");
        progressBar.getElement().hidden = true;

        return elementDiv;
    }

    protected drawEnemy(parent: HTMLContainer, enemy: Enemies.AEnemy, elementindex: number): HTMLContainer {
        const elementDiv: HTMLContainer = parent.createOrFindElement("div", "elementDiv" + elementindex);
        elementDiv.getElement().className = "fighter-element";

        const imageElement: HTMLContainer = elementDiv.createOrFindElement("img", "imageElement");
        imageElement.setImageSource(enemy.getImageSource());
        imageElement.getElement().className = "monster";   

        const nameSpan: HTMLContainer = elementDiv.createOrFindElement("span", "nameSpan");
        nameSpan.getElement().innerHTML = enemy.getName();

        const healthData = enemy.getHealth();
        const healthSpan: HTMLContainer = elementDiv.createOrFindElement("span", "healthSpan");
        healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();

        const progressBar: HTMLContainer = elementDiv.createOrFindElement("progress", "progressElement");
        const progressBarElement: HTMLProgressElement =  progressBar.getTypedElement<HTMLProgressElement>();
        progressBarElement.value = enemy.getCurrentActivityProgress() / enemy.getActivityThreshold();
        progressBarElement.hidden = false;

        return elementDiv;
    }

    protected updateZoneContent(): void { 
        if (this.zoneContent === null) {
            return
        }

        const players: Container2D<PlayerCharacterData> = this.zoneState.getZonePlayers();
        const enemies: Container2D<Enemies.AEnemy> = this.zoneState.getZoneEnemies();

        for (let y: number = 0; y < 3; y++) {
            const fightRow: HTMLContainer = this.zoneContent.createOrFindElement("div", "fightRow"+y);
            fightRow.getElement().className = "fight-content-row";

            for (let x: number = 0; x < 2; x++) {
                const player: (PlayerCharacterData | null) = players.get(x, y);
                if (player === null) {
                    this.drawEmptySquare(fightRow, y * 5 + x);
                } else {
                    this.drawPlayer(fightRow, "Player", player, y * 5 + x);
                }
            }

            this.drawEmptySquare(fightRow, y * 5 + 2);

            for (let x: number = 0; x < 2; x++) {
                const enemy: (Enemies.AEnemy | null) = enemies.get(x, y);
                if (enemy === null) {
                    this.drawEmptySquare(fightRow, y * 5 + x + 3);
                } else {
                    this.drawEnemy(fightRow, enemy, y * 5 + x + 3);
                }
            }
        }
    }
}

export namespace ZoneRenderer {
    export function createRenderer(state: AZoneState): AZoneRenderer {
        const zoneType: ZoneManager.Zone = state.getBaseZone().getZoneType();
        switch(zoneType) {
            case ZoneManager.Zone.Cave:
                return new Caves.Renderer(state);
            case ZoneManager.Zone.Wilderness:
                return new Wilderness.Renderer(state); 
            case ZoneManager.Zone.Woods:
                return new Woods.Renderer(state);
            default:
                console.error("Unimplemented zone (" + ZoneManager.Zone[zoneType] + ") when creating a zone renderer");
                return new EmptyZoneRenderer(state);
        }
    }

    class EmptyZoneRenderer extends AZoneRenderer {
        buildDOM(): void {}  
    }
}