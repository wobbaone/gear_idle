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

    dealDamage(amount: number): void {
        this.currentHealth -= amount;

        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }
    }

    healDamage(amount: number): void {
        this.currentHealth += amount;

        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }

    setHealth(amount: number): void {
        this.currentHealth = amount;

        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }
    }
}