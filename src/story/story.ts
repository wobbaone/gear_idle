import { IRenderer } from "../renderers/renderer";

export abstract class AStory implements IRenderer {
    abstract buildDOM(): void;
    abstract clearDOM(): void;

    delete(): void {}
}