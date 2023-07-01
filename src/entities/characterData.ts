import { InventoryData } from "../inventory/inventoryData";
import { EquipmentData } from "../equipment/equipmentData";
import { ABattleEntity } from "./battleEntity";

export class CharacterData extends ABattleEntity {
    private static DEFAULT_ACTIVITY_TIME = 30;

    private inventory: InventoryData;
    private equipment: EquipmentData;

    constructor() {
        super();

        this.inventory = new InventoryData(this.getId());
        this.equipment = new EquipmentData();
    }

    getInventory(): InventoryData {
        return this.inventory;
    }

    getEquipment(): EquipmentData {
        return this.equipment;
    }

    getMaxHealth(): number {
        return super.getMaxHealth() + this.getEquipment().getAddedHealth();
    }

    getActivityThreshold(): number {
        return CharacterData.DEFAULT_ACTIVITY_TIME;
    }
}

