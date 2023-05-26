import { AActivity } from "./activities/activity";
import { StoryActivity } from "./activities/storyActivity";
import { AdventureActivity } from "./activities/adventureActivity";
import { ClanActivity } from "./activities/clanActivity";
import { InventoryActivity } from "./activities/inventoryActivity";
import { PartyActivity } from "./activities/partyActivity";
import { ProfileActivity } from "./activities/profileActivity";
import { TownActivity } from "./activities/townActivity";
import { LoginActivity } from "./activities/loginActivity";
import { Utils } from "./utils";

export enum Screen  {
    Login = 0,
    Story = 1,
    Profile = 2,
    Inventory = 3,
    Clan,
    Town,
    Party,
    Adventure,
}

export class NavigationState {
    static readonly Screen = Screen;

    private currentScreen: Screen = Screen.Login;
    private currentActivity: AActivity = new LoginActivity();

    constructor() {
        this.setScreen(Screen.Login);
        this.currentActivity.buildDOM();

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
        if(screen == this.getCurrentScreen())
            return;

        this.currentActivity.clearDOM();
        this.currentActivity.delete();

        this.currentScreen = screen;

        switch (screen) {
            case Screen.Login:
                this.currentActivity = new LoginActivity();
                break;
            case Screen.Story:
                this.currentActivity = new StoryActivity();
                break;
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

