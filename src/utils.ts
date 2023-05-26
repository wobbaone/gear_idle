export class Utils {
    static addOnClickToElement(id: string, onClickEvent: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
        const element: HTMLElement | null = document.getElementById(id);
        if (element === null) {
            console.error("Tried to add an onClick event to id (" + id + ") that does not exist in DOM")
            return;
        }

        element.onclick = onClickEvent;
    }
    
    static getHeaderDiv(): HTMLElement {
        const headerNode = document.getElementById("header");
        if (headerNode === null) {
            console.error("Could not find the header html element to draw to");

            return document.body;
        }

        return headerNode;
    }

    static getContentDiv(): HTMLElement {
        const bodyNode = document.getElementById("body");
        if (bodyNode === null) {
            console.error("Could not find the body html element to draw to");

            return document.body;
        }

        return bodyNode;
    }

    static showNavDiv(): void {
        const navNode = document.getElementById("navigation");
        if (navNode === null) {
            console.error("Could not find the navigation html element to draw to");
            return;
        }

        navNode.className = "navigation"

        return;
    }

    static hideNavDiv(): void {
        const navNode = document.getElementById("navigation");
        if (navNode === null) {
            console.error("Could not find the navigation html element to draw to");
            return;
        }

        navNode.className = "hidden"

        return;
    }

    static showHeader(): void {
        const headerNode = document.getElementById("header");
        if (headerNode === null) {
            console.error("Could not find the navigation html element to draw to");
            return;
        }

        headerNode.className = "header"

        return;
    }

    static hideHeader(): void {
        const headerNode = document.getElementById("header");
        if (headerNode === null) {
            console.error("Could not find the navigation html element to draw to");
            return;
        }

        headerNode.className = ""

        return;
    }
    
    public static clearAllDOM(): void {
        const header: HTMLElement = Utils.getHeaderDiv();
        while (header.firstChild) {
            header.removeChild(header.firstChild);
        }
    

        const body: HTMLElement = Utils.getContentDiv();
        while (body.firstChild) {
            body.removeChild(body.firstChild);
        }
    }

    // returns the result inclusive
    public static randomIntBetween(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}