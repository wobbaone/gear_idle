import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { IDeletable } from "@COMMONS/utils/deletable";
import { PlayerCharacterData } from "../../../entities/characterData";
import { Enemies } from "../../../enemies/enemies";
import { Container2D, Container2DResult } from "../../utils/container2d";
import { Identifiable } from "@COMMONS/utils/identifiable";
import { HealthData } from "../../../entities/health";
import { Items } from "../../../inventory/items";
import { AdventureActivityType } from "@COMMONS/adventuringActivityType";
import { ZoneManager } from "../zoneManager";


export abstract class AZoneState extends Identifiable implements IDeletable {
    protected players: Container2D<PlayerCharacterData> = new Container2D<PlayerCharacterData>(2, 3);
    protected enemies: Container2D<Enemies.AEnemy> = new Container2D<Enemies.AEnemy>(2, 3);

    protected parentZone: AZone;

    private currentRespawnProgress: number = 0;

    constructor(parentZone: AZone) {
        super();

        this.parentZone = parentZone;
    }

    getBaseZone(): AZone {
        return this.parentZone;
    }

    getZonePlayers(): Container2D<PlayerCharacterData> {
        return this.players;
    }

    getZoneEnemies(): Container2D<Enemies.AEnemy> {
        return this.enemies;
    }

    delete(): void {
    }

    addPlayer(character: PlayerCharacterData): void {
        this.players.set(character, 1, 1);
    }

    onGameTick(): void {
        if (this.enemies.count() === 0) {
            this.currentRespawnProgress += 1;
            if (this.currentRespawnProgress >= this.parentZone.getZoneRespawnTime()) {
                this.currentRespawnProgress = 0;
                this.enemies.set(new Enemies.Boar(), 0, 1);
            } else {
                for (const charData of this.players) {
                    charData.get().getEquipment().eatIfNeeded();
                }
            }

            for (const charData of this.players) {
                const character: PlayerCharacterData = charData.get();
                character.resetActivityProgress();
            }
        } else {
            for (const charData of this.players) {
                const character: PlayerCharacterData = charData.get();
                
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
        }
    }

    playerZoneAction(character: PlayerCharacterData): void {
        const target: Container2DResult<Enemies.AEnemy> | null  = this.enemies.getRandomEntry();
        if (target === null) {
            return;
        }

        const damage: number = character.getEquipment().getAttackDamageVsTarget(target.get());
        
        const targetHealth: HealthData = target.get().getHealth(); 
        targetHealth.dealDamage(damage);
        for (const property of character.getEquipment().allEquippedPropertiesIterator()) {
            property.onHit(character, target.get(), damage);
        }

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
        const target: Container2DResult<PlayerCharacterData> | null  = this.players.getRandomEntry();

        if (target === null) {
            return;
        }

        const targetData: PlayerCharacterData = target.get();

        const targetHealth: HealthData = targetData.getHealth(); 
        targetHealth.dealDamage(damage);

        if (targetHealth.getCurrentHealth() <= 0) {
            targetHealth.setHealth(targetHealth.getMaxHealth());
            targetData.setCurrentZone(null);
            
            MessagingBus.publishToPlayerDeathAction(targetData.getId(), this.getId());
            MessagingBus.publishToZoneChange(targetData.getId(), null);
        }
    }
}

export abstract class AZone {
    abstract getActivityTypes(): ReadonlyArray<AdventureActivityType>
    abstract getName(): string

    abstract createState(): AZoneState

    abstract getZoneRespawnTime(): number

    abstract getZoneType(): ZoneManager.Zone;
}