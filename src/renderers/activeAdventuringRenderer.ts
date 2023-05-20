import { AdventureActivity } from "../activities/adventureActivity";
import { Player } from "../player";
import { Utils } from "../utils"
import { IZone } from "../zones/zone";
import { IRenderer } from "./renderer";

export class ActiveAdventuringRenderer implements IRenderer {  
    private parent: AdventureActivity;

    constructor(adventureActivity: AdventureActivity)  {
        this.parent = adventureActivity;
    }

    buildDOM(): void {
        const zone: IZone | null = Player.getCurrentZoneActivity().getCurrentZone();
        if (zone === null) {
            return;
        }

        zone.buildDOM();
    }

    clearDOM(): void {
        const zone: IZone | null = Player.getCurrentZoneActivity().getCurrentZone();
        if (zone === null) {
            return;
        }

        zone.clearDOM();
    }
}