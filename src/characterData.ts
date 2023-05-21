import { InventoryData } from "./inventory/inventoryData";
import { ZoneActivityStatus } from "./zones/zoneActivityStatus";
import { Zones } from "./zones/zones";
import { EquipmentData } from "./equipment/equipmentData";

export class CharacterData {
    private inventory: InventoryData;
    private currentZoneActivity: ZoneActivityStatus;
    private equipment: EquipmentData;
    private health: HealthData;

    constructor() {
        this.inventory = new InventoryData();
        this.currentZoneActivity = new ZoneActivityStatus();
        this.equipment = new EquipmentData();
        this.health = new CharacterHealthData(this);
    }

    getInventory(): InventoryData {
        return this.inventory;
    }

    getEquipment(): EquipmentData {
        return this.equipment
    }

    getHealth(): HealthData {
        return this.health;
    }

    getCurrentZoneActivity(): ZoneActivityStatus {
        return this.currentZoneActivity;
    }

    setCurrentZone(zone: Zones.IZone | null): void {
        this.currentZoneActivity = new ZoneActivityStatus(zone);
    }
}

export class HealthData {
    protected currentHealth: number;
    protected maxHealth: number;

    constructor(maxHealth: number) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
    }

    getCurrentHealth(): number {
        return this.currentHealth;
    }

    getMaxHealth(): number {
        return this.maxHealth;
    } 
}

export class CharacterHealthData extends HealthData{
    protected static DEFAULT_MAX_HEALTH = 10;

    private parent: CharacterData;

    constructor(parent: CharacterData) {
        super(CharacterHealthData.DEFAULT_MAX_HEALTH);
            
        this.parent = parent;
    }

    getMaxHealth(): number {
        return this.maxHealth + this.parent.getEquipment().getAddedHealth();
    } 
}