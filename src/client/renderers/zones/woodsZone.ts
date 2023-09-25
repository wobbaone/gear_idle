import { Utils } from "@CLIENT/utils/utils";
import { AZoneRenderer } from "./zone";

export namespace Woods {
    export class Renderer extends AZoneRenderer {                  
        buildDOM(): void {
            this.buildBasicDOM("Leave Woods");
        }
    }
}