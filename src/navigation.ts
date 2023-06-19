import { AActivity } from "./activities/activity";
import { StoryActivity } from "./activities/storyActivity";
import { AdventureActivity } from "./activities/adventureActivity";
import { ClanActivity } from "./activities/clanActivity";
import { InventoryActivity } from "./activities/inventoryActivity";
import { PartyActivity } from "./activities/partyActivity";
import { ProfileActivity } from "./activities/profileActivity";
import { TownActivity } from "./activities/townActivity";
import { Utils } from "./utils/utils";
import { DeletableContainer } from "./utils/deletable";

enum Screen  {
    Story = 0,
    Profile = 1,
    Inventory = 2,
    Clan,
    Town,
    Party,
    Adventure,
}

export class NavigationState {
    static readonly Screen = Screen;

    private currentScreen: Screen = Screen.Story;
    private currentActivity: DeletableContainer<AActivity> = new DeletableContainer<AActivity>(new ProfileActivity());

    constructor() {
        this.setScreen(Screen.Story);

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
        this.currentScreen = screen;

        switch (screen) {
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

