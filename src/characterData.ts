import { InventoryData } from "./inventory/inventoryData";
import { ZoneActivityStatus } from "./zones/zoneActivityStatus";
import { IZone } from "./zones/zone";

export class CharacterData {
    private inventory: InventoryData;
    private currentZoneActivity: ZoneActivityStatus;

    constructor() {
        this.inventory = new InventoryData();
        this.currentZoneActivity = new ZoneActivityStatus();
    }

    getInventory(): InventoryData {
        return this.inventory;
    }

    getCurrentZoneActivity(): ZoneActivityStatus {
        return this.currentZoneActivity;
    }

    setCurrentZone(zone: IZone | null): void {
        this.currentZoneActivity = new ZoneActivityStatus(zone);
    }
}