import { IStory } from "./story";

export class IntroStory implements IStory {
    getStory (): string {
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

        const nextButton: HTMLButtonElement = document.createElement("button");
        nextButton.textContent = "login";
        storyContainer.appendChild(nextButton);
        nextButton.onclick = ()=> { 
            //MessagingBus.publishToStoryChange(story); 
            //this.parent.buildDOM();
        };
*/
        return "";
    }

    onGameTick(): void {
        return;
    }
}