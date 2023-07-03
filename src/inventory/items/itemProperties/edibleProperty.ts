import { Entry } from "../itemEntry";
import { AItemProperty } from "../itemProperty";
import { CharacterData } from "../../../entities/characterData";
import { HealthData } from "../../../entities/health";
import { AItemPropertyState, ATypedPropertyState } from "../../itemPropertyState";

export class EdibleProperty extends AItemProperty {
    static TAG: string = "Edible";

    private healAmount: number;

    constructor(parent: Entry, healAmount: number) {
        super(parent, "EdibleProperty", [EdibleProperty.TAG]);

        this.healAmount = healAmount;
    }

    createState(): AItemPropertyState {
        return new EdiblePropertyState(this);
    }

    getHealAmount(): number {
        return this.healAmount;
    }
}

class EdiblePropertyState extends ATypedPropertyState<EdibleProperty> {   
    onEat(owner: CharacterData): void {
        owner.getHealth().healDamage(this.typedParent.getHealAmount());
    }

    shouldEat(owner: CharacterData): boolean {
        const ownerHealth: HealthData = owner.getHealth();
        return ownerHealth.getMaxHealth() - ownerHealth.getCurrentHealth() >= this.typedParent.getHealAmount();
    }
}