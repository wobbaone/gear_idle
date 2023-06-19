import { CharacterData } from "./entities/characterData";
import { InventoryData } from "./inventory/inventoryData";
import { MessagingBus } from "./utils/messagingBus";
import { AZone, AZoneRenderer } from "./zones/zoneTypes/zone";
import { ZoneManager } from "./zones/zones";

export namespace Player {
    class PlayerData {
        characterData: CharacterData = new CharacterData();

        constructor() {
            MessagingBus.subscribeToZoneChange((zone: MessagingBus.ZoneChangeEvent) => {
                const currentZoneId: number | null = this.characterData.getZoneId();
                if (currentZoneId !== null) {
                    ZoneManager.RemoveRenderer(currentZoneId);
                }
                this.characterData.setCurrentZone(zone);
            });
            MessagingBus.subscribeToAddActivityProgress((progress) => {
                const zoneId: number | null = this.characterData.getZoneId();
                if (zoneId === null) {
                    console.warn("Activity progress should not occur when the player is not in a zone");
                    return;
                }

                if (this.characterData.addActivityProgress(progress)) {
                    MessagingBus.publishToExecuteZoneAction(this.characterData.getId(), zoneId)
                }
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

    export function getCurrentZoneActivity(): AZoneRenderer | null {
        return getCharacterData().getCurrentZoneActivity();
    }
}