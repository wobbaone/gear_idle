export class Utils {
    static addOnClickToElement(id: string, onClickEvent: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null) {
        const element: HTMLElement | null = document.getElementById(id);
        if (element === null) {
            console.error("Tried to add an onClick event to id (" + id + ") that does not exist in DOM")
            return;
        }

        element.onclick = onClickEvent;
    }
}