import { AdventureActivityType } from "../../activities/adventureActivity";
import { MessagingBus } from "../../utils/messagingBus";
import { AZone, AZoneRenderer } from "./zone";
import { Utils } from "../../utils/utils";

export namespace Caves {
    export class Zone extends AZone {
        getZoneRespawnTime(): number {
            return 10
        }

        createState(): State {
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

    export class State extends AZoneRenderer {
        constructor(parentZone: AZone) {
            super(parentZone, MessagingBus.subscribeToExecuteZoneAction(() => this.executeZoneAction));
        }

        executeZoneAction(entityId: number, zoneId: number): void {
            if (zoneId !== this.getId()) {
                return;
            }
        }

        buildDOM(): void {
            this.clearDOM();
    
            Utils.getHeaderDiv().appendChild(this.createZoneHeaderElement(this.parentZone.getName()));
    
            const body: HTMLElement = Utils.getContentDiv();
            const parentContainer = this.createParentContainer();

            const contentContainer: HTMLDivElement = this.createContentContainer();
            parentContainer.appendChild(contentContainer);
        
            this.zoneContent = this.createZoneContentContainer();   
            contentContainer.appendChild(this.zoneContent.getElement());

            this.updateZoneContent();
    
            parentContainer.appendChild(this.createBackButton("Leave Caves"));
            body.appendChild(parentContainer);
        }
    }
}