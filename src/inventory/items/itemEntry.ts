import { BlankState, ItemState } from "../itemState";
import { Items } from "../items";
import { AItemProperty } from "./itemProperty";

export abstract class Entry {
    private name: string;
    private id: number;
    private imagePath: string; 

    private properties: AItemProperty[] = [];
    private tagReferences: Map<string, number[]> = new Map<string, number[]>();

    constructor(id: number, name: string, imagePath: string) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }

    getName(): string {
        return this.name;
    }
    
    getId(): number {
        return this.id;
    }

    getImagePath(): string {
        return this.imagePath;
    }

    createState(): ItemState {
        return new BlankState(this); 
    }

    getProperties(): AItemProperty[] {
        return this.properties;
    }

    addProperty(property: AItemProperty): void {
        const index: number = this.properties.push(property) - 1;

        for(const tag of property.getTags()) {
            if (!this.tagReferences.has(tag)) {
                this.tagReferences.set(tag, []);
            }

            const indexes: number[] | undefined = this.tagReferences.get(tag);
            if (indexes === undefined) {
                console.error("Item entry " + this.getName() + " is in an invalid state");
                return;
            }
            indexes.push(index);
        }
    }

    hasPropertyWithTag(tag: string): boolean {
        return this.tagReferences.has(tag);
    }

    propertyContainsAnyTag(tags: string[]): boolean {
        for(const tag of tags) {
            if (this.tagReferences.has(tag)) {
                return true;
            }
        }

        return false;
    }

    propertyContainsAllTags(tags: string[]): boolean {
        for(const tag of tags) {
            if (!this.tagReferences.has(tag)) {
                return false;
            }
        }

        return true;
    }

    getPropertiesWithTag(tag: string): AItemProperty[] {
        const indexes: number[] | undefined = this.tagReferences.get(tag);
        if (indexes === undefined) {
            console.error("Item entry " + this.getName() + " is in an invalid state");
            return [];
        }

        const result: AItemProperty[] = [];
        for(const index of indexes) {
            result.push(this.properties[index]);
        }

        return result;
    }
}