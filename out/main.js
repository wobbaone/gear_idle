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
define("utils/utils", ["require", "exports"], function (require, exports) {
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
        static doesPathMatch(src1, src2) {
            if (src1.length === 0 && src2.length === 0) {
                return true;
            }
            if (src1.length === 0 || src2.length === 0) {
                return false;
            }
            let srcSplit1 = src1;
            if (srcSplit1.charAt(0) === '.') {
                srcSplit1 = srcSplit1.substring(srcSplit1.indexOf('/') + 1);
            }
            let srcSplit2 = src2;
            if (srcSplit2.length !== 0 && srcSplit2.charAt(0) === '.') {
                srcSplit2 = srcSplit2.substring(srcSplit2.indexOf('/') + 1);
            }
            return srcSplit2.endsWith(srcSplit1) || srcSplit1.endsWith(srcSplit1);
        }
    }
    exports.Utils = Utils;
});
define("renderers/renderer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/deletable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NullableDeletableContainerMap = exports.DeletableContainerMap = exports.NullableDeletableContainer = exports.DeletableContainer = void 0;
    class AContainer {
        constructor(value) {
            this.value = value;
        }
        get() {
            return this.value;
        }
        set(value) {
            this.value = value;
        }
    }
    class DeletableContainer extends AContainer {
        set(value) {
            this.value.delete();
            super.set(value);
        }
    }
    exports.DeletableContainer = DeletableContainer;
    class NullableDeletableContainer extends AContainer {
        set(value) {
            if (this.value !== null) {
                this.value.delete();
            }
            super.set(value);
        }
    }
    exports.NullableDeletableContainer = NullableDeletableContainer;
    class DeletableContainerMap {
        constructor() {
            this.data = new Map();
        }
        get(key) {
            const entry = this.data.get(key);
            if (entry === undefined) {
                return undefined;
            }
            return entry.get();
        }
        delete(key) {
            const entry = this.get(key);
            if (entry === undefined) {
                return false;
            }
            entry.delete();
            return this.data.delete(key);
        }
        set(key, value) {
            const entry = this.data.get(key);
            if (entry === undefined) {
                this.data.set(key, new DeletableContainer(value));
                return;
            }
            entry.get().delete();
            entry.set(value);
        }
        clear() {
            for (const entry of this.data.values()) {
                entry.get().delete();
            }
            this.data.clear();
        }
    }
    exports.DeletableContainerMap = DeletableContainerMap;
    class NullableDeletableContainerMap {
        constructor() {
            this.data = new Map();
        }
        get(key) {
            const entry = this.data.get(key);
            if (entry === undefined) {
                return undefined;
            }
            return entry.get();
        }
        delete(key) {
            const entry = this.get(key);
            if (entry === undefined) {
                return false;
            }
            if (entry === null) {
                return this.data.delete(key);
            }
            entry.delete();
            return this.data.delete(key);
        }
        set(key, value) {
            const entry = this.data.get(key);
            if (entry === undefined) {
                this.data.set(key, new NullableDeletableContainer(value));
                return;
            }
            const entryValue = entry.get();
            if (entryValue === null) {
                entry.set(value);
                return;
            }
            entryValue.delete();
            entry.set(value);
        }
        clear() {
            for (const entry of this.data.values()) {
                const entryValue = entry.get();
                if (entryValue === null) {
                    continue;
                }
                entryValue.delete();
            }
            this.data.clear();
        }
    }
    exports.NullableDeletableContainerMap = NullableDeletableContainerMap;
});
define("activities/activity", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AActivity = void 0;
    class AActivity {
        delete() {
            this.clearDOM();
        }
    }
    exports.AActivity = AActivity;
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
            const zone = player_1.Player.getCurrentZoneActivity();
            if (zone === null) {
                return;
            }
            zone.buildDOM();
        }
        clearDOM() {
            const zone = player_1.Player.getCurrentZoneActivity();
            if (zone === null) {
                return;
            }
            zone.clearDOM();
        }
    }
    exports.ActiveAdventuringRenderer = ActiveAdventuringRenderer;
});
define("renderers/adventureZoneSelectionRenderer", ["require", "exports", "activities/adventureActivity", "utils/utils", "zones/zones", "utils/messagingBus", "player"], function (require, exports, adventureActivity_1, utils_1, zones_1, messagingBus_1, player_2) {
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
            zoneContainer.appendChild(this.drawZoneButton(zones_1.ZoneManager.Zone.Woods));
            zoneContainer.appendChild(this.drawZoneButton(zones_1.ZoneManager.Zone.Cave));
            zoneContainer.appendChild(this.drawZoneButton(zones_1.ZoneManager.Zone.Wilderness));
        }
        clearDOM() { }
        drawZoneBox() {
            const zoneBoxDiv = document.createElement("div");
            zoneBoxDiv.className = "adventuring-zones";
            return zoneBoxDiv;
        }
        drawZoneButton(zone) {
            const zoneData = zones_1.ZoneManager.CreateZone(zone);
            const zoneDiv = document.createElement("div");
            zoneDiv.className = "adventuring-zone-element adventuring-zone-" + zoneData.getName();
            zoneDiv.onclick = () => {
                const newZoneState = zoneData.createState();
                const zoneId = zones_1.ZoneManager.RegisterRenderer(newZoneState);
                newZoneState.addPlayer(player_2.Player.getCharacterData());
                messagingBus_1.MessagingBus.publishToZoneChange(zoneId);
                this.parent.buildDOM();
            };
            const nameSpan = document.createElement("div");
            nameSpan.innerHTML = zoneData.getName();
            nameSpan.className = "adventuring-activities-name";
            zoneDiv.appendChild(nameSpan);
            const zoneActivitiesDiv = document.createElement("div");
            zoneActivitiesDiv.className = "adventuring-activities";
            zoneDiv.appendChild(zoneActivitiesDiv);
            const activityTypes = zoneData.getActivityTypes();
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
define("activities/adventureActivity", ["require", "exports", "activities/activity", "renderers/activeAdventuringRenderer", "renderers/adventureZoneSelectionRenderer", "player", "utils/messagingBus", "utils/utils"], function (require, exports, activity_1, activeAdventuringRenderer_1, adventureZoneSelectionRenderer_1, player_3, messagingBus_2, utils_2) {
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
            this.zoneChangeCallback = messagingBus_2.MessagingBus.subscribeToZoneChange(() => {
                this.buildDOM();
            }, 1000);
        }
        buildDOM() {
            this.clearDOM();
            if (player_3.Player.getCurrentZoneActivity() === null) {
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
define("entities/health", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HealthData = void 0;
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
    HealthData.DEFAULT_MAX_HEALTH = 10;
    exports.HealthData = HealthData;
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
define("entities/battleEntity", ["require", "exports", "zones/zones", "entities/health"], function (require, exports, zones_2, health_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ABattleEntity = void 0;
    class ABattleEntity {
        constructor(health) {
            if (health === undefined) {
                this.health = new health_1.HealthData(health_1.HealthData.DEFAULT_MAX_HEALTH);
            }
            else {
                this.health = health;
            }
            this.activityProgress = 0;
            this.currentZoneId = null;
            this.id = ++ABattleEntity.lastId;
        }
        getId() {
            return this.id;
        }
        getHealth() {
            return this.health;
        }
        getMaxHealth() {
            return this.health.getMaxHealth();
        }
        getCurrentActivityProgress() {
            return this.activityProgress;
        }
        getZoneId() {
            return this.currentZoneId;
        }
        getCurrentZoneActivity() {
            if (this.currentZoneId === null) {
                return null;
            }
            return zones_2.ZoneManager.GetZone(this.currentZoneId);
        }
        setCurrentZone(zoneId) {
            this.currentZoneId = zoneId;
        }
        addActivityProgress(progress) {
            this.activityProgress += progress;
            if (this.activityProgress < this.getActivityThreshold()) {
                return false;
            }
            this.activityProgress = 0;
            return true;
        }
    }
    ABattleEntity.lastId = 0;
    exports.ABattleEntity = ABattleEntity;
});
define("enemies/enemy", ["require", "exports", "entities/battleEntity"], function (require, exports, battleEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DropEntry = exports.AEnemy = void 0;
    class AEnemy extends battleEntity_1.ABattleEntity {
        constructor(name, healthData, attackDamage, activityThreshold, imgSrc, dropTable) {
            super(healthData);
            this.name = name;
            this.attackDamage = attackDamage;
            this.activityThreshold = activityThreshold;
            this.dropTable = dropTable.sort((a, b) => {
                return a.getWeight() - b.getWeight();
            });
            this.imgSrc = imgSrc;
        }
        getName() {
            return this.name;
        }
        getAttackDamage() {
            return this.attackDamage;
        }
        getRandomDropItem() {
            let dropRoll = Math.random() * this.getMaxItemDropWeight();
            for (let i = 0; i < this.dropTable.length; i++) {
                const drop = this.dropTable[i];
                if (dropRoll < drop.getWeight()) {
                    return drop.getItem();
                }
                dropRoll -= drop.getWeight();
            }
            return null;
        }
        getMaxItemDropWeight() {
            let weight = 0;
            for (let i = 0; i < this.dropTable.length; i++) {
                weight += this.dropTable[i].getWeight();
            }
            return weight;
        }
        getImageSource() {
            return this.imgSrc;
        }
        getActivityThreshold() {
            return this.activityThreshold;
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
define("enemies/enemyTypes/boar", ["require", "exports", "entities/health", "inventory/items", "enemies/enemy"], function (require, exports, health_2, items_2, enemy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Boar = void 0;
    class Boar extends enemy_1.AEnemy {
        constructor() {
            super("Boar", new health_2.HealthData(3), 1, 11, "./images/boar.png", [
                new enemy_1.DropEntry(null, 3),
                new enemy_1.DropEntry(items_2.Items.getItem(items_2.Items.MeatBoarItem), 2),
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
define("utils/htmlContainer", ["require", "exports", "utils/utils"], function (require, exports, utils_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTMLContainer = void 0;
    class HTMLContainer {
        constructor(content) {
            this.children = new Map();
            this.content = content;
        }
        getElement() {
            return this.content;
        }
        createOrFindElement(tagName, id) {
            const target = this.children.get(id);
            if (target !== undefined) {
                return target;
            }
            const container = new HTMLContainer(document.createElement(tagName));
            this.content.appendChild(container.getElement());
            this.children.set(id, container);
            return container;
        }
        setImageSource(src) {
            const imageElement = this.content;
            if (!(imageElement instanceof HTMLImageElement)) {
                return;
            }
            if (utils_3.Utils.doesPathMatch(imageElement.src, src)) {
                return;
            }
            imageElement.src = src;
        }
    }
    exports.HTMLContainer = HTMLContainer;
});
define("zones/zoneTypes/zone", ["require", "exports", "utils/messagingBus", "utils/utils", "utils/htmlContainer"], function (require, exports, messagingBus_3, utils_4, htmlContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AZone = exports.AZoneRenderer = void 0;
    class AZoneRenderer {
        constructor(parentZone, zoneActionListener) {
            this.players = [[null, null], [null, null], [null, null]];
            this.enemies = [[null, null], [null, null], [null, null]];
            this.zoneContent = null;
            this.id = null;
            this.parentZone = parentZone;
            this.zoneActionListener = zoneActionListener;
            this.activityProgressListener = messagingBus_3.MessagingBus.subscribeToAddActivityProgress((activityProgress) => {
                this.updateZoneContent();
            }, 1000);
        }
        setId(id) {
            this.id = id;
        }
        getId() {
            return this.id;
        }
        delete() {
            this.clearDOM();
            this.activityProgressListener.unsubscribe();
            this.zoneActionListener.unsubscribe();
        }
        clearDOM() {
            utils_4.Utils.clearAllDOM();
        }
        addPlayer(character) {
            this.players[0][0] = character;
        }
        onGameTick() {
            messagingBus_3.MessagingBus.publishToAddActivityProgress(1);
        }
        createZoneHeaderElement(name) {
            const headerText = document.createElement("div");
            headerText.innerHTML = name;
            return headerText;
        }
        createBackButton(text) {
            const backButton = document.createElement("div");
            backButton.innerHTML = text;
            backButton.className = "back-button";
            backButton.onclick = () => {
                messagingBus_3.MessagingBus.publishToZoneChange(null);
            };
            return backButton;
        }
        createParentContainer() {
            const parentContainer = document.createElement("div");
            parentContainer.className = "adventuring-zone-container adventuring-zone-" + this.parentZone.getName();
            return parentContainer;
        }
        createContentContainer() {
            const contentContainer = document.createElement("div");
            contentContainer.className = "adventuring-zone-content";
            return contentContainer;
        }
        createZoneContentContainer() {
            const zoneContent = document.createElement("div");
            zoneContent.className = "fight-content-column";
            return new htmlContainer_1.HTMLContainer(zoneContent);
        }
        drawPlayer(parent, name, data, elementindex) {
            const elementDiv = parent.createOrFindElement("div", "elementDiv" + elementindex);
            elementDiv.getElement().className = "fighter-element";
            const nameSpan = elementDiv.createOrFindElement("span", "nameSpan");
            nameSpan.getElement().innerHTML = name;
            const healthData = data.getHealth();
            const healthSpan = elementDiv.createOrFindElement("span", "healthSpan");
            healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();
            const imageElement = elementDiv.createOrFindElement("img", "imageElement");
            imageElement.setImageSource("./images/player.png");
            imageElement.getElement().className = "player";
            return elementDiv;
        }
        drawEmptySquare(parent, elementindex) {
            const elementDiv = parent.createOrFindElement("div", "elementDiv" + elementindex);
            elementDiv.getElement().className = "fighter-element";
            const nameSpan = elementDiv.createOrFindElement("span", "nameSpan");
            nameSpan.getElement().innerHTML = "";
            const healthSpan = elementDiv.createOrFindElement("span", "healthSpan");
            healthSpan.getElement().innerHTML = "";
            const imageElement = elementDiv.createOrFindElement("img", "imageElement");
            imageElement.setImageSource("./images/blankSlot.png");
            imageElement.getElement().className = "blank";
            return elementDiv;
        }
        drawEnemy(parent, enemy, elementindex) {
            const elementDiv = parent.createOrFindElement("div", "elementDiv" + elementindex);
            elementDiv.getElement().className = "fighter-element";
            const nameSpan = elementDiv.createOrFindElement("span", "nameSpan");
            nameSpan.getElement().innerHTML = enemy.getName();
            const healthData = enemy.getHealth();
            const healthSpan = elementDiv.createOrFindElement("span", "healthSpan");
            healthSpan.getElement().innerHTML = healthData.getCurrentHealth() + "/" + healthData.getMaxHealth();
            const imageElement = elementDiv.createOrFindElement("img", "imageElement");
            imageElement.setImageSource(enemy.getImageSource());
            imageElement.getElement().className = "monster";
            return elementDiv;
        }
        updateZoneContent() {
            if (this.zoneContent === null) {
                return;
            }
            for (let i = 0; i < 3; i++) {
                const fightRow = this.zoneContent.createOrFindElement("div", "fightRow" + i);
                fightRow.getElement().className = "fight-content-row";
                const player1 = this.players[i][0];
                if (player1 === null) {
                    this.drawEmptySquare(fightRow, i * 5);
                }
                else {
                    this.drawPlayer(fightRow, "Player", player1, i * 5);
                }
                const player2 = this.players[i][1];
                if (player2 === null) {
                    this.drawEmptySquare(fightRow, i * 5 + 1);
                }
                else {
                    this.drawPlayer(fightRow, "Player", player2, i * 5 + 1);
                }
                this.drawEmptySquare(fightRow, i * 5 + 2);
                const enemy1 = this.enemies[i][0];
                if (enemy1 === null) {
                    this.drawEmptySquare(fightRow, i * 5 + 3);
                }
                else {
                    this.drawEnemy(fightRow, enemy1, i * 5 + 3);
                }
                const enemy2 = this.enemies[i][1];
                if (enemy2 === null) {
                    this.drawEmptySquare(fightRow, i * 5 + 4);
                }
                else {
                    this.drawEnemy(fightRow, enemy2, i * 5 + 4);
                }
            }
        }
    }
    exports.AZoneRenderer = AZoneRenderer;
    class AZone {
        clearDOM() {
            utils_4.Utils.clearAllDOM();
        }
    }
    exports.AZone = AZone;
});
define("zones/zoneTypes/caveZone", ["require", "exports", "activities/adventureActivity", "utils/messagingBus", "zones/zoneTypes/zone", "utils/utils"], function (require, exports, adventureActivity_2, messagingBus_4, zone_1, utils_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Caves = void 0;
    var Caves;
    (function (Caves) {
        class Zone extends zone_1.AZone {
            constructor() {
                super(...arguments);
                this.activityTypes = [
                    adventureActivity_2.AdventureActivityType.Mining,
                    adventureActivity_2.AdventureActivityType.Combat
                ].sort();
            }
            createState() {
                return new State(this);
            }
            getActivityTypes() {
                return this.activityTypes;
            }
            getName() {
                return "Cave";
            }
        }
        Caves.Zone = Zone;
        class State extends zone_1.AZoneRenderer {
            constructor(parentZone) {
                super(parentZone, messagingBus_4.MessagingBus.subscribeToExecuteZoneAction(() => this.executeZoneAction));
            }
            executeZoneAction(entityId, zoneId) {
                if (zoneId !== this.getId()) {
                    return;
                }
            }
            buildDOM() {
                this.clearDOM();
                utils_5.Utils.getHeaderDiv().appendChild(this.createZoneHeaderElement(this.parentZone.getName()));
                const body = utils_5.Utils.getContentDiv();
                const parentContainer = this.createParentContainer();
                const contentContainer = this.createContentContainer();
                parentContainer.appendChild(contentContainer);
                this.zoneContent = this.createZoneContentContainer();
                contentContainer.appendChild(this.zoneContent.getElement());
                this.updateZoneContent();
                body.appendChild(this.createBackButton("Leave Caves"));
                body.appendChild(parentContainer);
            }
        }
        Caves.State = State;
    })(Caves = exports.Caves || (exports.Caves = {}));
});
define("zones/zoneTypes/wildernessZone", ["require", "exports", "activities/adventureActivity", "utils/messagingBus", "zones/zoneTypes/zone", "utils/utils"], function (require, exports, adventureActivity_3, messagingBus_5, zone_2, utils_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Wilderness = void 0;
    var Wilderness;
    (function (Wilderness) {
        class Zone extends zone_2.AZone {
            constructor() {
                super(...arguments);
                this.activityTypes = [
                    adventureActivity_3.AdventureActivityType.Mining,
                    adventureActivity_3.AdventureActivityType.WoodCutting,
                    adventureActivity_3.AdventureActivityType.Combat
                ].sort();
            }
            createState() {
                return new State(this);
            }
            getActivityTypes() {
                return this.activityTypes;
            }
            getName() {
                return "Wilderness";
            }
        }
        Wilderness.Zone = Zone;
        class State extends zone_2.AZoneRenderer {
            constructor(parentZone) {
                super(parentZone, messagingBus_5.MessagingBus.subscribeToExecuteZoneAction(() => this.executeZoneAction));
            }
            executeZoneAction(entityId, zoneId) {
                if (zoneId !== this.getId()) {
                    return;
                }
            }
            buildDOM() {
                this.clearDOM();
                utils_6.Utils.getHeaderDiv().appendChild(this.createZoneHeaderElement(this.parentZone.getName()));
                const body = utils_6.Utils.getContentDiv();
                const parentContainer = this.createParentContainer();
                const contentContainer = this.createContentContainer();
                parentContainer.appendChild(contentContainer);
                this.zoneContent = this.createZoneContentContainer();
                contentContainer.appendChild(this.zoneContent.getElement());
                this.updateZoneContent();
                body.appendChild(this.createBackButton("Leave Wild"));
                body.appendChild(parentContainer);
            }
        }
        Wilderness.State = State;
    })(Wilderness = exports.Wilderness || (exports.Wilderness = {}));
});
define("zones/zoneTypes/woodsZone", ["require", "exports", "activities/adventureActivity", "utils/messagingBus", "zones/zoneTypes/zone", "utils/utils"], function (require, exports, adventureActivity_4, messagingBus_6, zone_3, utils_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Woods = void 0;
    var Woods;
    (function (Woods) {
        class Zone extends zone_3.AZone {
            constructor() {
                super(...arguments);
                this.activityTypes = [
                    adventureActivity_4.AdventureActivityType.WoodCutting,
                    adventureActivity_4.AdventureActivityType.Combat
                ].sort();
            }
            createState() {
                return new State(this);
            }
            getActivityTypes() {
                return this.activityTypes;
            }
            getName() {
                return "Woods";
            }
        }
        Woods.Zone = Zone;
        class State extends zone_3.AZoneRenderer {
            constructor(parentZone) {
                super(parentZone, messagingBus_6.MessagingBus.subscribeToExecuteZoneAction(() => this.executeZoneAction));
            }
            executeZoneAction(entityId, zoneId) {
                if (zoneId !== this.getId()) {
                    return;
                }
            }
            buildDOM() {
                this.clearDOM();
                utils_7.Utils.getHeaderDiv().appendChild(this.createZoneHeaderElement(this.parentZone.getName()));
                const body = utils_7.Utils.getContentDiv();
                const parentContainer = this.createParentContainer();
                const contentContainer = this.createContentContainer();
                parentContainer.appendChild(contentContainer);
                this.zoneContent = this.createZoneContentContainer();
                contentContainer.appendChild(this.zoneContent.getElement());
                this.updateZoneContent();
                body.appendChild(this.createBackButton("Leave Woods"));
                body.appendChild(parentContainer);
            }
        }
        Woods.State = State;
    })(Woods = exports.Woods || (exports.Woods = {}));
});
define("zones/zoneIndex", ["require", "exports", "zones/zoneTypes/caveZone", "zones/zoneTypes/wildernessZone", "zones/zoneTypes/woodsZone", "zones/zoneTypes/zone"], function (require, exports, caveZone_1, wildernessZone_1, woodsZone_1, zone_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(caveZone_1, exports);
    __exportStar(wildernessZone_1, exports);
    __exportStar(woodsZone_1, exports);
    __exportStar(zone_4, exports);
});
define("zones/zones", ["require", "exports", "utils/deletable", "utils/messagingBus", "zones/zoneIndex"], function (require, exports, deletable_1, messagingBus_7, Zones) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoneManager = exports.Zones = void 0;
    Zones = __importStar(Zones);
    exports.Zones = Zones;
    var ZoneManager;
    (function (ZoneManager) {
        let lastZoneId = 0;
        const zoneMap = new deletable_1.NullableDeletableContainerMap();
        let Zone;
        (function (Zone) {
            Zone[Zone["Cave"] = 0] = "Cave";
            Zone[Zone["Wilderness"] = 1] = "Wilderness";
            Zone[Zone["Woods"] = 2] = "Woods";
        })(Zone = ZoneManager.Zone || (ZoneManager.Zone = {}));
        function CreateZone(zone) {
            switch (zone) {
                case Zone.Cave:
                    return new Zones.Caves.Zone();
                case Zone.Wilderness:
                    return new Zones.Wilderness.Zone();
                case Zone.Woods:
                    return new Zones.Woods.Zone();
                default:
                    console.error("Unimplemented zone (" + Zone[zone] + ") when creating a zone record");
                    return new EmptyZone();
            }
        }
        ZoneManager.CreateZone = CreateZone;
        function RegisterRenderer(zone) {
            const id = ++lastZoneId;
            zoneMap.set(id, zone);
            return id;
        }
        ZoneManager.RegisterRenderer = RegisterRenderer;
        function GetZone(zone) {
            const zoneRenderer = zoneMap.get(zone);
            if (zoneRenderer === undefined) {
                return null;
            }
            return zoneRenderer;
        }
        ZoneManager.GetZone = GetZone;
        function RemoveRenderer(zone) {
            zoneMap.delete(zone);
        }
        ZoneManager.RemoveRenderer = RemoveRenderer;
        class EmptyZone extends Zones.AZone {
            getMaxZoneActivityTime() {
                return 0;
            }
            getActivityTypes() {
                return [];
            }
            getName() {
                return "";
            }
            onGameTick() {
            }
            createState() {
                return new class extends Zones.AZoneRenderer {
                    constructor(parentZone) {
                        super(parentZone, messagingBus_7.MessagingBus.subscribeToExecuteZoneAction(() => { }));
                    }
                    delete() { }
                    buildDOM() { }
                    clearDOM() { }
                    updateZoneContent() { }
                }(this);
            }
        }
    })(ZoneManager = exports.ZoneManager || (exports.ZoneManager = {}));
});
define("utils/debug", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Debug = void 0;
    var Debug;
    (function (Debug) {
        function getCallerClass(methodAfter, position) {
            try {
                throw new Error();
            }
            catch (e) {
                if (!(e instanceof Error)) {
                    return "Unknown caller";
                }
                if (e.stack === undefined) {
                    return "Unknown caller";
                }
                if (methodAfter === undefined) {
                    const stackElements = e.stack.split("at ");
                    if (stackElements.length <= 3) {
                        return stackElements[stackElements.length - 1].split(" (")[0];
                    }
                    return stackElements[3].split(" (")[0];
                }
                const stackElements = e.stack.split("at ");
                for (let i = 0; i < stackElements.length; i++) {
                    if (!stackElements[i].includes(methodAfter)) {
                        continue;
                    }
                    if (position === undefined) {
                        position = 1;
                    }
                    if (stackElements.length > i + position) {
                        return stackElements[i + position].split(" (")[0];
                    }
                    else {
                        break;
                    }
                }
                return "Unknown caller";
            }
        }
        Debug.getCallerClass = getCallerClass;
    })(Debug = exports.Debug || (exports.Debug = {}));
});
define("utils/messagingBus", ["require", "exports", "utils/debug"], function (require, exports, debug_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessagingBus = void 0;
    var MessagingBus;
    (function (MessagingBus) {
        const DEBUG_SUBSCRIPTIONS = true;
        class Subscription {
            constructor(parent, id) {
                this.registrationId = id;
                this.parent = parent;
            }
            unsubscribe() {
                this.parent.unsubscribe(this.registrationId);
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
            constructor(name) {
                this.lastId = 0;
                this.subscriptions = new Map();
                this.name = name;
            }
            subscribe(callback, order) {
                if (DEBUG_SUBSCRIPTIONS) {
                    console.debug("Subscribed to " + this.getName() + " from " + debug_1.Debug.getCallerClass(MessagingBusData.name, 2));
                }
                const registrationId = this.getNextId();
                let orderValue = 0;
                if (order !== undefined) {
                    orderValue = order;
                }
                this.subscriptions.set(registrationId, new SubscriptionRecord(callback, orderValue));
                return new Subscription(this, registrationId);
            }
            unsubscribe(registrationId) {
                if (DEBUG_SUBSCRIPTIONS) {
                    console.debug("Subscribed to " + this.getName() + " from " + debug_1.Debug.getCallerClass(MessagingBusData.name, 2));
                }
                if (!this.subscriptions.has(registrationId)) {
                    console.error("Could not unsubscribe from messaging bus because listener id (" + registrationId + ") could not be found in subscriptions");
                    return;
                }
                this.subscriptions.delete(registrationId);
            }
            publish(arg) {
                if (DEBUG_SUBSCRIPTIONS) {
                    console.debug("Published to " + this.getName() + " from " + debug_1.Debug.getCallerClass(MessagingBusData.name, 2));
                }
                const subscriptionCallbacks = Array.from(this.subscriptions.values());
                subscriptionCallbacks.sort((a, b) => a.order - b.order);
                subscriptionCallbacks.forEach((callback) => {
                    callback.func(arg);
                });
            }
            getNextId() {
                return ++this.lastId;
            }
            getName() {
                return this.name;
            }
        }
        const changeZoneBus = new MessagingBusData("ZoneChangeBus");
        function subscribeToZoneChange(callback, order) {
            return changeZoneBus.subscribe(callback, order);
        }
        MessagingBus.subscribeToZoneChange = subscribeToZoneChange;
        function publishToZoneChange(zone) {
            changeZoneBus.publish(zone);
        }
        MessagingBus.publishToZoneChange = publishToZoneChange;
        const resourceChangeBus = new MessagingBusData("ResourceChangeBus");
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
        const addActivityProgressBus = new MessagingBusData("ActivityProgressBus");
        function subscribeToAddActivityProgress(callback, order) {
            return addActivityProgressBus.subscribe(callback, order);
        }
        MessagingBus.subscribeToAddActivityProgress = subscribeToAddActivityProgress;
        function publishToAddActivityProgress(activityProgress) {
            addActivityProgressBus.publish(activityProgress);
        }
        MessagingBus.publishToAddActivityProgress = publishToAddActivityProgress;
        const executeZoneActionBus = new MessagingBusData("ZoneActionBus");
        function subscribeToExecuteZoneAction(callback, order) {
            return executeZoneActionBus.subscribe((zoneAction) => {
                callback(zoneAction[0], zoneAction[1]);
            }, order);
        }
        MessagingBus.subscribeToExecuteZoneAction = subscribeToExecuteZoneAction;
        function publishToExecuteZoneAction(entityId, zoneId) {
            const resourceChange = [entityId, zoneId];
            executeZoneActionBus.publish(resourceChange);
        }
        MessagingBus.publishToExecuteZoneAction = publishToExecuteZoneAction;
    })(MessagingBus = exports.MessagingBus || (exports.MessagingBus = {}));
});
define("inventory/inventoryData", ["require", "exports", "utils/messagingBus", "inventory/inventoryState"], function (require, exports, messagingBus_8, inventoryState_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryData = void 0;
    class InventoryData {
        constructor() {
            this.stackableResources = new Map();
            messagingBus_8.MessagingBus.subscribeToResourceChange(this.addResource.bind(this));
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
define("entities/characterData", ["require", "exports", "inventory/inventoryData", "equipment/equipmentData", "entities/battleEntity"], function (require, exports, inventoryData_1, equipmentData_1, battleEntity_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CharacterData = void 0;
    class CharacterData extends battleEntity_2.ABattleEntity {
        constructor() {
            super();
            this.inventory = new inventoryData_1.InventoryData();
            this.equipment = new equipmentData_1.EquipmentData();
        }
        getInventory() {
            return this.inventory;
        }
        getEquipment() {
            return this.equipment;
        }
        getMaxHealth() {
            return super.getMaxHealth() + this.getEquipment().getAddedHealth();
        }
        getActivityThreshold() {
            return CharacterData.DEFAULT_ACTIVITY_TIME;
        }
    }
    CharacterData.DEFAULT_ACTIVITY_TIME = 30;
    exports.CharacterData = CharacterData;
});
define("player", ["require", "exports", "entities/characterData", "utils/messagingBus", "zones/zones"], function (require, exports, characterData_1, messagingBus_9, zones_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    var Player;
    (function (Player) {
        class PlayerData {
            constructor() {
                this.characterData = new characterData_1.CharacterData();
                messagingBus_9.MessagingBus.subscribeToZoneChange((zone) => {
                    const currentZoneId = this.characterData.getZoneId();
                    if (currentZoneId !== null) {
                        zones_3.ZoneManager.RemoveRenderer(currentZoneId);
                    }
                    this.characterData.setCurrentZone(zone);
                });
                messagingBus_9.MessagingBus.subscribeToAddActivityProgress((progress) => {
                    const zoneId = this.characterData.getZoneId();
                    if (zoneId === null) {
                        console.warn("Activity progress should not occur when the player is not in a zone");
                        return;
                    }
                    if (this.characterData.addActivityProgress(progress)) {
                        messagingBus_9.MessagingBus.publishToExecuteZoneAction(this.characterData.getId(), zoneId);
                    }
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
define("story/chapter1", [], {
    "intro_text": {
        "strings": ["^1000 As your ship nears the shores of the enchanting continent of Mystoria, a seasoned sailor steps forward, his voice filled with excitement and anticipation. With a wide smile, he addresses the crew and passengers gathered on the deck, \"Welcome, one and all, to the enchanting continent of Mystoria! Behold the shimmering shores of this wondrous land, where adventure awaits at every turn!\"\n"]
    }
});
define("activities/storyActivity", ["require", "exports", "activities/activity", "utils/utils", "story/chapter1", "../../imports/typed/typed_2.0.16"], function (require, exports, activity_2, utils_8, chapter1, typed_2_0_16_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StoryActivity = exports.StoryActivityType = void 0;
    chapter1 = __importStar(chapter1);
    typed_2_0_16_1 = __importDefault(typed_2_0_16_1);
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
            const body = utils_8.Utils.getContentDiv();
            const storyContainer = document.createElement("div");
            storyContainer.className = "story";
            storyContainer.id = "typed";
            body.appendChild(storyContainer);
            const scriptTag = document.createElement("script");
            const t = new typed_2_0_16_1.default(storyContainer, chapter1.intro_text);
            t.start();
        }
        clearDOM() {
            utils_8.Utils.clearAllDOM();
        }
        delete() {
            super.delete();
        }
    }
    exports.StoryActivity = StoryActivity;
});
define("activities/clanActivity", ["require", "exports", "utils/utils", "activities/activity"], function (require, exports, utils_9, activity_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClanActivity = void 0;
    class ClanActivity extends activity_3.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_9.Utils.clearAllDOM();
        }
    }
    exports.ClanActivity = ClanActivity;
});
define("activities/inventoryActivity", ["require", "exports", "utils/messagingBus", "player", "utils/utils", "activities/activity"], function (require, exports, messagingBus_10, player_4, utils_10, activity_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InventoryActivity = void 0;
    class InventoryActivity extends activity_4.AActivity {
        constructor() {
            super();
            this.resourceChangeCallback = messagingBus_10.MessagingBus.subscribeToResourceChange((resourceId, amount) => {
                this.buildDOM();
            });
        }
        buildDOM() {
            this.clearDOM();
            const header = utils_10.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Inventory";
            header.appendChild(headerText);
            const body = utils_10.Utils.getContentDiv();
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
            utils_10.Utils.clearAllDOM();
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
define("activities/partyActivity", ["require", "exports", "utils/utils", "activities/activity"], function (require, exports, utils_11, activity_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartyActivity = void 0;
    class PartyActivity extends activity_5.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_11.Utils.clearAllDOM();
        }
    }
    exports.PartyActivity = PartyActivity;
});
define("activities/profileActivity", ["require", "exports", "utils/utils", "activities/activity"], function (require, exports, utils_12, activity_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProfileActivity = void 0;
    class ProfileActivity extends activity_6.AActivity {
        buildDOM() {
            this.clearDOM();
            const header = utils_12.Utils.getHeaderDiv();
            const headerText = document.createElement("div");
            headerText.innerHTML = "Profile";
            header.appendChild(headerText);
            const body = utils_12.Utils.getContentDiv();
            const profileText = document.createElement("div");
            profileText.innerHTML = "Profile information goes here";
            body.appendChild(profileText);
        }
        clearDOM() {
            utils_12.Utils.clearAllDOM();
        }
    }
    exports.ProfileActivity = ProfileActivity;
});
define("activities/townActivity", ["require", "exports", "utils/utils", "activities/activity"], function (require, exports, utils_13, activity_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TownActivity = void 0;
    class TownActivity extends activity_7.AActivity {
        buildDOM() {
        }
        clearDOM() {
            utils_13.Utils.clearAllDOM();
        }
    }
    exports.TownActivity = TownActivity;
});
define("navigation", ["require", "exports", "activities/storyActivity", "activities/adventureActivity", "activities/clanActivity", "activities/inventoryActivity", "activities/partyActivity", "activities/profileActivity", "activities/townActivity", "utils/utils", "utils/deletable"], function (require, exports, storyActivity_1, adventureActivity_5, clanActivity_1, inventoryActivity_1, partyActivity_1, profileActivity_1, townActivity_1, utils_14, deletable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NavigationState = void 0;
    var Screen;
    (function (Screen) {
        Screen[Screen["Story"] = 0] = "Story";
        Screen[Screen["Profile"] = 1] = "Profile";
        Screen[Screen["Inventory"] = 2] = "Inventory";
        Screen[Screen["Clan"] = 3] = "Clan";
        Screen[Screen["Town"] = 4] = "Town";
        Screen[Screen["Party"] = 5] = "Party";
        Screen[Screen["Adventure"] = 6] = "Adventure";
    })(Screen || (Screen = {}));
    class NavigationState {
        constructor() {
            this.currentScreen = Screen.Story;
            this.currentActivity = new deletable_2.DeletableContainer(new profileActivity_1.ProfileActivity());
            this.setScreen(Screen.Story);
            utils_14.Utils.addOnClickToElement("profile-nav", () => this.setScreen(Screen.Profile));
            utils_14.Utils.addOnClickToElement("inventory-nav", () => this.setScreen(Screen.Inventory));
            utils_14.Utils.addOnClickToElement("clan-nav", () => this.setScreen(Screen.Clan));
            utils_14.Utils.addOnClickToElement("towns-nav", () => this.setScreen(Screen.Town));
            utils_14.Utils.addOnClickToElement("party-nav", () => this.setScreen(Screen.Party));
            utils_14.Utils.addOnClickToElement("adventure-nav", () => this.setScreen(Screen.Adventure));
        }
        getCurrentScreen() {
            return this.currentScreen;
        }
        getCurrentActivity() {
            return this.currentActivity.get();
        }
        setScreen(screen) {
            this.currentScreen = screen;
            switch (screen) {
                case Screen.Story:
                    this.currentActivity.set(new storyActivity_1.StoryActivity());
                    break;
                case Screen.Profile:
                    this.currentActivity.set(new profileActivity_1.ProfileActivity());
                    break;
                case Screen.Inventory:
                    this.currentActivity.set(new inventoryActivity_1.InventoryActivity());
                    break;
                case Screen.Clan:
                    this.currentActivity.set(new clanActivity_1.ClanActivity());
                    break;
                case Screen.Town:
                    this.currentActivity.set(new townActivity_1.TownActivity());
                    break;
                case Screen.Party:
                    this.currentActivity.set(new partyActivity_1.PartyActivity());
                    break;
                case Screen.Adventure:
                    this.currentActivity.set(new adventureActivity_5.AdventureActivity());
                    break;
                default:
                    console.error("Unimplemented activity (" + Screen[this.currentScreen] + ") when setting screen");
                    return;
            }
            this.getCurrentActivity().buildDOM();
        }
    }
    NavigationState.Screen = Screen;
    exports.NavigationState = NavigationState;
});
define("main", ["require", "exports", "navigation", "player"], function (require, exports, navigation_1, player_5) {
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
                this.gameLoopThread = setInterval(this.gameLoop, 100);
            }
            stop() {
                if (this.gameLoopThread === null) {
                    return;
                }
                clearInterval(this.gameLoopThread);
            }
            gameLoop() {
                console.log("In game loop");
                const zone = player_5.Player.getCurrentZoneActivity();
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
define("story/story", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("story/introStory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntroStory = void 0;
    class IntroStory {
        getStory() {
            return "";
        }
        onGameTick() {
            return;
        }
    }
    exports.IntroStory = IntroStory;
});
//# sourceMappingURL=main.js.map