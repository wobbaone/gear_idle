export class HealthData {
    static DEFAULT_MAX_HEALTH = 10;

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