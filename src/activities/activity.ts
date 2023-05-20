import { Utils } from "../utils"
import { IRenderer } from "../renderers/renderer";

export abstract class AActivity implements IRenderer {
    abstract buildDOM(): void;
    abstract clearDOM(): void;

    delete(): void {}
}