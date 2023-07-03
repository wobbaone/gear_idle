import { HealthData } from "../../entities/health";
import { Items } from "../../inventory/items";
import { AEnemy, DropEntry } from "../enemy";

export class Boar extends AEnemy {
    constructor() {
        super("Boar", new HealthData(3), 1, 51, "./images/boar.png", [
            new DropEntry(Items.getItem(Items.MeatBoar.Item), 2),
        ]);
    }
}