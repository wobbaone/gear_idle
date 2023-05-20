import { IZone } from "./zone";

export class ZoneActivityStatus {
    private currentZone: IZone | null;

    constructor(zone?: IZone | null) {
        if (zone === undefined) {
            this.currentZone = null;
        } else {
            this.currentZone = zone;
        }
    }

    getCurrentZone(): IZone | null {
        return this.currentZone;
    }
}