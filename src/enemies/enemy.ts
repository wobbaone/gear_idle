import { ABattleEntity } from "../entities/battleEntity";
import { HealthData } from "../entities/health";
import { Items } from "../inventory/items";

export abstract class AEnemy extends ABattleEntity {
    private name: string;
    private attackDamage: number;
    private activityThreshold: number;
    private dropTable: DropEntry[];
    private imgSrc : string;

    constructor(name: string, healthData: HealthData, attackDamage: number, activityThreshold: number, imgSrc: string, dropTable: DropEntry[]) {
        super(healthData);

        this.name = name;
        this.attackDamage = attackDamage;
        this.activityThreshold = activityThreshold;
        this.dropTable = dropTable.sort((a: DropEntry, b: DropEntry) => {
            return a.getWeight() - b. getWeight();
        });

        this.imgSrc = imgSrc;
    }
    
    getName(): string {
        return this.name;
    }

    getAttackDamage(): number {
        return this.attackDamage;
    }

    getRandomDropItem(): Items.Entry | null {
        let dropRoll: number = Math.random() * this.getMaxItemDropWeight();

        for (let i = 0; i < this.dropTable.length; i++) {
            const drop: DropEntry = this.dropTable[i];
            if (dropRoll < drop.getWeight()) {
                return drop.getItem();
            }

            dropRoll -= drop.getWeight();
        }

        return null;
    }

    getMaxItemDropWeight(): number {
        let weight = 0;
        for (let i = 0; i < this.dropTable.length; i++) {
            weight += this.dropTable[i].getWeight();
        } 

        return weight;
    }

    getImageSource(): string {
        return this.imgSrc;
    }

    getActivityThreshold(): number {
        return this.activityThreshold;
    }
}

export class DropEntry {
    private item: Items.Entry | null;
    private weight: number;

    constructor(item: Items.Entry | null, weight: number) {
        this.item = item;
        this.weight = weight;
    }

    getItem() {
        return this.item;
    }

    getWeight() {
        return this.weight;
    }
}