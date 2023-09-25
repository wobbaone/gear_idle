import { Utils } from "@CLIENT/utils/utils";
import { AActivity } from "./activity";


export class ProfileActivity extends AActivity {
    buildDOM(): void {
        this.clearDOM();
        
        const header: HTMLElement = Utils.getHeaderDiv();
        const headerText: HTMLDivElement = document.createElement("div");
        headerText.innerHTML = "Profile";
        header.appendChild(headerText);

        const body: HTMLElement = Utils.getContentDiv();
        const profileText: HTMLDivElement = document.createElement("div");
        profileText.innerHTML = "Profile information goes here"
        body.appendChild(profileText);
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }   
}