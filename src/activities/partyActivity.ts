import { Utils } from "../utils";
import { AActivity } from "./activity";


export class PartyActivity extends AActivity {
    buildDOM(): void {

    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }   
}