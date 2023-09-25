import { AdventureActivityType } from "@COMMONS/adventuringActivityType";
import { MessagingBus } from "@COMMONS/utils/messagingBus";
import { AZone, AZoneState } from "./zone";
import { ZoneManager } from "../zoneManager";

export namespace Caves {
    export class Zone extends AZone {
        getZoneType(): ZoneManager.Zone {
            return ZoneManager.Zone.Cave;
        }

        getZoneRespawnTime(): number {
            return 10
        }

        createState(): AZoneState {
            return new State(this);
        }

        private activityTypes: ReadonlyArray<AdventureActivityType> = [
            AdventureActivityType.Mining,
            AdventureActivityType.Combat
        ].sort();

        getActivityTypes(): ReadonlyArray<AdventureActivityType> {
            return this.activityTypes;
        }   

        getName(): string {
            return "Cave";
        }
    }

    export class State extends AZoneState {
        constructor(parentZone: AZone) {
            super(parentZone);
        }
    }
}