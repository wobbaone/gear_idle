import { IStory } from "./story";

export class IntroStory implements IStory {
    getStory (): string {
        return "";
    }

    onGameTick(): void {
        return;
    }
}