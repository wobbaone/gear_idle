import { Utils } from "./utils";

export class HTMLContainer  {
    private content: HTMLElement;

    private children: Map<string, HTMLContainer> = new Map<string, HTMLContainer>();

    constructor(content: HTMLElement) {
        this.content = content;
    }

    getElement(): HTMLElement {
        return this.content;
    }

    getTypedElement<T extends HTMLElement>(): T { 
        return <T>this.content;
    }   

    createOrFindElement(tagName: string, id: string): HTMLContainer {
        const target: (HTMLContainer | undefined) = this.children.get(id);
        if (target !== undefined) {
            return target;
        }

        const container: HTMLContainer = new HTMLContainer(document.createElement(tagName));
        this.content.appendChild(container.getElement());
        this.children.set(id, container);
        return container;     
    }

    setImageSource(src: string): void {
        const imageElement: HTMLElement = this.content;
        if (!(imageElement instanceof HTMLImageElement)) {
            return;
        }

        // setting an image src will always cause a reflow/redraw even if the src is the same, 
        // this isn't a big deal with other elements, but images are expensive to redraw, so
        // we check if the src matches here.
        if (Utils.doesPathMatch(imageElement.src, src)) {
            return;
        }

        imageElement.src = src;     
    }
}