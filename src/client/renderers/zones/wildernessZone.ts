import { Utils } from "@CLIENT/utils/utils";
import { AZoneRenderer } from "./zone";

export namespace Wilderness {
    export class Renderer extends AZoneRenderer {
        buildDOM(): void {
            this.buildBasicDOM("Leave Wilderness");
        }
    }
}