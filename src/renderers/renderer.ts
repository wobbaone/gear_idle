import { Utils } from "../utils/utils";

export interface IRenderer {
    buildDOM(): void;
    clearDOM(): void;
}