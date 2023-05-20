import { InventoryData } from "./inventory/inventoryData";
import { ZoneActivityStatus } from "./zones/zoneActivityStatus";
import { IZone } from "./zones/zone";
import { EquipmentData } from "./equipment/equipmentData";

export class CharacterData {
    private inventory: InventoryData;
    private currentZoneActivity: ZoneActivityStatus;
    private equipment: EquipmentData;

    constructor() {
        this.inventory = new InventoryData();
        this.currentZoneActivity = new ZoneActivityStatus();
        this.equipment = new EquipmentData();
    }

    getInventory(): InventoryData {
        return this.inventory;
    }

    getEquipment(): EquipmentData {
        return this.equipment
    }

    getCurrentZoneActivity(): ZoneActivityStatus {
        return this.currentZoneActivity;
    }

    setCurrentZone(zone: IZone | null): void {
        this.currentZoneActivity = new ZoneActivityStatus(zone);
    }
}