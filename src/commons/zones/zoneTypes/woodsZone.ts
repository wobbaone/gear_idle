import { MessagingBus } from "../../utils/messagingBus";
import { ZoneManager } from "../zoneManager";
import { AZone, AZoneState } from "./zone";
import { AdventureActivityType } from "@COMMONS/adventuringActivityType";

export namespace Woods {
    export class Zone extends AZone {
        getZoneType(): ZoneManager.Zone {
            return ZoneManager.Zone.Wilderness;
        }

        getZoneRespawnTime(): number {
            return 10
        }
        
        createState(): State {
            return new State(this);
        }

        private activityTypes: ReadonlyArray<AdventureActivityType> = [
            AdventureActivityType.WoodCutting,
            AdventureActivityType.Combat
        ].sort();

        getActivityTypes(): ReadonlyArray<AdventureActivityType> {
            return this.activityTypes;
        }   

        getName(): string {
            return "Woods";
        }
    }

    export class State extends AZoneState {
        constructor(parentZone: AZone) {
            super(parentZone);
        }
    }
}