import { AActivity } from "./activity";
import { ActiveAdventuringRenderer } from "../renderers/activeAdventuringRenderer";
import { AdventureZoneSelectionRenderer } from "../renderers/adventureZoneSelectionRenderer";
import { Player } from "../player";
import { MessagingBus } from "../utils/messagingBus";
import { Utils } from "../utils/utils";

export enum AdventureActivityType {
    Mining = 0,
    WoodCutting = 1,
    Combat
}

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

        if (Player.getCurrentZoneActivity() === null) {
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