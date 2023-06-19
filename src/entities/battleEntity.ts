import { AZoneRenderer } from "../zones/zoneIndex";
import { ZoneManager } from "../zones/zones";
import { HealthData } from "./health";

export abstract class ABattleEntity {
    private static lastId: number = 0;
    private id: number;

    protected health: HealthData;
    protected activityProgress: number;
    protected currentZoneId: number | null;
    
    constructor(health?: HealthData) {
        if (health === undefined) {
            this.health = new HealthData(HealthData.DEFAULT_MAX_HEALTH);
        } else {
            this.health = health;
        }

        this.activityProgress = 0;
        this.currentZoneId = null;
        this.id = ++ABattleEntity.lastId;
    }

    abstract getActivityThreshold(): number;

    getId(): number {
        return this.id;
    }

    getHealth(): HealthData {
        return this.health;
    }

    getMaxHealth(): number {
        return this.health.getMaxHealth();
    }

    getCurrentActivityProgress(): number {
        return this.activityProgress;
    }

    getZoneId(): number | null {
        return this.currentZoneId;
    }

    getCurrentZoneActivity(): AZoneRenderer | null {
        if (this.currentZoneId === null) {
            return null;
        }

        return ZoneManager.GetZone(this.currentZoneId);
    }

    setCurrentZone(zoneId: number | null): void {
        this.currentZoneId = zoneId;
    }

    // returns whether we should do the resulting activity
    addActivityProgress(progress: number): boolean {
        this.activityProgress += progress;
        
        if (this.activityProgress < this.getActivityThreshold()) {
            return false;
        }

        this.activityProgress = 0;
        return true;
    }
}