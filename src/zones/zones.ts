import { AdventureActivityType } from "../activities/adventureActivity";
import { NullableDeletableContainerMap } from "../utils/deletable";
import { MessagingBus } from "../utils/messagingBus";
import * as Zones from "./zoneIndex"

export { Zones }

export namespace ZoneManager {
    const zoneMap: NullableDeletableContainerMap<number, Zones.AZoneRenderer> = new NullableDeletableContainerMap<number, Zones.AZoneRenderer>();

    export enum Zone {
        Cave = 0,
        Wilderness = 1,
        Woods = 2
    }

    export function CreateZone(zone: Zone): Zones.AZone {
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

    export function RegisterRenderer(zone: Zones.AZoneRenderer): number {
        zoneMap.set(zone.getId(), zone);

        return zone.getId();
    }

    export function GetZone(zone: number): Zones.AZoneRenderer | null {
        const zoneRenderer: Zones.AZoneRenderer | null | undefined = zoneMap.get(zone);
        if (zoneRenderer === undefined) {
            return null;
        }

        return zoneRenderer;
    }

    export function RemoveRenderer(zone: number) {
        zoneMap.delete(zone);
    }

    class EmptyZone extends Zones.AZone {
        getMaxZoneActivityTime(): number { 
            return 0;
        }
        getActivityTypes(): ReadonlyArray<AdventureActivityType> {
            return [];
        }
        getName(): string {
            return "";
        }
        onGameTick(): void {                    
        }
        createState(): Zones.AZoneRenderer {
            return new class extends Zones.AZoneRenderer {
                constructor(parentZone: Zones.AZone) {
                    super(parentZone, MessagingBus.subscribeToExecuteZoneAction(()=>{}));
                }

                delete(): void {}
                buildDOM(): void {}
                clearDOM(): void {}
                updateZoneContent(): void {}
            }(this);
        }
    }
}