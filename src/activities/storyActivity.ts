import { AActivity } from "./activity";
import { Player } from "../player";
import { Utils } from "../utils/utils";
import  * as chapter1 from '../story/chapter1.json';
import  Typed  from "../../imports/typed/typed_2.0.16";

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
        
        const storyContainer: HTMLDivElement = document.createElement("div");
        storyContainer.className = "story";
        storyContainer.id = "typed";
        body.appendChild(storyContainer);

        //load Typed.js
        
        const scriptTag: HTMLScriptElement = document.createElement("script");
        const t : Typed = new Typed(storyContainer, chapter1.intro_text);
        t.start();
    }

    clearDOM(): void {
        Utils.clearAllDOM();
    }

    delete(): void {
        super.delete();
    }
}