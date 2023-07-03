import { AItemPropertyState } from "./itemPropertyState";
import { Entry } from "./items/itemEntry";

export abstract class ItemState {
    private parent: Entry;

    private states: AItemPropertyState[] = [];
    private tagReferences: Map<string, number[]> = new Map<string, number[]>();

    constructor(parent: Entry) {
        this.parent = parent;

        for (const property of this.parent.getProperties()) {
            this.addState(property.createState());
        }
    }

    getData(): Entry {
        return this.parent;
    }

    private addState(property: AItemPropertyState): void {
        const index: number = this.states.push(property) - 1;

        for(const tag of property.getData().getTags()) {
            if (!this.tagReferences.has(tag)) {
                this.tagReferences.set(tag, []);
            }

            const indexes: number[] | undefined = this.tagReferences.get(tag);
            if (indexes === undefined) {
                console.error("Item entry state for entry: " + this.getData().getName() + " is in an invalid state");
                return;
            }
            indexes.push(index);
        }
    }

    getPropertyStatesWithTag(tag: string): AItemPropertyState[] {
        const indexes: number[] | undefined = this.tagReferences.get(tag);
        if (indexes === undefined) {
            console.error("Item entry state for entry: " + this.getData().getName() + " is in an invalid state");
            return [];
        }

        const result: AItemPropertyState[] = [];
        for(const index of indexes) {
            result.push(this.states[index]);
        }

        return result;
    }

    getPropertyStates(): AItemPropertyState[] {
        return this.states;
    }

    hasPropertyStateWithTag(tag: string): boolean{
        return this.tagReferences.has(tag);
    }
}

export class BlankState extends ItemState{}
