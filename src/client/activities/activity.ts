import { IRenderer } from "@CLIENT/renderers/renderer";
import { IDeletable } from "@COMMONS/utils/deletable";

export abstract class AActivity implements IRenderer, IDeletable {
    abstract buildDOM(): void;
    abstract clearDOM(): void;

    delete(): void {
        this.clearDOM();
    }
}