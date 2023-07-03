import { AActivity } from "./activities/activity";
import { StoryActivity } from "./activities/storyActivity";
import { AdventureActivity } from "./activities/adventureActivity";
import { ClanActivity } from "./activities/clanActivity";
import { InventoryActivity } from "./activities/inventoryActivity";
import { PartyActivity } from "./activities/partyActivity";
import { ProfileActivity } from "./activities/profileActivity";
import { TownActivity } from "./activities/townActivity";
import { LoginActivity } from "./activities/loginActivity";
import { Utils } from "./utils/utils";
import { DeletableContainer } from "./utils/deletable";

export enum Screen  {
    None = 0,
    Login = 1,
    Story,
    Profile,
    Inventory,
    Clan,
    Town,
    Party,
    Adventure,
}

export class NavigationState {
    static readonly Screen = Screen;

    private currentScreen: Screen = Screen.None;
    private currentActivity: DeletableContainer<AActivity> = new DeletableContainer<AActivity>(new LoginActivity());

    constructor() {
        this.setScreen(Screen.Profile);
        //this.setScreen(Screen.Login);

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
        return this.currentActivity.get();
    }

    setScreen(screen: Screen) {
        if(screen === this.getCurrentScreen())
            return;

        this.currentScreen = screen;

        switch (screen) {
            case Screen.None:
                break;
            case Screen.Login:
                this.currentActivity.set(new LoginActivity());
                break;
            case Screen.Story:
                this.currentActivity.set(new StoryActivity());
                break;
            case Screen.Profile:
                this.currentActivity.set(new ProfileActivity());
                break;
            case Screen.Inventory:
                this.currentActivity.set(new InventoryActivity());
                break;
            case Screen.Clan:
                this.currentActivity.set(new ClanActivity());
                break;
            case Screen.Town:
                this.currentActivity.set(new TownActivity());
                break;
            case Screen.Party:
                this.currentActivity.set(new PartyActivity());
                break;
            case Screen.Adventure:
                this.currentActivity.set(new AdventureActivity());
                break;
            default:
                console.error("Unimplemented activity (" + Screen[this.currentScreen] + ") when setting screen");
                return;
        }

        this.getCurrentActivity().buildDOM();
    }
}

