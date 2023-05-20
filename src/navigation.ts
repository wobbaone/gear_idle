import { AActivity } from "./activities/activity";
import { AdventureActivity } from "./activities/adventureActivity";
import { ClanActivity } from "./activities/clanActivity";
import { InventoryActivity } from "./activities/inventoryActivity";
import { PartyActivity } from "./activities/partyActivity";
import { ProfileActivity } from "./activities/profileActivity";
import { TownActivity } from "./activities/townActivity";
import { Utils } from "./utils";

enum Screen  {
    Profile = 0,
    Inventory = 1,
    Clan,
    Town,
    Party,
    Adventure
}

export class NavigationState {
    static readonly Screen = Screen;

    private currentScreen: Screen = Screen.Profile;
    private currentActivity: AActivity = new ProfileActivity();

    constructor() {
        this.setScreen(Screen.Profile);

        Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
        Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
        Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
        Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Town));
        Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
        Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
    }

    getCurrentScreen(): Screen {
        return this.currentScreen;
    }

    getCurrentActivity(): AActivity {
        return this.currentActivity;
    }

    setScreen(screen: Screen) {
        this.currentActivity.clearDOM();
        this.currentActivity.delete();

        this.currentScreen = screen;

        switch (screen) {
            case Screen.Profile:
                this.currentActivity = new ProfileActivity();
                break;
            case Screen.Inventory:
                this.currentActivity = new InventoryActivity();
                break;
            case Screen.Clan:
                this.currentActivity = new ClanActivity();
                break;
            case Screen.Town:
                this.currentActivity = new TownActivity();
                break;
            case Screen.Party:
                this.currentActivity = new PartyActivity();
                break;
            case Screen.Adventure:
                this.currentActivity = new AdventureActivity();
                break;
            default:
                console.error("Unimplemented activity (" + Screen[this.currentScreen] + ") when setting screen");
                return;
        }

        this.currentActivity.buildDOM();
    }
}

