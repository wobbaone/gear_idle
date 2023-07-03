import { Entry } from "./itemEntry";
import { AItemPropertyState, BlankPropertyState } from "../itemPropertyState";

export abstract class AItemProperty {
    protected parent: Entry;
    private name: string;
    private tags: string[];

    constructor(parent: Entry, name: string, tags: string[]) {
        this.parent = parent;
        this.name = name;
        this.tags = tags;
    }

    getName(): string {
        return this.name;
    }

    getTags(): string[] {
        return this.tags;
    }

    createState(): AItemPropertyState {
        return new BlankPropertyState(this);
    }
}