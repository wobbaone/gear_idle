import { CharacterData } from "./entities/characterData";
import { InventoryData } from "./inventory/inventoryData";
import { MessagingBus } from "./utils/messagingBus";
import { AZoneRenderer } from "./zones/zoneTypes/zone";
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

            MessagingBus.subscribeToAddActivityProgress((entityId: number, amount: number) => {
                if (entityId !== this.characterData.getId()) {
                    return;
                }

                const footer: HTMLElement | null = document.getElementById("footer");
                if (footer === null) {
                    return;
                }

                const progress: number = Math.floor((this.characterData.getCurrentActivityProgress() / this.characterData.getActivityThreshold()) * 100);
                footer.innerHTML = "Progress: " + progress + "%";
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
        const zoneId: number | null = getCharacterData().getZoneId();
        if (zoneId === null) {
            return null;
        }
    
        return ZoneManager.GetZone(zoneId);
    }
}