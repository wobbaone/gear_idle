import { AdventureActivityType, AdventureActivity } from "../activities/adventureActivity";
import { Utils } from "../utils/utils"
import { ZoneManager, Zones } from "../zones/zones";
import { IRenderer } from "./renderer";
import { MessagingBus } from "../utils/messagingBus";
import { Player } from "../player";

export class AdventureZoneSelectionRenderer implements IRenderer {
    private parent: AdventureActivity;

    constructor(adventureActivity: AdventureActivity)  {
        this.parent = adventureActivity;
    }

    buildDOM(): void {
        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Select Zone";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const zoneContainer: HTMLElement = this.drawZoneBox();
        body.appendChild(zoneContainer);

        zoneContainer.appendChild(this.drawZoneButton(ZoneManager.Zone.Woods));
        zoneContainer.appendChild(this.drawZoneButton(ZoneManager.Zone.Cave));
        zoneContainer.appendChild(this.drawZoneButton(ZoneManager.Zone.Wilderness));
    }

    clearDOM(): void {}

    private drawZoneBox(): HTMLElement {
        const zoneBoxDiv: HTMLDivElement = document.createElement("div");
        zoneBoxDiv.className = "adventuring-zones";

        return zoneBoxDiv;
    }

    private drawZoneButton(zone: ZoneManager.Zone): HTMLElement {
        const zoneData: Zones.AZone = ZoneManager.CreateZone(zone);

        const zoneDiv: HTMLDivElement = document.createElement("div");
        zoneDiv.className = "adventuring-zone-element adventuring-zone-" + zoneData.getName();

        zoneDiv.onclick = ()=> { 
            const newZoneState: Zones.AZoneRenderer = zoneData.createState();
            const zoneId: number = ZoneManager.RegisterRenderer(newZoneState);
            
            newZoneState.addPlayer(Player.getCharacterData());

            MessagingBus.publishToZoneChange(zoneId); 
            this.parent.buildDOM();
        };

        const nameSpan: HTMLSpanElement = document.createElement("div");
        nameSpan.innerHTML = zoneData.getName();
        nameSpan.className = "adventuring-activities-name";


        zoneDiv.appendChild(nameSpan);

        const zoneActivitiesDiv = document.createElement("div");
        zoneActivitiesDiv.className = "adventuring-activities";

        zoneDiv.appendChild(zoneActivitiesDiv);

        const activityTypes: ReadonlyArray<AdventureActivityType> = zoneData.getActivityTypes();
        for (let i: number = 0; i < activityTypes.length; i++) {
            const activityElement: HTMLElement = this.createActivityElement(activityTypes[i]);
            zoneActivitiesDiv.appendChild(activityElement);
        }

        return zoneDiv;
    }

    private createActivityElement(activityType: AdventureActivityType): HTMLElement {
        const activityDiv: HTMLDivElement = document.createElement("div");
        activityDiv.className = "adventure-activity-element";
        activityDiv.innerHTML = AdventureActivityType[activityType];

        return activityDiv;
    }
}