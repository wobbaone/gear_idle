import { AActivity } from "./activity";
import { ActiveAdventuringRenderer } from "@CLIENT/renderers/activeAdventuringRenderer";
import { AdventureZoneSelectionRenderer } from "@CLIENT/renderers/adventureZoneSelectionRenderer";
import { Client } from "@CLIENT/client";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { Utils } from "@CLIENT/utils/utils";

export class AdventureActivity extends AActivity {
    private zoneChangeCallback: MessagingBus.Subscription<MessagingBus.ZoneChangeEvent>;

    constructor() {
        super();
        
        this.zoneChangeCallback = MessagingBus.subscribeToZoneChange(() => { 
            this.buildDOM();
        }, 1000);
    }

    buildDOM(): void {
        this.clearDOM();

        if (Client.getCurrentZoneActivity() === null) {
            new AdventureZoneSelectionRenderer(this).buildDOM();
        } else {
            new ActiveAdventuringRenderer(this).buildDOM();
        }
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    delete(): void {
        super.delete();

        this.zoneChangeCallback.unsubscribe();
    }
}