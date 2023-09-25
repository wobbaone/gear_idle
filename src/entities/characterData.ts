import { InventoryData } from "../inventory/inventoryData";
import { EquipmentData } from "../equipment/equipmentData";
import { ABattleEntity } from "./battleEntity";

export class PlayerCharacterData extends ABattleEntity {
    private static DEFAULT_ACTIVITY_TIME = 30;

    private inventory: InventoryData;
    private equipment: EquipmentData;

    constructor() {
        super();

        this.inventory = new InventoryData(this.getId());
        this.equipment = new EquipmentData(this);
    }

    getInventory(): InventoryData {
        return this.inventory;
    }

    getEquipment(): EquipmentData {
        return this.equipment;
    }

    getMaxHealth(): number {
        let flatHealth: number = super.getMaxHealth();
        for (const property of this.getEquipment().allEquippedPropertiesIterator()) {
            flatHealth += property.addedFlatHealth(this);        
        }

        let extraModifiedHealth = 0;
        for (const property of this.getEquipment().allEquippedPropertiesIterator()) {
            extraModifiedHealth += property.modifyExtraHealthBy(this, flatHealth);    
        }

        return flatHealth + extraModifiedHealth;
    }

    getActivityThreshold(): number {
        return PlayerCharacterData.DEFAULT_ACTIVITY_TIME;
    }
}

