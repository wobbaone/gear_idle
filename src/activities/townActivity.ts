import { Utils } from "../utils/utils";
import { AActivity } from "./activity";

export class TownActivity extends AActivity {
    buildDOM(): void {
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }   
}