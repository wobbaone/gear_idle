import { Utils } from "../utils/utils"
import { IRenderer } from "../renderers/renderer";
import { IDeletable } from "../utils/deletable";

export abstract class AActivity implements IRenderer, IDeletable {
    abstract buildDOM(): void;
    abstract clearDOM(): void;

    delete(): void {
        this.clearDOM();
    }
}