import { ZoneActivityStatus } from "./zones/zoneActivityStatus";
import { CharacterData } from "./characterData";
import { InventoryData } from "./inventory/inventoryData";
import { MessagingBus } from "./messagingBus";

export namespace Player {
    class PlayerData {
        characterData: CharacterData = new CharacterData();

        constructor() {
            MessagingBus.subscribeToZoneChange((zone: MessagingBus.ZoneChangeEvent) => {
                this.characterData.setCurrentZone(zone);
            });
        }
    }  
    const data: PlayerData = new PlayerData();

    export function getCharacterData(): CharacterData {
        return data.characterData;
    }

    export function getInventory(): InventoryData {
        return getCharacterData().getInventory();
    }

    export function getCurrentZoneActivity(): ZoneActivityStatus {
        return getCharacterData().getCurrentZoneActivity();
    }
}