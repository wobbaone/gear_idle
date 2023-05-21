import { HealthData } from "../../characterData";
import { Items } from "../../inventory/items";
import { AEnemy, DropEntry } from "../enemy";

export class Boar extends AEnemy {
    constructor() {
        super("Boar", new HealthData(3), 1, [
            new DropEntry(null, 3),
            new DropEntry(Items.getItem(Items.MeatBoarItem), 2),
        ]);
    }
}