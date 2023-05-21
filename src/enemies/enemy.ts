import { HealthData } from "../characterData";
import { Items } from "../inventory/items";
import { Utils } from "../utils";

export abstract class AEnemy {
    private name: string;
    private healthData: HealthData;
    private attackDamage: number;
    private dropTable: DropEntry[];

    constructor(name: string, healthData: HealthData, attackDamage: number, dropTable: DropEntry[]) {
        this.name = name;
        this.healthData = healthData;
        this.attackDamage = attackDamage;
        this.dropTable = dropTable.sort((a: DropEntry, b: DropEntry) => {
            return a.getWeight() - b. getWeight();
        });
    }
    
    getName(): string {
        return this.name;
    }

    getHealth(): HealthData {
        return this.healthData;
    }

    getAttackDamage(): number {
        return this.attackDamage;
    }

    getRandomDropItem(): Items.Entry | null {
        let dropRoll: number = Math.random() * this.getMaxWeight();

        for (let i = 0; i < this.dropTable.length; i++) {
            const drop: DropEntry = this.dropTable[i];
            if (dropRoll < drop.getWeight()) {
                return drop.getItem();
            }

            dropRoll -= drop.getWeight();
        }

        return null;
    }

    getMaxWeight(): number {
        let weight = 0;
        for (let i = 0; i < this.dropTable.length; i++) {
            weight += this.dropTable[i].getWeight();
        } 

        return weight;
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