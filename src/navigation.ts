import { Utils } from "./utils";

enum Screen  {
    Profile = 0,
    Inventory = 1,
    Clan,
    Towns,
    Party,
    Adventure
}

export class NavigationState {
    static readonly Screen = Screen;

    private currentScreen: Screen;

    constructor() {
        this.currentScreen = Screen.Profile
        
        Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
        Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
        Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
        Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Towns));
        Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
        Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
    }

    getCurrentScreen(): Screen {
        return this.currentScreen;
    }

    setScreen(screen: Screen) {
        this.currentScreen = screen;
    }
}

