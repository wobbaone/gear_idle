import { AdventureActivity } from "../activities/adventureActivity";
import { Player } from "../player";
import { Zones } from "../zones/zones";
import { IRenderer } from "./renderer";

export class ActiveAdventuringRenderer implements IRenderer {  
    private parent: AdventureActivity;

    constructor(adventureActivity: AdventureActivity)  {
        this.parent = adventureActivity;
    }

    buildDOM(): void {
        const zone: Zones.AZoneRenderer | null = Player.getCurrentZoneActivity();
        if (zone === null) {
            return;
        }

        zone.buildDOM();
    }

    clearDOM(): void {
        const zone: Zones.AZoneRenderer | null = Player.getCurrentZoneActivity();
        if (zone === null) {
            return;
        }

        zone.clearDOM();
    }
}