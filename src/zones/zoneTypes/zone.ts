import { AdventureActivityType } from "../../activities/adventureActivity";
import { IRenderer } from "../../renderers/renderer";

export interface IZone extends IRenderer {
    getActivityTypes(): ReadonlyArray<AdventureActivityType>;
    getName(): string;

    onGameTick(): void;
}