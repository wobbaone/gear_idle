define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Utils = void 0;
    class Utils {
        static addOnClickToElement(id, onClickEvent) {
            const element = document.getElementById(id);
            if (element === null) {
                console.error("Tried to add an onClick event to id (" + id + ") that does not exist in DOM");
                return;
            }
            element.onclick = onClickEvent;
        }
    }
    exports.Utils = Utils;
});
define("navigation", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationState = void 0;
    var Screen;
    (function (Screen) {
        Screen[Screen["Profile"] = 0] = "Profile";
        Screen[Screen["Inventory"] = 1] = "Inventory";
        Screen[Screen["Clan"] = 2] = "Clan";
        Screen[Screen["Towns"] = 3] = "Towns";
        Screen[Screen["Party"] = 4] = "Party";
        Screen[Screen["Adventure"] = 5] = "Adventure";
    })(Screen || (Screen = {}));
    class NavigationState {
        constructor() {
            this.currentScreen = Screen.Profile;
            utils_1.Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
            utils_1.Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
            utils_1.Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
            utils_1.Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Towns));
            utils_1.Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
            utils_1.Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
        }
        getCurrentScreen() {
            return this.currentScreen;
        }
        setScreen(screen) {
            this.currentScreen = screen;
        }
    }
    NavigationState.Screen = Screen;
    exports.NavigationState = NavigationState;
});
define("main", ["require", "exports", "navigation"], function (require, exports, navigation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameState {
        constructor() {
            this.navigation = new navigation_1.NavigationState();
            this.gameLoopThread = null;
        }
        start() {
            stop();
            this.gameLoopThread = setInterval(this.gameLoop, 1000);
        }
        stop() {
            if (this.gameLoopThread === null) {
                return;
            }
            clearInterval(this.gameLoopThread);
        }
        gameLoop() {
            console.log("In game loop");
        }
        getNavigationState() {
            return this.navigation;
        }
    }
    const game = new GameState();
    game.start();
});
//# sourceMappingURL=main.js.map