import { HealthData } from "./health";
import { Identifiable } from "../commons/utils/identifiable";

export abstract class ABattleEntity extends Identifiable{    
    protected health: HealthData;
    protected activityProgress: number;
    protected currentZoneId: number | null;
    
    constructor(health?: HealthData) {
        super();

        if (health === undefined) {
            this.health = new HealthData(HealthData.DEFAULT_MAX_HEALTH);
        } else {
            this.health = health;
        }

        this.activityProgress = 0;
        this.currentZoneId = null;
    }

    abstract getActivityThreshold(): number;

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

    resetActivityProgress(): void {
        this.activityProgress = 0;
    }
}