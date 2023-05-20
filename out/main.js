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
define("inventory/itemEntry", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ItemEntry = void 0;
    class ItemEntry {
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
    exports.ItemEntry = ItemEntry;
});
define("inventory/items/meatBoarItem", ["require", "exports", "inventory/itemEntry"], function (require, exports, itemEntry_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MeatBoarItem = void 0;
    class MeatBoarItem extends itemEntry_1.ItemEntry {
        constructor(id) {
            super(id, "Boar Meat", "");
        }
    }
    exports.MeatBoarItem = MeatBoarItem;
});
define("inventory/items/oreCopperItem", ["require", "exports", "inventory/itemEntry"], function (require, exports, itemEntry_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OreCopperItem = void 0;
    class OreCopperItem extends itemEntry_2.ItemEntry {
        constructor(id) {
            super(id, "Copper Ore", "");
        }
    }
    exports.OreCopperItem = OreCopperItem;
});
define("inventory/items/woodBirch", ["require", "exports", "inventory/itemEntry"], function (require, exports, itemEntry_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WoodBirchItem = void 0;
    class WoodBirchItem extends itemEntry_3.ItemEntry {
        constructor(id) {
            super(id, "Birch Wood", "");
        }
    }
    exports.WoodBirchItem = WoodBirchItem;
});
define("inventory/items/itemIndex", ["require", "exports", "inventory/inventoryState", "inventory/items/meatBoarItem", "inventory/items/oreCopperItem", "inventory/items/woodBirch"], function (require, exports, inventoryState_1, meatBoarItem_1, oreCopperItem_1, woodBirch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getItem = void 0;
    __exportStar(meatBoarItem_1, exports);
    __exportStar(oreCopperItem_1, exports);
    __exportStar(woodBirch_1, exports);
    function getItem(item) {
        return inventoryState_1.Inventory.getEntryFromClass(item);
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
define("inventory/inventoryState", ["require", "exports", "inventory/itemEntry", "inventory/items"], function (require, exports, itemEntry_4, items_1) {
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
                this.itemMap.set(ctor, index);
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
                return new itemEntry_4.ItemEntry(-1, "Error Item", "");
            }
            return itemData.itemList[id];
        }
        Inventory.getEntryFromId = getEntryFromId;
        function getEntryFromClass(ctor) {
            if (!itemData.itemMap.has(ctor)) {
                console.error("Could not find item from class: " + ctor.toString());
                return new itemEntry_4.ItemEntry(-1, "Error Item", "");
            }
            let id = itemData.itemMap.get(ctor);
            if (id === undefined) {
                id = -1;
            }
            return getEntryFromId(id);
        }
        Inventory.getEntryFromClass = getEntryFromClass;
    })(Inventory = exports.Inventory || (exports.Inventory = {}));
});
define("zones/woodsZone", ["require", "exports", "activities/adventureActivity", "utils", "messagingBus", "inventory/items"], function (require, exports, adventureActivity_1, utils_1, messagingBus_2, items_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WoodsZone = void 0;
    class WoodsZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_1.AdventureActivityType.WoodCutting,
                adventureActivity_1.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_1.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Woods";
            header.appendChild(headerText);
            const body = utils_1.Utils.getContentDiv();
            const profileText = document.createElement("div");
            profileText.innerHTML = "Woodcutting in woods";
            body.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave woods";
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_2.MessagingBus.publishToZoneChange(null);
            };
            body.appendChild(backButton);
        }
        clearDOM() {
            utils_1.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Woods";
        }
        onGameTick() {
            const woodPerTick = utils_1.Utils.randomIntBetween(1, 2);
            messagingBus_2.MessagingBus.publishToResourceChange(items_2.Items.getItem(items_2.Items.WoodBirchItem).getId(), woodPerTick);
        }
    }
    exports.WoodsZone = WoodsZone;
});
define("zones/caveZone", ["require", "exports", "activities/adventureActivity", "inventory/items", "messagingBus", "utils"], function (require, exports, adventureActivity_2, items_3, messagingBus_3, utils_2) {
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
            const header = utils_2.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Caves";
            header.appendChild(headerText);
            const body = utils_2.Utils.getContentDiv();
            const profileText = document.createElement("div");
            profileText.innerHTML = "Mining in caves";
            body.appendChild(profileText);
            const backButton = document.createElement("div");
            backButton.innerHTML = "Leave caves";
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_3.MessagingBus.publishToZoneChange(null);
            };
            body.appendChild(backButton);
        }
        clearDOM() {
            utils_2.Utils.clearAllDOM();
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "Caves";
        }
        onGameTick() {
            const orePerTick = utils_2.Utils.randomIntBetween(1, 2);
            messagingBus_3.MessagingBus.publishToResourceChange(items_3.Items.getItem(items_3.Items.OreCopperItem).getId(), orePerTick);
        }
    }
    exports.CavesZone = CavesZone;
});
define("zones/wildernessZone", ["require", "exports", "activities/adventureActivity"], function (require, exports, adventureActivity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WildernessZone = void 0;
    class WildernessZone {
        constructor() {
            this.activityTypes = [
                adventureActivity_3.AdventureActivityType.Mining,
                adventureActivity_3.AdventureActivityType.WoodCutting,
                adventureActivity_3.AdventureActivityType.Combat
            ].sort();
        }
        buildDOM() {
        }
        clearDOM() {
        }
        getActivityTypes() {
            return this.activityTypes;
        }
        getName() {
            return "WildernessZone";
        }
        onGameTick() { }
    }
    exports.WildernessZone = WildernessZone;
});
define("renderers/adventureZoneSelectionRenderer", ["require", "exports", "activities/adventureActivity", "utils", "zones/woodsZone", "zones/caveZone", "zones/wildernessZone", "messagingBus"], function (require, exports, adventureActivity_4, utils_3, woodsZone_1, caveZone_1, wildernessZone_1, messagingBus_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdventureZoneSelectionRenderer = void 0;
    class AdventureZoneSelectionRenderer {
        constructor(adventureActivity) {
            this.parent = adventureActivity;
        }
        buildDOM() {
            const header = utils_3.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Select Zone";
            header.appendChild(headerText);
            const body = utils_3.Utils.getContentDiv();
            const zoneContainer = this.drawZoneBox();
            body.appendChild(zoneContainer);
            zoneContainer.appendChild(this.drawZoneButton(new woodsZone_1.WoodsZone()));
            zoneContainer.appendChild(this.drawZoneButton(new caveZone_1.CavesZone()));
            zoneContainer.appendChild(this.drawZoneButton(new wildernessZone_1.WildernessZone()));
        }
        clearDOM() { }
        drawZoneBox() {
            const zoneBoxDiv = document.createElement("div");
            zoneBoxDiv.className = "adventuring-zones";
            return zoneBoxDiv;
        }
        drawZoneButton(zone) {
            const zoneDiv = document.createElement("div");
            zone.getName();
            zoneDiv.className = "adventuring-zone-element adventuring-zone-element-" + zone.getName();
            zoneDiv.onclick = () => {
                messagingBus_4.MessagingBus.publishToZoneChange(zone);
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
            activityDiv.innerHTML = adventureActivity_4.AdventureActivityType[activityType];
            return activityDiv;
        }
    }
    exports.AdventureZoneSelectionRenderer = AdventureZoneSelectionRenderer;
});
define("activities/adventureActivity", ["require", "exports", "activities/activity", "renderers/activeAdventuringRenderer", "renderers/adventureZoneSelectionRenderer", "player", "messagingBus", "utils"], function (require, exports, activity_1, activeAdventuringRenderer_1, adventureZoneSelectionRenderer_1, player_2, messagingBus_5, utils_4) {
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
            this.zoneChangeCallback = messagingBus_5.MessagingBus.subscribeToZoneChange(() => {
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
            utils_4.Utils.clearAllDOM();
        }
        delete() {
            super.delete();
            this.zoneChangeCallback.unsubscribe();
        }
    }
    exports.AdventureActivity = AdventureActivity;
});
define("zones/zone", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("inventory/inventoryData", ["require", "exports", "messagingBus", "inventory/inventoryState"], function (require, exports, messagingBus_6, inventoryState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryData = void 0;
    class InventoryData {
        constructor() {
            this.stackableResources = new Map();
            messagingBus_6.MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
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
    }
    exports.EquipmentData = EquipmentData;
});
define("characterData", ["require", "exports", "inventory/inventoryData", "zones/zoneActivityStatus", "equipment/equipmentData"], function (require, exports, inventoryData_1, zoneActivityStatus_1, equipmentData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterData = void 0;
    class CharacterData {
        constructor() {
            this.inventory = new inventoryData_1.InventoryData();
            this.currentZoneActivity = new zoneActivityStatus_1.ZoneActivityStatus();
            this.equipment = new equipmentData_1.EquipmentData();
        }
        getInventory() {
            return this.inventory;
        }
        getEquipment() {
            return this.equipment;
        }
        getCurrentZoneActivity() {
            return this.currentZoneActivity;
        }
        setCurrentZone(zone) {
            this.currentZoneActivity = new zoneActivityStatus_1.ZoneActivityStatus(zone);
        }
    }
    exports.CharacterData = CharacterData;
});
define("activities/clanActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_5, activity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClanActivity = void 0;
    class ClanActivity extends activity_2.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_5.Utils.clearAllDOM();
        }
    }
    exports.ClanActivity = ClanActivity;
});
define("activities/inventoryActivity", ["require", "exports", "messagingBus", "player", "utils", "activities/activity"], function (require, exports, messagingBus_7, player_3, utils_6, activity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryActivity = void 0;
    class InventoryActivity extends activity_3.AActivity {
        constructor() {
            super();
            this.resourceChangeCallback = messagingBus_7.MessagingBus.subscribeToResourceChange((resourceId, amount) => {
                this.buildDOM();
            });
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_6.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Inventory";
            header.appendChild(headerText);
            const body = utils_6.Utils.getContentDiv();
            const inventoryContainer = this.drawInventoryBox();
            body.appendChild(inventoryContainer);
            const inventoryState = player_3.Player.getCharacterData().getInventory().getInventoryState();
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
            utils_6.Utils.clearAllDOM();
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
define("activities/partyActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_7, activity_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartyActivity = void 0;
    class PartyActivity extends activity_4.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_7.Utils.clearAllDOM();
        }
    }
    exports.PartyActivity = PartyActivity;
});
define("activities/profileActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_8, activity_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProfileActivity = void 0;
    class ProfileActivity extends activity_5.AActivity {
        buildDOM() {
            this.clearDOM();
            const header = utils_8.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Profile";
            header.appendChild(headerText);
            const body = utils_8.Utils.getContentDiv();
            const profileText = document.createElement("div");
            profileText.innerHTML = "Profile information goes here";
            body.appendChild(profileText);
        }
        clearDOM() {
            utils_8.Utils.clearAllDOM();
        }
    }
    exports.ProfileActivity = ProfileActivity;
});
define("activities/townActivity", ["require", "exports", "utils", "activities/activity"], function (require, exports, utils_9, activity_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TownActivity = void 0;
    class TownActivity extends activity_6.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_9.Utils.clearAllDOM();
        }
    }
    exports.TownActivity = TownActivity;
});
define("navigation", ["require", "exports", "activities/adventureActivity", "activities/clanActivity", "activities/inventoryActivity", "activities/partyActivity", "activities/profileActivity", "activities/townActivity", "utils"], function (require, exports, adventureActivity_5, clanActivity_1, inventoryActivity_1, partyActivity_1, profileActivity_1, townActivity_1, utils_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationState = void 0;
    var Screen;
    (function (Screen) {
        Screen[Screen["Profile"] = 0] = "Profile";
        Screen[Screen["Inventory"] = 1] = "Inventory";
        Screen[Screen["Clan"] = 2] = "Clan";
        Screen[Screen["Town"] = 3] = "Town";
        Screen[Screen["Party"] = 4] = "Party";
        Screen[Screen["Adventure"] = 5] = "Adventure";
    })(Screen || (Screen = {}));
    class NavigationState {
        constructor() {
            this.currentScreen = Screen.Profile;
            this.currentActivity = new profileActivity_1.ProfileActivity();
            this.setScreen(Screen.Profile);
            utils_10.Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
            utils_10.Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
            utils_10.Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
            utils_10.Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Town));
            utils_10.Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
            utils_10.Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
        }
        getCurrentScreen() {
            return this.currentScreen;
        }
        getCurrentActivity() {
            return this.currentActivity;
        }
        setScreen(screen) {
            this.currentActivity.clearDOM();
            this.currentActivity.delete();
            this.currentScreen = screen;
            switch (screen) {
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
                    this.currentActivity = new adventureActivity_5.AdventureActivity();
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
define("main", ["require", "exports", "navigation", "player"], function (require, exports, navigation_1, player_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    var Game;
    (function (Game) {
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
                const zone = player_4.Player.getCurrentZoneActivity().getCurrentZone();
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