import { Items } from "../inventory/items";

export class EquipmentData {
    private static DEFAULT_DAMAGE = 1;

    private weapon: Items.IWeapon | null;
    private armor: Items.IArmor | null;
    
    constructor() {
        this.weapon = null;
        this.armor = null;
    }
    
    getAttackDamage(): number {
        if (this.weapon === null) {
            return EquipmentData.DEFAULT_DAMAGE;
        }

        return  this.weapon.attackDamage();
    }

    getAddedHealth(): number {
        if (this.armor === null) {
            return 0;
        }

        return this.armor.getAddedHealth();
    }
}

