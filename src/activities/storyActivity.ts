import { AActivity } from "./activity";
import { Player } from "../player";
import { Utils } from "../utils";
import chapter1 from '../story/chapter1.json';
import  Typed  from "../../imports/typed_2.0.16";

export enum StoryActivityType {
    Intro = 0,
    Guide = 1,
}

export class StoryActivity extends AActivity {

    constructor() {
        super();
    }

    buildDOM(): void {
        this.clearDOM();
        const body: HTMLElement = Utils.getContentDiv();
        
        const loginContainer: HTMLSpanElement = document.createElement("div");
        loginContainer.className = "login";
        body.appendChild(loginContainer);


        const storyContainer: HTMLSpanElement = document.createElement("span");
        storyContainer.className = "login-story";

        storyContainer.id = "typed";
        body.appendChild(storyContainer);
        
        const t: Typed = new Typed(storyContainer, chapter1.login);
        t.start();
        
/*
        const p1Container: HTMLParagraphElement = document.createElement("p");
        p1Container.textContent = chapter1.page1.paragraph1;
        storyContainer.appendChild(p1Container);

        const p2Container: HTMLParagraphElement = document.createElement("p");
        p2Container.textContent = chapter1.page1.paragraph2;
        storyContainer.appendChild(p2Container);

        const p3Container: HTMLParagraphElement = document.createElement("p");
        p3Container.textContent = chapter1.page1.paragraph3;
        storyContainer.appendChild(p3Container);

        const p4Container: HTMLParagraphElement = document.createElement("p");
        p4Container.textContent = chapter1.page1.paragraph4;
        storyContainer.appendChild(p4Container);

        const p5Container: HTMLParagraphElement = document.createElement("p");
        p5Container.textContent = chapter1.page1.paragraph5;
        storyContainer.appendChild(p5Container);

        const p6Container: HTMLParagraphElement = document.createElement("p");
        p6Container.textContent = chapter1.page1.paragraph6;
        storyContainer.appendChild(p6Container);

        const p7Container: HTMLParagraphElement = document.createElement("p");
        p7Container.textContent = chapter1.page1.paragraph7;
        storyContainer.appendChild(p7Container);
*/
        /*const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.textContent = "login";
        storyContainer.appendChild(nextButton);
        nextButton.onclick = ()=> { 
            //MessagingBus.publishToStoryChange(story); 
            //this.parent.buildDOM();
        };*/
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    delete(): void {
        super.delete();
    }
}