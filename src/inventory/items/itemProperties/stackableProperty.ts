import { AItemPropertyState, ATypedPropertyState } from "../../itemPropertyState";
import { Entry } from "../itemEntry";
import { AItemProperty } from "../itemProperty";

export class StackableProperty extends AItemProperty {
    static TAG: string = "Stackable";

    constructor(parent: Entry) {
        super(parent, "StackableProperty", [StackableProperty.TAG]);
    }

    createState(): AItemPropertyState {
        return new StackablePropertyState(this);
    }
}

export class StackablePropertyState extends ATypedPropertyState<StackableProperty>{
    private count: number = 0;

    getCount(): number {
        return this.count;
    }

    setCount(count: number): void {
        this.count = count;
    }
}