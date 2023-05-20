import { AdventureActivityType } from "../activities/adventureActivity";
import { IZone } from "./zone";

export class WildernessZone implements IZone {
    buildDOM(): void {
    }

    clearDOM(): void {
    }

    private activityTypes: ReadonlyArray<AdventureActivityType> = [
        AdventureActivityType.Mining,
        AdventureActivityType.WoodCutting,
        AdventureActivityType.Combat
    ].sort();

    getActivityTypes(): ReadonlyArray<AdventureActivityType> {
        return this.activityTypes;
    }  
    
    getName(): string {
        return "WildernessZone";
    }

    onGameTick(): void {}
}