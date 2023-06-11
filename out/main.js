var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
        static getHeaderDiv() {
            const headerNode = document.getElementById("header");
            if (headerNode === null) {
                console.error("Could not find the header html element to draw to");
                return document.body;
            }
            return headerNode;
        }
        static getContentDiv() {
            const bodyNode = document.getElementById("body");
            if (bodyNode === null) {
                console.error("Could not find the body html element to draw to");
                return document.body;
            }
            return bodyNode;
        }
        static showNavDiv() {
            const navNode = document.getElementById("navigation");
            if (navNode === null) {
                console.error("Could not find the navigation html element to draw to");
                return;
            }
            navNode.className = "navigation";
            return;
        }
        static hideNavDiv() {
            const navNode = document.getElementById("navigation");
            if (navNode === null) {
                console.error("Could not find the navigation html element to draw to");
                return;
            }
            navNode.className = "hidden";
            return;
        }
        static showHeader() {
            const headerNode = document.getElementById("header");
            if (headerNode === null) {
                console.error("Could not find the navigation html element to draw to");
                return;
            }
            headerNode.className = "header";
            return;
        }
        static hideHeader() {
            const headerNode = document.getElementById("header");
            if (headerNode === null) {
                console.error("Could not find the navigation html element to draw to");
                return;
            }
            headerNode.className = "";
            return;
        }
        static clearAllDOM() {
            const header = Utils.getHeaderDiv();
            while (header.firstChild) {
                header.removeChild(header.firstChild);
            }
            const body = Utils.getContentDiv();
            while (body.firstChild) {
                body.removeChild(body.firstChild);
            }
        }
        static randomIntBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }
    exports.Utils = Utils;
});
define("renderers/renderer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("activities/activity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AActivity = void 0;
    class AActivity {
        delete() { }
    }
    exports.AActivity = AActivity;
});
define("zones/zoneTypes/zone", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("zones/zoneActivityStatus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoneActivityStatus = void 0;
    class ZoneActivityStatus {
        constructor(zone) {
            if (zone === undefined) {
                this.currentZone = null;
            }
            else {
                this.currentZone = zone;
            }
        }
        getCurrentZone() {
            return this.currentZone;
        }
    }
    exports.ZoneActivityStatus = ZoneActivityStatus;
});
define("player", ["require", "exports", "characterData", "messagingBus"], function (require, exports, characterData_1, messagingBus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    var Player;
    (function (Player) {
        class PlayerData {
            constructor() {
                this.characterData = new characterData_1.CharacterData();
                messagingBus_1.MessagingBus.subscribeToZoneChange((zone) => {
                    this.characterData.setCurrentZone(zone);
                });
            }
        }
        const data = new PlayerData();
        function getCharacterData() {
            return data.characterData;
        }
        Player.getCharacterData = getCharacterData;
        function getInventory() {
            return getCharacterData().getInventory();
        }
        Player.getInventory = getInventory;
        function getCurrentZoneActivity() {
            return getCharacterData().getCurrentZoneActivity();
        }
        Player.getCurrentZoneActivity = getCurrentZoneActivity;
    })(Player = exports.Player || (exports.Player = {}));
});
define("renderers/activeAdventuringRenderer", ["require", "exports", "player"], function (require, exports, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActiveAdventuringRenderer = void 0;
    class ActiveAdventuringRenderer {
        constructor(adventureActivity) {
            this.parent = adventureActivity;
        }
        buildDOM() {
            const zone = player_1.Player.getCurrentZoneActivity().getCurrentZone();
            if (zone === null) {
                return;
            }
            zone.buildDOM();
        }
        clearDOM() {
            const zone = player_1.Player.getCurrentZoneActivity().getCurrentZone();
            if (zone === null) {
                return;
            }
            zone.clearDOM();
        }
    }
    exports.ActiveAdventuringRenderer = ActiveAdventuringRenderer;
});
define("renderers/adventureZoneSelectionRenderer", ["require", "exports", "activities/adventureActivity", "utils", "zones/zones", "messagingBus"], function (require, exports, adventureActivity_1, utils_1, zones_1, messagingBus_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdventureZoneSelectionRenderer = void 0;
    class AdventureZoneSelectionRenderer {
        constructor(adventureActivity) {
            this.parent = adventureActivity;
        }
        buildDOM() {
            const header = utils_1.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Select Zone";
            header.appendChild(headerText);
            const body = utils_1.Utils.getContentDiv();
            const zoneContainer = this.drawZoneBox();
            body.appendChild(zoneContainer);
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.WildernessZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.WoodsZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.CavesZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.JungleZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.DesertZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.WarforgeCitadelZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.DarkForestZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.GraveyardZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.FrozenZone()));
            zoneContainer.appendChild(this.drawZoneButton(new zones_1.Zones.VolcanoZone()));
        }
        clearDOM() { }
        drawZoneBox() {
            const zoneBoxDiv = document.createElement("div");
            zoneBoxDiv.className = "adventuring-zones";
            return zoneBoxDiv;
        }
        drawZoneButton(zone) {
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "adventuring-zone-element adventuring-zone-" + zone.getName();
            zoneDiv.onclick = () => {
                messagingBus_2.MessagingBus.publishToZoneChange(zone);
                this.parent.buildDOM();
            };
            const nameSpan = document.createElement("div");
            nameSpan.innerHTML = zone.getName();
            nameSpan.className = "adventuring-activities-name";
            zoneDiv.appendChild(nameSpan);
            const zoneActivitiesDiv = document.createElement("div");
            zoneActivitiesDiv.className = "adventuring-activities";
            zoneDiv.appendChild(zoneActivitiesDiv);
            const activityTypes = zone.getActivityTypes();
            for (let i = 0; i < activityTypes.length; i++) {
                const activityElement = this.createActivityElement(activityTypes[i]);
                zoneActivitiesDiv.appendChild(activityElement);
            }
            return zoneDiv;
        }
        createActivityElement(activityType) {
            const activityDiv = document.createElement("div");
            activityDiv.className = "adventure-activity-element";
            activityDiv.innerHTML = adventureActivity_1.AdventureActivityType[activityType];
            return activityDiv;
        }
    }
    exports.AdventureZoneSelectionRenderer = AdventureZoneSelectionRenderer;
});
define("activities/adventureActivity", ["require", "exports", "activities/activity", "renderers/activeAdventuringRenderer", "renderers/adventureZoneSelectionRenderer", "player", "messagingBus", "utils"], function (require, exports, activity_1, activeAdventuringRenderer_1, adventureZoneSelectionRenderer_1, player_2, messagingBus_3, utils_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdventureActivity = exports.AdventureActivityType = void 0;
    var AdventureActivityType;
    (function (AdventureActivityType) {
        AdventureActivityType[AdventureActivityType["Mining"] = 0] = "Mining";
        AdventureActivityType[AdventureActivityType["WoodCutting"] = 1] = "WoodCutting";
        AdventureActivityType[AdventureActivityType["Combat"] = 2] = "Combat";
    })(AdventureActivityType = exports.AdventureActivityType || (exports.AdventureActivityType = {}));
    class AdventureActivity extends activity_1.AActivity {
        constructor() {
            super();
            this.zoneChangeCallback = messagingBus_3.MessagingBus.subscribeToZoneChange(() => {
                this.buildDOM();
            }, 1000);
        }
        buildDOM() {
            this.clearDOM();
            if (player_2.Player.getCurrentZoneActivity().getCurrentZone() === null) {
                new adventureZoneSelectionRenderer_1.AdventureZoneSelectionRenderer(this).buildDOM();
            }
            else {
                new activeAdventuringRenderer_1.ActiveAdventuringRenderer(this).buildDOM();
            }
        }
        clearDOM() {
            utils_2.Utils.clearAllDOM();
        }
        delete() {
            super.delete();
            this.zoneChangeCallback.unsubscribe();
        }
    }
    exports.AdventureActivity = AdventureActivity;
});
define("inventory/items/itemEntry", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Entry = void 0;
    class Entry {
        constructor(id, name, imagePath) {
            this.id = id;
            this.name = name;
            this.imagePath = imagePath;
        }
        getName() {
            return this.name;
        }
        getId() {
            return this.id;
        }
        getImagePath() {
            return this.imagePath;
        }
    }
    exports.Entry = Entry;
});
define("inventory/items/itemTypes/meatBoarItem", ["require", "exports", "inventory/items/itemEntry"], function (require, exports, itemEntry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeatBoarItem = void 0;
    class MeatBoarItem extends itemEntry_1.Entry {
        constructor(id) {
            super(id, "Boar Meat", "");
        }
    }
    exports.MeatBoarItem = MeatBoarItem;
});
define("inventory/items/itemTypes/oreCopperItem", ["require", "exports", "inventory/items/itemEntry"], function (require, exports, itemEntry_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OreCopperItem = void 0;
    class OreCopperItem extends itemEntry_2.Entry {
        constructor(id) {
            super(id, "Copper Ore", "");
        }
    }
    exports.OreCopperItem = OreCopperItem;
});
define("inventory/items/itemTypes/woodBirch", ["require", "exports", "inventory/items/itemEntry"], function (require, exports, itemEntry_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WoodBirchItem = void 0;
    class WoodBirchItem extends itemEntry_3.Entry {
        constructor(id) {
            super(id, "Birch Wood", "");
        }
    }
    exports.WoodBirchItem = WoodBirchItem;
});
define("inventory/items/weapon", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("inventory/items/armor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("inventory/items/itemIndex", ["require", "exports", "inventory/inventoryState", "inventory/items/itemEntry", "inventory/items/itemTypes/meatBoarItem", "inventory/items/itemTypes/oreCopperItem", "inventory/items/itemTypes/woodBirch", "inventory/items/weapon", "inventory/items/armor", "inventory/items/itemEntry"], function (require, exports, inventoryState_1, itemEntry_4, meatBoarItem_1, oreCopperItem_1, woodBirch_1, weapon_1, armor_1, itemEntry_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getItem = void 0;
    __exportStar(meatBoarItem_1, exports);
    __exportStar(oreCopperItem_1, exports);
    __exportStar(woodBirch_1, exports);
    __exportStar(weapon_1, exports);
    __exportStar(armor_1, exports);
    __exportStar(itemEntry_5, exports);
    function getItem(item) {
        const entry = inventoryState_1.Inventory.getEntryFromClassName(item.name);
        if (entry === null) {
            console.error("Could not get an item with class: " + item.name);
            return new class extends itemEntry_4.Entry {
            }(-1, "Error item", "");
        }
        return entry;
    }
    exports.getItem = getItem;
});
define("inventory/items", ["require", "exports", "inventory/items/itemIndex"], function (require, exports, Items) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Items = void 0;
    Items = __importStar(Items);
    exports.Items = Items;
});
define("inventory/inventoryState", ["require", "exports", "inventory/items"], function (require, exports, items_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Inventory = void 0;
    var Inventory;
    (function (Inventory) {
        class State {
            constructor() {
                this.items = [];
            }
            getItems() {
                return this.items;
            }
            static fromInventoryData(data) {
                const state = new State();
                const stackableResources = data.getStackableResources();
                stackableResources.forEach((count, id) => {
                    state.items.push(new ItemState(itemData.itemList[id], count));
                });
                return state;
            }
        }
        Inventory.State = State;
        class ItemState {
            constructor(item, count) {
                this.item = item;
                this.count = count;
            }
            getItem() {
                return this.item;
            }
            getCount() {
                return this.count;
            }
        }
        Inventory.ItemState = ItemState;
        class ItemData {
            constructor() {
                this.itemList = [];
                this.itemMap = new Map();
                this.addItemToItemList(items_1.Items.OreCopperItem);
                this.addItemToItemList(items_1.Items.WoodBirchItem);
                this.addItemToItemList(items_1.Items.MeatBoarItem);
            }
            addItemToItemList(ctor) {
                const index = this.itemList.length;
                this.itemMap.set(ctor.name, index);
                this.itemList.push(new ctor(index));
            }
        }
        const itemData = new ItemData();
        function listAllItems() {
            return itemData.itemList;
        }
        Inventory.listAllItems = listAllItems;
        function getEntryFromId(id) {
            if (id < 0 || id >= itemData.itemList.length) {
                console.error("Could not find item with ID: " + id);
                return null;
            }
            return itemData.itemList[id];
        }
        Inventory.getEntryFromId = getEntryFromId;
        function getEntryFromClass(ctor) {
            return getEntryFromClassName(ctor.name);
        }
        Inventory.getEntryFromClass = getEntryFromClass;
        function getEntryFromClassName(className) {
            if (!itemData.itemMap.has(className)) {
                console.error("Could not find item from class: " + className);
                return null;
            }
            let id = itemData.itemMap.get(className);
            if (id === undefined) {
                id = -1;
            }
            return getEntryFromId(id);
        }
        Inventory.getEntryFromClassName = getEntryFromClassName;
    })(Inventory = exports.Inventory || (exports.Inventory = {}));
});
define("zones/zoneTypes/caveZone", ["require", "exports", "activities/adventureActivity", "inventory/items", "messagingBus", "utils"], function (require, exports, adventureActivity_2, items_2, messagingBus_4, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CavesZone = void 0;
    class CavesZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_2.AdventureActivityType.Mining,
                adventureActivity_2.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_3.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Caves";
            header.appendChild(headerText);
            const body = utils_3.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_4.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_3.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Caves";
        }
        onGameTick() {
            const orePerTick = utils_3.Utils.randomIntBetween(1, 2);
            messagingBus_4.MessagingBus.publishToResourceChange(items_2.Items.getItem(items_2.Items.OreCopperItem).getId(), orePerTick);
        }
    }
    exports.CavesZone = CavesZone;
});
define("zones/zoneTypes/darkForestZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_3, utils_4, messagingBus_5, items_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DarkForestZone = void 0;
    class DarkForestZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_3.AdventureActivityType.WoodCutting,
                adventureActivity_3.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_4.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_4.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Woodcutting in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_5.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_4.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "DarkForest";
        }
        onGameTick() {
            const woodPerTick = utils_4.Utils.randomIntBetween(1, 2);
            messagingBus_5.MessagingBus.publishToResourceChange(items_3.Items.getItem(items_3.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.DarkForestZone = DarkForestZone;
});
define("zones/zoneTypes/desertZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_4, utils_5, messagingBus_6, items_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DesertZone = void 0;
    class DesertZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_4.AdventureActivityType.WoodCutting,
                adventureActivity_4.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_5.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_5.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_6.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_5.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Desert";
        }
        onGameTick() {
            const woodPerTick = utils_5.Utils.randomIntBetween(1, 2);
            messagingBus_6.MessagingBus.publishToResourceChange(items_4.Items.getItem(items_4.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.DesertZone = DesertZone;
});
define("zones/zoneTypes/frozenZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_5, utils_6, messagingBus_7, items_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FrozenZone = void 0;
    class FrozenZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_5.AdventureActivityType.WoodCutting,
                adventureActivity_5.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_6.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_6.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_7.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_6.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Frozen";
        }
        onGameTick() {
            const woodPerTick = utils_6.Utils.randomIntBetween(1, 2);
            messagingBus_7.MessagingBus.publishToResourceChange(items_5.Items.getItem(items_5.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.FrozenZone = FrozenZone;
});
define("zones/zoneTypes/graveyardZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_6, utils_7, messagingBus_8, items_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GraveyardZone = void 0;
    class GraveyardZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_6.AdventureActivityType.WoodCutting,
                adventureActivity_6.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_7.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_7.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_8.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_7.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Graveyard";
        }
        onGameTick() {
            const woodPerTick = utils_7.Utils.randomIntBetween(1, 2);
            messagingBus_8.MessagingBus.publishToResourceChange(items_6.Items.getItem(items_6.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.GraveyardZone = GraveyardZone;
});
define("zones/zoneTypes/jungleZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_7, utils_8, messagingBus_9, items_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JungleZone = void 0;
    class JungleZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_7.AdventureActivityType.WoodCutting,
                adventureActivity_7.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_8.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_8.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_9.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_8.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Jungle";
        }
        onGameTick() {
            const woodPerTick = utils_8.Utils.randomIntBetween(1, 2);
            messagingBus_9.MessagingBus.publishToResourceChange(items_7.Items.getItem(items_7.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.JungleZone = JungleZone;
});
define("zones/zoneTypes/volcanoZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_8, utils_9, messagingBus_10, items_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VolcanoZone = void 0;
    class VolcanoZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_8.AdventureActivityType.WoodCutting,
                adventureActivity_8.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_9.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = this.getName();
            header.appendChild(headerText);
            const body = utils_9.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in " + this.getName();
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave " + this.getName();
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_10.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_9.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Volcano";
        }
        onGameTick() {
            const woodPerTick = utils_9.Utils.randomIntBetween(1, 2);
            messagingBus_10.MessagingBus.publishToResourceChange(items_8.Items.getItem(items_8.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.VolcanoZone = VolcanoZone;
});
define("zones/zoneTypes/warforgeZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_9, utils_10, messagingBus_11, items_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WarforgeCitadelZone = void 0;
    class WarforgeCitadelZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_9.AdventureActivityType.WoodCutting,
                adventureActivity_9.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_10.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Warforge Citadel";
            header.appendChild(headerText);
            const body = utils_10.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Woodcutting in Warforge Citadel";
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave Warforge Citadel";
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_11.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_10.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "WarforgeCitadel";
        }
        onGameTick() {
            const woodPerTick = utils_10.Utils.randomIntBetween(1, 2);
            messagingBus_11.MessagingBus.publishToResourceChange(items_9.Items.getItem(items_9.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.WarforgeCitadelZone = WarforgeCitadelZone;
});
define("enemies/enemy", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropEntry = exports.AEnemy = void 0;
    class AEnemy {
        constructor(name, healthData, attackDamage, dropTable) {
            this.name = name;
            this.healthData = healthData;
            this.attackDamage = attackDamage;
            this.dropTable = dropTable.sort((a, b) => {
                return a.getWeight() - b.getWeight();
            });
        }
        getName() {
            return this.name;
        }
        getHealth() {
            return this.healthData;
        }
        getAttackDamage() {
            return this.attackDamage;
        }
        getRandomDropItem() {
            let dropRoll = Math.random() * this.getMaxWeight();
            for (let i = 0; i < this.dropTable.length; i++) {
                const drop = this.dropTable[i];
                if (dropRoll < drop.getWeight()) {
                    return drop.getItem();
                }
                dropRoll -= drop.getWeight();
            }
            return null;
        }
        getMaxWeight() {
            let weight = 0;
            for (let i = 0; i < this.dropTable.length; i++) {
                weight += this.dropTable[i].getWeight();
            }
            return weight;
        }
    }
    exports.AEnemy = AEnemy;
    class DropEntry {
        constructor(item, weight) {
            this.item = item;
            this.weight = weight;
        }
        getItem() {
            return this.item;
        }
        getWeight() {
            return this.weight;
        }
    }
    exports.DropEntry = DropEntry;
});
define("enemies/enemyTypes/boar", ["require", "exports", "characterData", "inventory/items", "enemies/enemy"], function (require, exports, characterData_2, items_10, enemy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Boar = void 0;
    class Boar extends enemy_1.AEnemy {
        constructor() {
            super("Boar", new characterData_2.HealthData(3), 1, [
                new enemy_1.DropEntry(null, 3),
                new enemy_1.DropEntry(items_10.Items.getItem(items_10.Items.MeatBoarItem), 2),
            ]);
        }
    }
    exports.Boar = Boar;
});
define("enemies/enemyIndex", ["require", "exports", "enemies/enemyTypes/boar", "enemies/enemy"], function (require, exports, boar_1, enemy_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(boar_1, exports);
    __exportStar(enemy_2, exports);
});
define("enemies/enemies", ["require", "exports", "enemies/enemyIndex"], function (require, exports, Enemies) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Enemies = void 0;
    Enemies = __importStar(Enemies);
    exports.Enemies = Enemies;
});
define("zones/zoneTypes/wildernessZone", ["require", "exports", "activities/adventureActivity", "enemies/enemies", "messagingBus", "player", "utils"], function (require, exports, adventureActivity_10, enemies_1, messagingBus_12, player_3, utils_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WildernessZone = void 0;
    class WildernessZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_10.AdventureActivityType.Mining,
                adventureActivity_10.AdventureActivityType.WoodCutting,
                adventureActivity_10.AdventureActivityType.Combat
            ].sort();
            this.enemy = new enemies_1.Enemies.Boar();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_11.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Wilderness";
            header.appendChild(headerText);
            const body = utils_11.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Fighting in the wilderness";
            content.appendChild(profileText);
            const fightElement = document.createElement("div");
            fightElement.className = "fight-content";
            const playerDiv = this.drawFighter("Player", player_3.Player.getCharacterData().getHealth());
            fightElement.appendChild(playerDiv);
            const enemyDiv = this.drawFighter(this.enemy.getName(), this.enemy.getHealth());
            fightElement.appendChild(enemyDiv);
            content.appendChild(fightElement);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave Wild";
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_12.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_11.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Wilds";
        }
        onGameTick() {
        }
        drawFighter(name, health) {
            const playerDiv = document.createElement("div");
            playerDiv.className = "fighter-element";
            const nameSpan = document.createElement("span");
            nameSpan.innerHTML = name;
            playerDiv.appendChild(nameSpan);
            const healthspan = document.createElement("span");
            healthspan.innerHTML = health.getCurrentHealth() + "/" + health.getMaxHealth();
            playerDiv.appendChild(healthspan);
            const imageElement = document.createElement("img");
            imageElement.src = "./images/boar.png";
            imageElement.className = "monster";
            playerDiv.appendChild(imageElement);
            return playerDiv;
        }
    }
    exports.WildernessZone = WildernessZone;
});
define("zones/zoneTypes/woodsZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_11, utils_12, messagingBus_13, items_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WoodsZone = void 0;
    class WoodsZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_11.AdventureActivityType.WoodCutting,
                adventureActivity_11.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_12.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Woods";
            header.appendChild(headerText);
            const body = utils_12.Utils.getContentDiv();
            const adContainer = document.createElement("div");
            adContainer.className = "adventuring-zone-container adventuring-zone-" + this.getName();
            body.appendChild(adContainer);
            const content = document.createElement("div");
            content.className = "adventuring-zone-content";
            adContainer.appendChild(content);
            const profileText = document.createElement("div");
            profileText.innerHTML = "Woodcutting in woods";
            content.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave woods";
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_13.MessagingBus.publishToZoneChange(null);
            };
            content.appendChild(backButton);
        }
        clearDOM() {
            utils_12.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Woods";
        }
        onGameTick() {
            const woodPerTick = utils_12.Utils.randomIntBetween(1, 2);
            messagingBus_13.MessagingBus.publishToResourceChange(items_11.Items.getItem(items_11.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.WoodsZone = WoodsZone;
});
define("zones/zoneIndex", ["require", "exports", "zones/zoneTypes/caveZone", "zones/zoneTypes/darkForestZone", "zones/zoneTypes/desertZone", "zones/zoneTypes/frozenZone", "zones/zoneTypes/graveyardZone", "zones/zoneTypes/jungleZone", "zones/zoneTypes/volcanoZone", "zones/zoneTypes/warforgeZone", "zones/zoneTypes/wildernessZone", "zones/zoneTypes/woodsZone", "zones/zoneTypes/zone"], function (require, exports, caveZone_1, darkForestZone_1, desertZone_1, frozenZone_1, graveyardZone_1, jungleZone_1, volcanoZone_1, warforgeZone_1, wildernessZone_1, woodsZone_1, zone_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(caveZone_1, exports);
    __exportStar(darkForestZone_1, exports);
    __exportStar(desertZone_1, exports);
    __exportStar(frozenZone_1, exports);
    __exportStar(graveyardZone_1, exports);
    __exportStar(jungleZone_1, exports);
    __exportStar(volcanoZone_1, exports);
    __exportStar(warforgeZone_1, exports);
    __exportStar(wildernessZone_1, exports);
    __exportStar(woodsZone_1, exports);
    __exportStar(zone_1, exports);
});
define("zones/zones", ["require", "exports", "zones/zoneIndex"], function (require, exports, Zones) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Zones = void 0;
    Zones = __importStar(Zones);
    exports.Zones = Zones;
});
define("messagingBus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessagingBus = void 0;
    var MessagingBus;
    (function (MessagingBus) {
        class Subscription {
            constructor(parent, id) {
                this.registrationId = id;
                this.parent = parent;
            }
            unsubscribe() {
                if (!this.parent.subscriptions.has(this.registrationId)) {
                    console.error("Could not unsubscribe from messaging bus because listener id (" + this.registrationId + ") could not be found in subscriptions");
                    return;
                }
                this.parent.subscriptions.delete(this.registrationId);
            }
        }
        MessagingBus.Subscription = Subscription;
        class SubscriptionRecord {
            constructor(func, order) {
                this.func = func;
                this.order = order;
            }
        }
        class MessagingBusData {
            constructor() {
                this.lastId = 0;
                this.subscriptions = new Map();
            }
            subscribe(callback, order) {
                const registrationId = this.getNextId();
                let orderValue = 0;
                if (order !== undefined) {
                    orderValue = order;
                }
                this.subscriptions.set(registrationId, new SubscriptionRecord(callback, orderValue));
                return new Subscription(this, registrationId);
            }
            publish(arg) {
                const subscriptionCallbacks = Array.from(this.subscriptions.values());
                subscriptionCallbacks.sort((a, b) => a.order - b.order);
                subscriptionCallbacks.forEach((callback) => {
                    callback.func(arg);
                });
            }
            getNextId() {
                return ++this.lastId;
            }
        }
        const changeZoneBus = new MessagingBusData();
        const resourceChangeBus = new MessagingBusData();
        function subscribeToZoneChange(callback, order) {
            return changeZoneBus.subscribe(callback, order);
        }
        MessagingBus.subscribeToZoneChange = subscribeToZoneChange;
        function publishToZoneChange(zone) {
            changeZoneBus.publish(zone);
        }
        MessagingBus.publishToZoneChange = publishToZoneChange;
        function subscribeToResourceChange(callback, order) {
            return resourceChangeBus.subscribe((resourceChange) => {
                callback(resourceChange[0], resourceChange[1]);
            }, order);
        }
        MessagingBus.subscribeToResourceChange = subscribeToResourceChange;
        function publishToResourceChange(resourceId, amount) {
            const resourceChange = [resourceId, amount];
            resourceChangeBus.publish(resourceChange);
        }
        MessagingBus.publishToResourceChange = publishToResourceChange;
    })(MessagingBus = exports.MessagingBus || (exports.MessagingBus = {}));
});
define("inventory/inventoryData", ["require", "exports", "messagingBus", "inventory/inventoryState"], function (require, exports, messagingBus_14, inventoryState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryData = void 0;
    class InventoryData {
        constructor() {
            this.stackableResources = new Map();
            messagingBus_14.MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
        }
        getInventoryState() {
            return inventoryState_2.Inventory.State.fromInventoryData(this);
        }
        addResource(resourceId, count) {
            if (!this.stackableResources.has(resourceId)) {
                this.stackableResources.set(resourceId, count);
                return;
            }
            const currentCount = this.stackableResources.get(resourceId);
            if (currentCount === undefined) {
                console.log("Couldn't update resource with id: " + resourceId);
                return;
            }
            this.stackableResources.set(resourceId, currentCount + count);
        }
        getStackableResources() {
            return this.stackableResources;
        }
    }
    exports.InventoryData = InventoryData;
});
define("equipment/equipmentData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EquipmentData = void 0;
    class EquipmentData {
        constructor() {
            this.weapon = null;
            this.armor = null;
        }
        getAttackDamage() {
            if (this.weapon === null) {
                return EquipmentData.DEFAULT_DAMAGE;
            }
            return this.weapon.attackDamage();
        }
        getAddedHealth() {
            if (this.armor === null) {
                return 0;
            }
            return this.armor.getAddedHealth();
        }
    }
    EquipmentData.DEFAULT_DAMAGE = 1;
    exports.EquipmentData = EquipmentData;
});
define("characterData", ["require", "exports", "inventory/inventoryData", "zones/zoneActivityStatus", "equipment/equipmentData"], function (require, exports, inventoryData_1, zoneActivityStatus_1, equipmentData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterHealthData = exports.HealthData = exports.CharacterData = void 0;
    class CharacterData {
        constructor() {
            this.inventory = new inventoryData_1.InventoryData();
            this.currentZoneActivity = new zoneActivityStatus_1.ZoneActivityStatus();
            this.equipment = new equipmentData_1.EquipmentData();
            this.health = new CharacterHealthData(this);
        }
        getInventory() {
            return this.inventory;
        }
        getEquipment() {
            return this.equipment;
        }
        getHealth() {
            return this.health;
        }
        getCurrentZoneActivity() {
            return this.currentZoneActivity;
        }
        setCurrentZone(zone) {
            this.currentZoneActivity = new zoneActivityStatus_1.ZoneActivityStatus(zone);
        }
    }
    exports.CharacterData = CharacterData;
    class HealthData {
        constructor(maxHealth) {
            this.maxHealth = maxHealth;
            this.currentHealth = maxHealth;
        }
        getCurrentHealth() {
            return this.currentHealth;
        }
        getMaxHealth() {
            return this.maxHealth;
        }
    }
    exports.HealthData = HealthData;
    class CharacterHealthData extends HealthData {
        constructor(parent) {
            super(CharacterHealthData.DEFAULT_MAX_HEALTH);
            this.parent = parent;
        }
        getMaxHealth() {
            return this.maxHealth + this.parent.getEquipment().getAddedHealth();
        }
    }
    CharacterHealthData.DEFAULT_MAX_HEALTH = 10;
    exports.CharacterHealthData = CharacterHealthData;
});
define("story/chapter1", [], {
    "page1": {
        "paragraph1": "As you escape from the haze, your senses stir to life. The air carries a heavy, salty fragrance. Sways beneath your feet in tune with rhythmic waves. Creaking of wooden planks, the sound of seagulls, and distant voices calling out. You find yourself below deck, within the cozy confines of a ship's cabin. Memories of a sea voyage undertaken months ago being to resurface, as you reminisce about setting sail in pursuit of a promised fresh start.",
        "action1": "Venture to the deck.",
        "paragraph2": "As you ascend the weathered steps to the deck, a breathtaking sight unfolds before your eyes. The vibrant colors of a tropical paradise dance on the horizon, beckoning you closer. A verdant coastline emerges, framed by towering cliffs draped in lush foliage. Nestled at the meeting point of land and sea is a port town. Haven's Reach, a name that effortlessly flows into your mind.",
        "action2": "Watch the approach.",
        "paragraph3": "As the ship gracefully glides into the bustling port of Haven's Reach, you find yourself lost in a daze, the sights and sounds blending together in a whirlwind of excitement. The ship's anchor drops with a resounding thud, bringing you back to the present moment. A surge of anticipation courses through your veins as you join the gathering crowd preparing to disembark. Worries about who you once were fade away.",
        "action3": "Disembark",
        "paragraph4": "As you make your way through the dock, a cacophony of sounds fills the air. Merchants hawking their exotic goods, the clattering of crates being unloaded, and the cheerful banter of fellow adventurers create an atmosphere brimming with excitement and possibility. The spirit of camaraderie and adventure is palpable. You can't help but feel a sense of belonging, filling the void of those you once knew.",
        "action4": "Enter the Haven's Reach.",
        "paragraph5": "With each step, you absorb the sights and sounds of Haven's Reach. Colorful banners dance in the breeze, proudly displaying the emblems of diverse adventurer companies that have made this town their base of operations. The tantalizing aroma of freshly baked pastries drifts from a nearby bakery. You feel the sweet embrace of Haven's Reach.",
        "action5": "Wander aimlessly."
    },
    "page2": {
        "paragraph1": "Lost in your thoughts, a young teenager catches your attention with their ragged clothes and eager gaze.",
        "paragraph1_b": "The teenager approaches you timidly, their eyes sparkling with a mix of curiosity and desperation. \"Excuse me, kind traveler,\" they say, their voice tinged with a hint of hope. \"I couldn't help but notice your arrival. Are you new to Haven's Reach? I offer my services as a guide, showing you the best spots in the city, including a cozy inn and the renowned Adventurer's Hall.\"",
        "action1": "Check inventory",
        "paragraph2": "You take a moment to assess your inventory, realizing that the coins you possess have dwindled considerably after your voyage. It's clear that resources are limited, and every decision must be made with care. The teenager seems earnest, their enthusiasm contagious, but you wonder if spending what little coin you have on a tour would be a wise investment.",
        "paragraph2_b": "A range of possibilities lay before you. You could accept the teenager's offer and explore the city under their guidance, hoping to gain valuable insights and perhaps uncover hidden opportunities. Alternatively, you might decline the offer, choosing to wander the streets on your own, relying on your instincts to find the necessary establishments and make your own discoveries. How will you proceed?",
        "action2_a": "Take up their offer.",
        "action2_b": "Explore on your own."
    }
});
define("activities/storyActivity", ["require", "exports", "activities/activity", "utils"], function (require, exports, activity_2, utils_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StoryActivity = exports.StoryActivityType = void 0;
    var StoryActivityType;
    (function (StoryActivityType) {
        StoryActivityType[StoryActivityType["Intro"] = 0] = "Intro";
        StoryActivityType[StoryActivityType["Guide"] = 1] = "Guide";
    })(StoryActivityType = exports.StoryActivityType || (exports.StoryActivityType = {}));
    class StoryActivity extends activity_2.AActivity {
        constructor() {
            super();
        }
        buildDOM() {
            this.clearDOM();
            const body = utils_13.Utils.getContentDiv();
        }
        clearDOM() {
            utils_13.Utils.clearAllDOM();
        }
        delete() {
            super.delete();
        }
    }
    exports.StoryActivity = StoryActivity;
});
define("activities/clanActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_14, activity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClanActivity = void 0;
    class ClanActivity extends activity_3.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_14.Utils.clearAllDOM();
        }
    }
    exports.ClanActivity = ClanActivity;
});
define("activities/inventoryActivity", ["require", "exports", "messagingBus", "player", "utils", "activities/activity"], function (require, exports, messagingBus_15, player_4, utils_15, activity_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryActivity = void 0;
    class InventoryActivity extends activity_4.AActivity {
        constructor() {
            super();
            this.resourceChangeCallback = messagingBus_15.MessagingBus.subscribeToResourceChange((resourceId, amount) => {
                this.buildDOM();
            });
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_15.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Inventory";
            header.appendChild(headerText);
            const body = utils_15.Utils.getContentDiv();
            const inventoryContainer = this.drawInventoryBox();
            body.appendChild(inventoryContainer);
            const inventoryState = player_4.Player.getCharacterData().getInventory().getInventoryState();
            const items = inventoryState.getItems();
            for (let i = 0; i < items.length; i++) {
                const itemDiv = document.createElement("div");
                itemDiv.className = "item-element";
                const nameSpan = document.createElement("span");
                nameSpan.innerHTML = items[i].getItem().getName();
                itemDiv.appendChild(nameSpan);
                const countSpan = document.createElement("span");
                countSpan.innerHTML = items[i].getCount().toString();
                itemDiv.appendChild(countSpan);
                inventoryContainer.appendChild(itemDiv);
            }
        }
        clearDOM() {
            utils_15.Utils.clearAllDOM();
        }
        drawInventoryBox() {
            const zoneBoxDiv = document.createElement("div");
            zoneBoxDiv.className = "inventory-items";
            return zoneBoxDiv;
        }
        delete() {
            super.delete();
            this.resourceChangeCallback.unsubscribe();
        }
    }
    exports.InventoryActivity = InventoryActivity;
});
define("activities/partyActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_16, activity_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartyActivity = void 0;
    class PartyActivity extends activity_5.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_16.Utils.clearAllDOM();
        }
    }
    exports.PartyActivity = PartyActivity;
});
define("activities/profileActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_17, activity_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProfileActivity = void 0;
    class ProfileActivity extends activity_6.AActivity {
        buildDOM() {
            this.clearDOM();
            const header = utils_17.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Profile";
            header.appendChild(headerText);
            const body = utils_17.Utils.getContentDiv();
            const profileText = document.createElement("div");
            profileText.innerHTML = "Profile information goes here";
            body.appendChild(profileText);
        }
        clearDOM() {
            utils_17.Utils.clearAllDOM();
        }
    }
    exports.ProfileActivity = ProfileActivity;
});
define("activities/townActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_18, activity_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TownActivity = void 0;
    class TownActivity extends activity_7.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_18.Utils.clearAllDOM();
        }
    }
    exports.TownActivity = TownActivity;
});
define("story/chapterLogin", [], {
    "login": {
        "strings": [
            "A sense of haziness engulfs your senses, dulling the vibrant colors.",
            "A sense of haziness engulfs your senses, muting the sounds.",
            "A sense of haziness engulfs your senses, leaving the world around you in an indistinct state.",
            "A sense of haziness engulfs your surroundings, blurring the edges of reality into a surreal and uncertain landscape.",
            "A sense of haziness engulfs your surroundings, giving rise to a disorienting sensation where distances seem distorted and proportions feel skewed.",
            "A sense of haziness engulfs your surroundings, creating ambiance that shrouds everything in a soft, diffused light.",
            "A sense of haziness engulfs your thoughts, making it challenging to fathom coherent ideas and causing a constant mental fog.",
            "A sense of haziness engulfs your thoughts, eroding your focus and causing distractions to infiltrate your mind at every turn.",
            "A sense of haziness engulfs your identity, causing a disconnection between who you once were and who you perceive yourself to be.",
            "You find yourself struggling to recall the details of your past achievements, the triumphs and milestones that once defined you.",
            "You find yourself struggling to recall the details of your dreams and aspirations, leaving you adrift in a sea of emptiness.",
            "You find yourself struggling to recall the details of your own voice, the essence of your thoughts and opinions fading into whispers of uncertainty.",
            "You find yourself struggling to recall the details of your purpose, grappling with a sense of existential confusion and a longing for direction.",
            "You find yourself struggling to recall the details of where you grew up, the streets and neighborhoods that once formed the backdrop of your childhood.",
            "You find yourself struggling to recall the details of where you grew up, the specific landmarks and local hangouts that held a special place in your heart.",
            "You find yourself struggling to recall the details of where you grew up, the names and faces of the friends and neighbors who were once an integral part of your life.",
            "You grasp at fleeting glimpses of familiar faces and places, but they slip through your fingers like grains of sand.",
            "It's as if your memories have been scattered and lost, leaving you with fragments of who you once were.",
            "It's as if your memories have been scattered and lost, drifting away like leaves carried by an unforgiving wind.",
            "Each attempt to retrieve a memory only adds to the disorientation that clouds your mind.",
            "Each moment is filled with a sense of unease, as if there is a hidden truth just beyond your reach.",
            "Each moment is filled with a sense of unease, as if a lurking presence watches from the shadows, unseen but deeply felt.",
            "Each moment is filled with a sense of unease, as if an invisible weight presses upon your chest, making it harder to breathe.",
            "The remnants of your past flicker like distant stars in the night sky, teasing you with their presence.",
            "The world around you feels both foreign and familiar, a paradox that intensifies the confusion within.",
            "The world around you feels both foreign and familiar, like a dream that hints at half-truths.",
            "As you navigate this labyrinth of forgotten recollections, you can't help but wonder if you will ever regain a firm grip on your own identity.",
            "As you navigate this labyrinth of forgotten recollections, you can't help but wonder if the gaps in your memory are a blessing or a curse.",
            "As you navigate this labyrinth of forgotten recollections, you can't help but wonder if the fleeting memories are protecting you from painful truths or robbing you of essential knowledge."
        ],
        "startDelay": 500,
        "showCursor": false,
        "typeSpeed": 25,
        "backSpeed": 25,
        "loop": true
    }
});
define("story/story", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AStory = void 0;
    class AStory {
        delete() { }
    }
    exports.AStory = AStory;
});
define("story/tutorialStory", ["require", "exports", "story/story", "utils", "story/chapter1", "main", "navigation"], function (require, exports, story_1, utils_19, chapter1_json_1, main_1, navigation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TutorialStory = void 0;
    class TutorialStory extends story_1.AStory {
        buildDOM() {
            this.part1();
        }
        part1() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                loginContainer.className = "login-intro";
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                const story1AContainer = document.createElement("div");
                story1AContainer.textContent = chapter1_json_1.page2.paragraph1;
                storyContainer.appendChild(story1AContainer);
                const breakElement1 = document.createElement("br");
                storyContainer.appendChild(breakElement1);
                const story1BContainer = document.createElement("div");
                story1BContainer.textContent = chapter1_json_1.page2.paragraph1_b;
                storyContainer.appendChild(story1BContainer);
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_1.page2.action1;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 50;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart1();
                            }
                        }, 500);
                    }
                };
                function finishPart1() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    TutorialStory.part2();
                    return;
                }
            }
        }
        static part2() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                loginContainer.className = "login-intro";
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                const story2AContainer = document.createElement("div");
                story2AContainer.textContent = chapter1_json_1.page2.paragraph2;
                storyContainer.appendChild(story2AContainer);
                const breakElement2 = document.createElement("br");
                storyContainer.appendChild(breakElement2);
                const story2BContainer = document.createElement("div");
                story2BContainer.textContent = chapter1_json_1.page2.paragraph2_b;
                storyContainer.appendChild(story2BContainer);
                loginContainer.appendChild(storyContainer);
                const taskButton_a = document.createElement("div");
                taskButton_a.id = "task-button-a";
                taskButton_a.textContent = chapter1_json_1.page2.action2_a;
                storyContainer.appendChild(taskButton_a);
                const progressBar_a = document.createElement("progress");
                progressBar_a.id = "task-progress-a";
                progressBar_a.max = 50;
                progressBar_a.value = 0;
                taskButton_a.appendChild(progressBar_a);
                const taskButton_b = document.createElement("div");
                taskButton_b.id = "task-button-b";
                taskButton_b.textContent = chapter1_json_1.page2.action2_b;
                storyContainer.appendChild(taskButton_b);
                const progressBar_b = document.createElement("progress");
                progressBar_b.id = "task-progress-b";
                progressBar_b.max = 300;
                progressBar_b.value = 0;
                taskButton_b.appendChild(progressBar_b);
                var clickTask = false;
                var taskProgress = 0;
                taskButton_a.onclick = () => {
                    storyContainer.removeChild(taskButton_b);
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar_a.value = taskProgress;
                            if (taskProgress >= progressBar_a.max) {
                                clearInterval(taskInterval);
                                finishPart2_A();
                            }
                        }, 500);
                    }
                };
                taskButton_b.onclick = () => {
                    storyContainer.removeChild(taskButton_a);
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar_b.value = taskProgress;
                            if (taskProgress >= progressBar_b.max) {
                                clearInterval(taskInterval);
                                finishPart2_B();
                            }
                        }, 500);
                    }
                };
                function finishPart2_A() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    utils_19.Utils.showNavDiv();
                    utils_19.Utils.showHeader();
                    main_1.Game.getNavigationState().setScreen(navigation_1.Screen.Profile);
                    return;
                }
                function finishPart2_B() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    utils_19.Utils.showNavDiv();
                    utils_19.Utils.showHeader();
                    main_1.Game.getNavigationState().setScreen(navigation_1.Screen.Profile);
                    return;
                }
            }
        }
        clearDOM() {
            utils_19.Utils.clearAllDOM();
        }
    }
    exports.TutorialStory = TutorialStory;
});
define("story/introStory", ["require", "exports", "story/story", "utils", "story/chapter1", "story/tutorialStory"], function (require, exports, story_2, utils_20, chapter1_json_2, tutorialStory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntroStory = void 0;
    class IntroStory extends story_2.AStory {
        buildDOM() {
            this.part1();
        }
        part1() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                loginContainer.className = "login-intro";
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                storyContainer.textContent = chapter1_json_2.page1.paragraph1;
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_2.page1.action1;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 50;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart1();
                            }
                        }, 500);
                    }
                };
                function finishPart1() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    IntroStory.part2();
                    return;
                }
            }
        }
        static part2() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                storyContainer.textContent = chapter1_json_2.page1.paragraph2;
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_2.page1.action2;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 100;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart2();
                            }
                        }, 500);
                    }
                };
                function finishPart2() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    IntroStory.part3();
                    return;
                }
            }
        }
        static part3() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                storyContainer.textContent = chapter1_json_2.page1.paragraph3;
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_2.page1.action3;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 50;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart3();
                            }
                        }, 500);
                    }
                };
                function finishPart3() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    IntroStory.part4();
                    return;
                }
            }
        }
        static part4() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                storyContainer.textContent = chapter1_json_2.page1.paragraph4;
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_2.page1.action4;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 50;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart4();
                            }
                        }, 500);
                    }
                };
                function finishPart4() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    IntroStory.part5();
                    return;
                }
            }
        }
        static part5() {
            const loginContainer = document.getElementById("login-container");
            if (loginContainer != null) {
                const storyContainer = document.createElement("span");
                storyContainer.className = "intro-story";
                storyContainer.textContent = chapter1_json_2.page1.paragraph5;
                loginContainer.appendChild(storyContainer);
                const taskButton = document.createElement("div");
                taskButton.id = "task-button";
                taskButton.textContent = chapter1_json_2.page1.action5;
                storyContainer.appendChild(taskButton);
                const progressBar = document.createElement("progress");
                progressBar.id = "task-progress";
                progressBar.max = 150;
                progressBar.value = 0;
                taskButton.appendChild(progressBar);
                var clickTask = false;
                var taskProgress = 0;
                taskButton.onclick = () => {
                    if (clickTask == false) {
                        clickTask = true;
                        const taskInterval = setInterval(function progressHanlder() {
                            taskProgress += 10;
                            progressBar.value = taskProgress;
                            if (taskProgress >= progressBar.max) {
                                clearInterval(taskInterval);
                                finishPart5();
                            }
                        }, 500);
                    }
                };
                function finishPart5() {
                    if (loginContainer != null) {
                        loginContainer.removeChild(storyContainer);
                    }
                    const s = new tutorialStory_1.TutorialStory();
                    s.buildDOM();
                    return;
                }
            }
        }
        clearDOM() {
            utils_20.Utils.clearAllDOM();
        }
    }
    exports.IntroStory = IntroStory;
});
define("activities/loginActivity", ["require", "exports", "activities/activity", "utils", "story/chapterLogin", "../../imports/typed_2.0.16", "main", "navigation", "story/introStory"], function (require, exports, activity_8, utils_21, chapterLogin_json_1, typed_2_0_16_1, main_2, navigation_2, introStory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoginActivity = exports.LoginActivityType = void 0;
    chapterLogin_json_1 = __importDefault(chapterLogin_json_1);
    typed_2_0_16_1 = __importDefault(typed_2_0_16_1);
    var LoginActivityType;
    (function (LoginActivityType) {
        LoginActivityType[LoginActivityType["Google"] = 0] = "Google";
        LoginActivityType[LoginActivityType["Steam"] = 1] = "Steam";
    })(LoginActivityType = exports.LoginActivityType || (exports.LoginActivityType = {}));
    class LoginActivity extends activity_8.AActivity {
        constructor() {
            super();
        }
        buildDOM() {
            this.clearDOM();
            utils_21.Utils.hideNavDiv();
            utils_21.Utils.hideHeader();
            const body = utils_21.Utils.getContentDiv();
            const loginContainer = document.createElement("div");
            loginContainer.className = "login";
            loginContainer.id = "login-container";
            body.appendChild(loginContainer);
            const storyContainer = document.createElement("span");
            storyContainer.className = "login-story";
            body.appendChild(storyContainer);
            const loginButton = document.createElement("div");
            loginButton.id = "login-button";
            loginButton.role = "button";
            loginButton.textContent = "Snap out of it";
            const progressBar = document.createElement("progress");
            progressBar.id = "wake-progress";
            progressBar.max = 100;
            progressBar.value = 0;
            loginButton.appendChild(progressBar);
            var clickWake = false;
            var wakeProgress = 0;
            function wake() {
                var newUser = true;
                if (newUser) {
                    body.removeChild(storyContainer);
                    const s = new introStory_1.IntroStory();
                    s.buildDOM();
                }
                else {
                    utils_21.Utils.showNavDiv();
                    utils_21.Utils.showHeader();
                    main_2.Game.getNavigationState().setScreen(navigation_2.Screen.Profile);
                }
            }
            loginButton.onclick = () => {
                if (clickWake == false) {
                    clickWake = true;
                    const wakeInterval = setInterval(function progressHanlder() {
                        wakeProgress += 10;
                        progressBar.value = wakeProgress;
                        if (wakeProgress >= progressBar.max) {
                            clearInterval(wakeInterval);
                            wake();
                        }
                    }, 500);
                }
            };
            storyContainer.appendChild(loginButton);
            const textContainer = document.createElement("span");
            textContainer.id = "typed";
            const t = new typed_2_0_16_1.default(textContainer, chapterLogin_json_1.default.login);
            t.start();
            storyContainer.appendChild(textContainer);
        }
        clearDOM() {
            utils_21.Utils.clearAllDOM();
        }
        delete() {
            super.delete();
        }
    }
    exports.LoginActivity = LoginActivity;
});
define("navigation", ["require", "exports", "activities/storyActivity", "activities/adventureActivity", "activities/clanActivity", "activities/inventoryActivity", "activities/partyActivity", "activities/profileActivity", "activities/townActivity", "activities/loginActivity", "utils"], function (require, exports, storyActivity_1, adventureActivity_12, clanActivity_1, inventoryActivity_1, partyActivity_1, profileActivity_1, townActivity_1, loginActivity_1, utils_22) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationState = exports.Screen = void 0;
    var Screen;
    (function (Screen) {
        Screen[Screen["Login"] = 0] = "Login";
        Screen[Screen["Story"] = 1] = "Story";
        Screen[Screen["Profile"] = 2] = "Profile";
        Screen[Screen["Inventory"] = 3] = "Inventory";
        Screen[Screen["Clan"] = 4] = "Clan";
        Screen[Screen["Town"] = 5] = "Town";
        Screen[Screen["Party"] = 6] = "Party";
        Screen[Screen["Adventure"] = 7] = "Adventure";
    })(Screen = exports.Screen || (exports.Screen = {}));
    class NavigationState {
        constructor() {
            this.currentScreen = Screen.Login;
            this.currentActivity = new loginActivity_1.LoginActivity();
            this.setScreen(Screen.Login);
            this.currentActivity.buildDOM();
            utils_22.Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
            utils_22.Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
            utils_22.Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
            utils_22.Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Town));
            utils_22.Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
            utils_22.Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
        }
        getCurrentScreen() {
            return this.currentScreen;
        }
        getCurrentActivity() {
            return this.currentActivity;
        }
        setScreen(screen) {
            if (screen == this.getCurrentScreen())
                return;
            this.currentActivity.clearDOM();
            this.currentActivity.delete();
            this.currentScreen = screen;
            switch (screen) {
                case Screen.Login:
                    this.currentActivity = new loginActivity_1.LoginActivity();
                    break;
                case Screen.Story:
                    this.currentActivity = new storyActivity_1.StoryActivity();
                    break;
                case Screen.Profile:
                    this.currentActivity = new profileActivity_1.ProfileActivity();
                    break;
                case Screen.Inventory:
                    this.currentActivity = new inventoryActivity_1.InventoryActivity();
                    break;
                case Screen.Clan:
                    this.currentActivity = new clanActivity_1.ClanActivity();
                    break;
                case Screen.Town:
                    this.currentActivity = new townActivity_1.TownActivity();
                    break;
                case Screen.Party:
                    this.currentActivity = new partyActivity_1.PartyActivity();
                    break;
                case Screen.Adventure:
                    this.currentActivity = new adventureActivity_12.AdventureActivity();
                    break;
                default:
                    console.error("Unimplemented activity (" + Screen[this.currentScreen] + ") when setting screen");
                    return;
            }
            this.currentActivity.buildDOM();
        }
    }
    NavigationState.Screen = Screen;
    exports.NavigationState = NavigationState;
});
define("main", ["require", "exports", "navigation", "player"], function (require, exports, navigation_3, player_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game;
    (function (Game) {
        class GameState {
            constructor() {
                this.navigation = new navigation_3.NavigationState();
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
                const zone = player_5.Player.getCurrentZoneActivity().getCurrentZone();
                if (zone !== null) {
                    zone.onGameTick();
                }
            }
            getNavigationState() {
                return this.navigation;
            }
        }
        const game = new GameState();
        game.start();
        function getNavigationState() {
            return game.getNavigationState();
        }
        Game.getNavigationState = getNavigationState;
    })(Game = exports.Game || (exports.Game = {}));
});
//# sourceMappingURL=main.js.map