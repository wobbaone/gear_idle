import { AdventureActivityType } from "@COMMONS/adventuringActivityType";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { AZone, AZoneState } from "@COMMONS/zones/zoneTypes/zone";
import { Caves } from "@COMMONS/zones/zoneTypes/caveZone";
import { Wilderness } from "@COMMONS/zones/zoneTypes/wildernessZone";
import { Woods } from "@COMMONS/zones/zoneTypes/woodsZone";

export namespace ZoneManager {
    export enum Zone {
        Cave = 0,
        Wilderness = 1,
        Woods = 2
    }

    export function CreateZone(zone: Zone): AZone {
        switch (zone) {
            case Zone.Cave:
                return new Caves.Zone();
            case Zone.Wilderness:
                return new Wilderness.Zone();
            case Zone.Woods:
                return new Woods.Zone();
            default:
                console.error("Unimplemented zone (" + Zone[zone] + ") when creating a zone record");
                return new EmptyZone();
        }
    }

    class EmptyZone extends AZone {
        getZoneType(): Zone { return 0; }    
        getZoneRespawnTime(): number { return 0; }
        getMaxZoneActivityTime(): number {  return 0; }
        getActivityTypes(): ReadonlyArray<AdventureActivityType> { return []; }
        getName(): string { return ""; }
        onGameTick(): void {}
        createState(): AZoneState {
            return new class extends AZoneState {}(this);
        }
    }
}