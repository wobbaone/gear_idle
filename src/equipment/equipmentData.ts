import { ABattleEntity } from "../entities/battleEntity";
import { AItemPropertyState } from "../inventory/itemPropertyState";
import { ItemState } from "../inventory/itemState";
import { Items } from "../inventory/items";
import { EdibleProperty } from "../inventory/items/itemProperties/edibleProperty";
import { PlayerCharacterData } from "../entities/characterData";
import { StackableProperty, StackablePropertyState } from "../inventory/items/itemProperties/stackableProperty";

export class EquipmentData {
    private static DEFAULT_DAMAGE = 1;

    private owner: PlayerCharacterData; 

    private weapon: ItemState | null;
    private armor: ItemState | null;
    private food: ItemState | null;

    private allEquipped: ItemState[];
    
    constructor(owner: PlayerCharacterData) {
        this.weapon = null;
        this.armor = null;
        this.food = null;

        this.owner = owner;

        this.allEquipped = [];
    }

    getWeapon(): ItemState | null {
        return this.weapon;
    }

    getArmor(): ItemState | null {
        return this.armor;
    }

    equipWeapon(weapon: ItemState): void {
        this.weapon = weapon;

        this.rebuildEquipmentList();
    }

    equipArmor(armor: ItemState): void {
        this.armor = armor;

        this.rebuildEquipmentList();
    }

    equipFood (food: ItemState): void {
        if (food.hasPropertyStateWithTag(EdibleProperty.TAG)) {
            this.food = food;
        }
    }

    private rebuildEquipmentList(): void {
        this.allEquipped.length = 0;
        
        if (this.weapon !== null) {
            this.allEquipped.push(this.weapon)
        }

        if (this.armor !== null) {
            this.allEquipped.push(this.armor)
        }
    }

    eatIfNeeded(): boolean {
        if (this.food === null) {
            return false;
        }

        for (const edibleItem of this.food.getPropertyStatesWithTag(EdibleProperty.TAG)) {
            if (edibleItem.shouldEat(this.owner)) {
                edibleItem.onEat(this.owner);

                const stackableProperties: AItemPropertyState[] = this.food.getPropertyStatesWithTag(StackableProperty.TAG)
                for (const property of stackableProperties) {
                    if (property instanceof StackablePropertyState) {
                        property.setCount(property.getCount() - 1);

                        if (property.getCount() <= 0) {
                            this.food = null;
                        }
                    }
                }

                return true;
            }
        }

        return false;
    }

    getAttackDamageVsTarget(target: ABattleEntity): number {
        let flatDamage: number = EquipmentData.DEFAULT_DAMAGE;
        for(const state of this.allEquippedPropertiesIterator()) {
            flatDamage += state.addedFlatDamage(this.owner, target);       
        }
        
        let modifiedExtraDamage: number = 0;
        for(const state of this.allEquippedPropertiesIterator()) {
            modifiedExtraDamage += state.modifyAttackDamageBy(this.owner, target, flatDamage);
        }

        return flatDamage + modifiedExtraDamage;
    }

    getAllEquipped(): ItemState[] {
        return this.allEquipped;
    }

    allEquippedPropertiesIterator(): IterablePropertyData {
        return new IterablePropertyData(this);
    }
}

class IterablePropertyData implements Iterable<AItemPropertyState> {
    private parent: EquipmentData;

    constructor(parent: EquipmentData) {
        this.parent = parent;
    }

    [Symbol.iterator](): Iterator<AItemPropertyState> {
        return new PropertyIterator(this.parent.getAllEquipped());
    }
    
}
class PropertyIterator implements Iterator<AItemPropertyState> {
    private equipmentPointer: number = 0;
    private propertyPointer: number = 0;
    private data: ItemState[];

    constructor(data: ItemState[]) {
        this.data = data;
    }

    next(): IteratorResult<AItemPropertyState> {
        while (this.equipmentPointer < this.data.length) {
            const currentItem: ItemState = this.data[this.equipmentPointer];
            const properties: AItemPropertyState[] = currentItem.getPropertyStates();
            if (this.propertyPointer >= properties.length) {
                this.equipmentPointer += 1;
                continue;
            }

            const currentProperty: AItemPropertyState = properties[this.propertyPointer++];
            return new class implements IteratorYieldResult<AItemPropertyState> {
                done: false = false;
                value: AItemPropertyState = currentProperty;
            }();
        }    

        return new class implements IteratorReturnResult<null> {
            done: true = true;
            value: null = null;
        }();
    }
}

