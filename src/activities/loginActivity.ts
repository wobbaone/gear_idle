import { AActivity } from "./activity";
import { Player } from "../player";
import { Utils } from "../utils";
import chapterLogin from '../story/chapterLogin.json';
import  Typed  from "../../imports/typed_2.0.16";
import { Game } from "../main";
import {Screen} from "../navigation"
import { IntroStory } from "../story/introStory";

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
        loginContainer.id = "login-container";
        body.appendChild(loginContainer);

        const storyContainer: HTMLSpanElement = document.createElement("span");
        storyContainer.className = "login-story";
        body.appendChild(storyContainer); 

        const loginButton: HTMLDivElement = document.createElement("div");
        loginButton.id = "login-button";
        loginButton.role = "button";
        loginButton.textContent = "Snap out of it";

        const progressBar: HTMLProgressElement = document.createElement("progress");
        progressBar.id = "wake-progress";
        progressBar.max = 100;
        progressBar.value = 0;
        loginButton.appendChild(progressBar);


        var clickWake = false;
        var wakeProgress = 0;

        function wake () { 
            var newUser = true;
            
            if (newUser) {
                // New user
                body.removeChild(storyContainer);
            
                const s: IntroStory = new IntroStory();
                s.buildDOM();
            } else {
                // Existing user
                Utils.showNavDiv();
                Utils.showHeader();
                Game.getNavigationState().setScreen(Screen.Profile);
            }
        }

        loginButton.onclick = ()=> { 

            if(clickWake == false ) {
                clickWake = true;
                const wakeInterval = setInterval( function progressHanlder () {
                    wakeProgress += 10; 
                    progressBar.value = wakeProgress; 
                    if ( wakeProgress >= progressBar.max ) {
                        clearInterval(wakeInterval);
                        wake();
                    }
                }, 500);
            }
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