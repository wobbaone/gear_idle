import { Utils } from "../utils";

export interface IRenderer {
    buildDOM(): void;
    clearDOM(): void;
}