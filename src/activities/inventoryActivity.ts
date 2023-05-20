import { Utils } from "../utils";
import { AActivity } from "./activity";


export class InventoryActivity extends AActivity {
    buildDOM(): void {

    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }   
}