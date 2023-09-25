import { PlayerCharacterData } from "@/entities/characterData";
import { Container2D } from "@COMMONS/utils/container2d";
import { DeletableContainerMap } from "@COMMONS/utils/deletable";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { ZoneManager as CommonZoneManager } from "@COMMONS/zones/zoneManager";
import { AZoneState } from "@COMMONS/zones/zoneTypes/zone";

export namespace ZoneManager {
    class ZoneManagerState {
        private zoneMap: DeletableContainerMap<number, AZoneState>;

        constructor() {
            this.zoneMap = new DeletableContainerMap<number, AZoneState>();

            MessagingBus.subscribeToEnterZoneRequestAction((entityId:number, zone: CommonZoneManager.Zone | null) => {
                for (const entry of this.zoneMap.iterate()) {
                    const state: AZoneState = entry[1];
                    if (state.getBaseZone().getZoneType() !== zone) {
                        continue;
                    }

                    const playerContainer: Container2D<PlayerCharacterData> = state.getZonePlayers();
                    const playerCount: number = playerContainer.count();

                    if (playerCount < playerContainer.size()) {
                        
                        state.addPlayer()
                    }
                }
            });
        }

        getZoneMap() {
            return this.zoneMap;
        }
    }
    const zoneManagerState: ZoneManagerState = new ZoneManagerState();
    
    export function RegisterState(zone: AZoneState): number {
        zoneManagerState.getZoneMap().set(zone.getId(), zone);

        return zone.getId();
    }

    export function GetZone(zone: number): AZoneState | null {
        const zoneState: AZoneState | undefined = zoneManagerState.getZoneMap().get(zone);
        if (zoneState === undefined) {
            return null;
        }

        return zoneState;
    }

    export function RemoveState(zone: number) {
        zoneManagerState.getZoneMap().delete(zone);
    }
}