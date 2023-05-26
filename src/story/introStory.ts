import { AStory } from "./story";
import { Utils } from "../utils";
//import { chapter1 } from "../story/chapter1.json"

export class IntroStory extends AStory {
    buildDOM (): void {
        
        const loginContainer = document.getElementById("login-container");
        if (loginContainer != null) {
            loginContainer.className = "login-intro";

            const storyContainer: HTMLSpanElement = document.createElement("span");
            storyContainer.className = "intro-story";

            //storyContainer.textContent = chapter1.page1

            loginContainer.appendChild(storyContainer);  
        }


    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }
}