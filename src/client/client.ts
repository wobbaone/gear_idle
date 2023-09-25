import { PlayerCharacterData } from "../entities/characterData";
import { InventoryData } from "../inventory/inventoryData";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { AZoneRenderer, ZoneRenderer } from "@CLIENT/renderers/zones/zone";
import { ZoneManager } from "@COMMONS/zones/zoneManager";
import { NavigationState } from "./navigation";
import { NullableDeletableContainer } from "@COMMONS/utils/deletable";
import { AZone, AZoneState } from "@COMMONS/zones/zoneTypes/zone";

export namespace Client {
    class ClientState {
        navigation: NavigationState = new NavigationState();
        characterData: PlayerCharacterData = new PlayerCharacterData();
        currentZoneRenderer: NullableDeletableContainer<AZoneRenderer> = new NullableDeletableContainer<AZoneRenderer>(null);

        constructor() {
            MessagingBus.subscribeToZoneChange((entityId: number, zone: AZoneState | null) => {
                if (this.characterData.getId() !== entityId) {
                    return;
                }

                if (zone === null) {
                    this.currentZoneRenderer.set(zone)
                    this.characterData.setCurrentZone(zone);
                    return;
                }



                const zoneType: AZone = ZoneManager.CreateZone(zone.getBaseZone().getZoneType());
                const zoneState: AZoneState = zoneType.createState();
                
                //fill in data?

                this.currentZoneRenderer.set(ZoneRenderer.createRenderer(zoneState));
                this.characterData.setCurrentZone(zoneState.getId());
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

        getCurrentRenderer(): AZoneRenderer | null {
            return this.currentZoneRenderer.get();
        }
       
        getNavigationState(): NavigationState {
            return this.navigation;
        }
    }  
    
    const data: ClientState = new ClientState();
    
    export function getCharacterData(): PlayerCharacterData {
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
    
        return data.getCurrentRenderer();
    }

    export function getNavigationState(): NavigationState {
        return data.getNavigationState();
    }
}