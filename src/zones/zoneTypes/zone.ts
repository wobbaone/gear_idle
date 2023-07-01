import { AdventureActivityType } from "../../activities/adventureActivity";
import { MessagingBus } from "../../utils/messagingBus";
import { IRenderer } from "../../renderers/renderer";
import { Utils } from "../../utils/utils";
import { IDeletable } from "../../utils/deletable";
import { CharacterData } from "../../entities/characterData";
import { Enemies } from "../../enemies/enemies";
import { HTMLContainer } from "../../utils/htmlContainer";
import { Container2D, Container2DResult } from "../../utils/container2d";
import { Identifiable } from "../../utils/identifiable";
import { HealthData } from "../../entities/health";
import { Items } from "../../inventory/items";


export abstract class AZoneRenderer extends Identifiable implements IRenderer, IDeletable {
    protected players: Container2D<CharacterData> = new Container2D<CharacterData>(2, 3);
    protected enemies: Container2D<Enemies.AEnemy> = new Container2D<Enemies.AEnemy>(2, 3);

    protected parentZone: AZone;
    protected zoneContent: HTMLContainer | null = null;

    protected zoneActionListener: MessagingBus.Subscription<MessagingBus.ExecuteZoneActionEvent>;

    private activityProgressListener: MessagingBus.Subscription<MessagingBus.ActivityProgressEvent>;

    private shouldRedraw: boolean = false;

    private currentRespawnProgress: number = 0;

    constructor(parentZone: AZone, zoneActionListener: MessagingBus.Subscription<MessagingBus.ExecuteZoneActionEvent>) {
        super();

        this.parentZone = parentZone;
       
        this.zoneActionListener = zoneActionListener;

        this.activityProgressListener = MessagingBus.subscribeToAddActivityProgress((entityId: number, amount: number) => {
            if (amount > 0) {
                this.shouldRedraw = true;
            }
        }, 1000);
    }

    abstract buildDOM(): void 


    delete(): void {
        this.clearDOM();
        this.activityProgressListener.unsubscribe();
        this.zoneActionListener.unsubscribe();
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    addPlayer(character: CharacterData): void {
        this.players.set(character, 1, 1);
    }

    onGameTick(): void {
        for (const charData of this.players) {
            const character: CharacterData = charData.get();

            MessagingBus.publishToAddActivityProgress(character.getId(), 1);

            if (character.addActivityProgress(1)) {
                MessagingBus.publishToExecuteZoneAction(character.getId(), this.getId());

                this.playerZoneAction(character);
            }
        }

        for (const enemyData of this.enemies) {
            const enemy: Enemies.AEnemy = enemyData.get();

            MessagingBus.publishToAddActivityProgress(enemy.getId(), 1);  
            
            if (enemy.addActivityProgress(1)) {
                MessagingBus.publishToExecuteZoneAction(enemy.getId(), this.getId());

                this.enemyZoneAction(enemy);
            }
        }
        
        if (this.enemies.count() === 0) {
            this.currentRespawnProgress += 1;
            if (this.currentRespawnProgress >= this.parentZone.getZoneRespawnTime()) {
                this.currentRespawnProgress = 0;
                this.enemies.set(new Enemies.Boar(), 0, 1);
            }    
        }

        if (this.shouldRedraw) {
            this.updateZoneContent();
            this.shouldRedraw = false;
        }
    }

    playerZoneAction(character: CharacterData): void {
        const damage: number = character.getEquipment().getAttackDamage();
        const target: Container2DResult<Enemies.AEnemy> | null  = this.enemies.getRandomEntry();

        if (target === null) {
            return;
        }

        const targetHealth: HealthData = target.get().getHealth(); 
        targetHealth.dealDamage(damage);

        if (targetHealth.getCurrentHealth() <= 0) {
            const itemDrop: Items.Entry | null = target.get().getRandomDropItem();
            if (itemDrop !== null) {
                MessagingBus.publishToResourceChange(character.getId(), itemDrop.getId(), 1);
            }

            this.enemies.set(null, target.getX(), target.getY());
        }
    }

    enemyZoneAction(enemy: Enemies.AEnemy): void {
        const damage: number = enemy.getAttackDamage();
        const target: Container2DResult<CharacterData> | null  = this.players.getRandomEntry();

        if (target === null) {
            return;
        }

        const targetHealth: HealthData = target.get().getHealth(); 
        targetHealth.dealDamage(damage);

        if (targetHealth.getCurrentHealth() <= 0) {
            console.log("player died");
        }
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

        for (let y: number = 0; y < 3; y++) {
            const fightRow: HTMLContainer = this.zoneContent.createOrFindElement("div", "fightRow"+y);
            fightRow.getElement().className = "fight-content-row";

            for (let x: number = 0; x < 2; x++) {
                const player: (CharacterData | null) = this.players.get(x, y);
                if (player === null) {
                    this.drawEmptySquare(fightRow, y * 5 + x);
                } else {
                    this.drawPlayer(fightRow, "Player", player, y * 5 + x);
                }
            }

            this.drawEmptySquare(fightRow, y * 5 + 2);

            for (let x: number = 0; x < 2; x++) {
                const enemy: (Enemies.AEnemy | null) = this.enemies.get(x, y);
                if (enemy === null) {
                    this.drawEmptySquare(fightRow, y * 5 + x + 3);
                } else {
                    this.drawEnemy(fightRow, enemy, y * 5 + x + 3);
                }
            }
        }
    }
}

export abstract class AZone {
    abstract getActivityTypes(): ReadonlyArray<AdventureActivityType>
    abstract getName(): string

    abstract createState(): AZoneRenderer

    abstract getZoneRespawnTime(): number

    clearDOM(): void {
        Utils.clearAllDOM();
    }
}