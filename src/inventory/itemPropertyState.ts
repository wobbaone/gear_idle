import { ABattleEntity } from "../entities/battleEntity";
import { AItemProperty } from "./items/itemProperty";
import { PlayerCharacterData } from "../entities/characterData";

export abstract class AItemPropertyState {
    protected parent: AItemProperty;

    constructor(parent: AItemProperty) {
        this.parent = parent;
    }

    getData(): AItemProperty {
        return this.parent;
    }
  
    addedFlatDamage(owner: ABattleEntity, target: ABattleEntity): number {
        return 0;
    } 
    modifyAttackDamageBy(owner: ABattleEntity, target: ABattleEntity, baseDamage: number): number {
        return 0;
    } 
    onHit(owner: ABattleEntity, target: ABattleEntity, damage: number): void {}

    modifyRecievedAttackDamageBy(owner: ABattleEntity, attacker: ABattleEntity, baseDamage: number): number {
        return 0;
    }
    onRecieveHit(owner: ABattleEntity, attacker: ABattleEntity, damage: number): void {}

    onCook(owner: PlayerCharacterData): void {}
    onEat(owner: PlayerCharacterData): void {}
    shouldEat(owner: PlayerCharacterData): boolean {
        return false;
    }

    addedFlatHealth(owner: ABattleEntity): number {
        return 0;
    }
    modifyExtraHealthBy(owner: ABattleEntity, baseHealth: number): number {
        return 0;
    }
}
export abstract class ATypedPropertyState<T extends AItemProperty> extends AItemPropertyState {
    protected typedParent: T;

    constructor(parent: T) {
        super(parent);
        this.typedParent = parent;
    }

    getTypedData(): T {
        return this.typedParent;
    }
}

export class BlankPropertyState extends AItemPropertyState {}