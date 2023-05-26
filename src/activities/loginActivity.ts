import { AActivity } from "./activity";
import { Player } from "../player";
import { Utils } from "../utils";
import chapterLogin from '../story/chapterLogin.json';
import  Typed  from "../../imports/typed_2.0.16";
import { Game } from "../main";
import {Screen} from "../navigation"

export enum LoginActivityType {
    Google = 0,
    Steam = 1,
}

export class LoginActivity extends AActivity {

    constructor() {
        super();

    }

    buildDOM(): void {
        this.clearDOM();
        Utils.hideNavDiv();
        Utils.hideHeader();

        const body: HTMLElement = Utils.getContentDiv();
        
        const loginContainer: HTMLSpanElement = document.createElement("div");
        loginContainer.className = "login";
        body.appendChild(loginContainer);


        const storyContainer: HTMLSpanElement = document.createElement("span");
        storyContainer.className = "login-story";
        body.appendChild(storyContainer);  

        const loginButton: HTMLDivElement = document.createElement("div");
        loginButton.id = "login-button";

        loginButton.onclick = ()=> { 
            //change navigation state
            // New user
            //Game.getNavigationState().setScreen(Screen.Story);

            Utils.showNavDiv();
            Utils.showHeader();
            // Existing user
            Game.getNavigationState().setScreen(Screen.Profile)
        };

        storyContainer.appendChild(loginButton);
        

        const textContainer: HTMLSpanElement = document.createElement("span");
        textContainer.id = "typed";
        const t: Typed = new Typed(textContainer, chapterLogin.login);
        t.start();

        storyContainer.appendChild(textContainer);  


    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    delete(): void {
        super.delete();
    }
}