import { AZoneRenderer } from "./zone";

export namespace Caves {
    export class Renderer extends AZoneRenderer {
        buildDOM(): void {
            this.buildBasicDOM("Leave Caves");
        }
    }
}