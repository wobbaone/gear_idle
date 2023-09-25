import { AdventureActivity } from "@CLIENT/activities/adventureActivity";
import { Client } from "@CLIENT/client";
import { IRenderer } from "./renderer";
import { AZoneRenderer } from "./zones/zone";

export class ActiveAdventuringRenderer implements IRenderer {  
    private parent: AdventureActivity;

    constructor(adventureActivity: AdventureActivity)  {
        this.parent = adventureActivity;
    }

    buildDOM(): void {
        const zone: AZoneRenderer | null = Client.getCurrentZoneActivity();
        if (zone === null) {
            return;
        }

        zone.buildDOM();
    }

    clearDOM(): void {
        const zone: AZoneRenderer | null = Client.getCurrentZoneActivity();
        if (zone === null) {
            return;
        }

        zone.clearDOM();
    }
}