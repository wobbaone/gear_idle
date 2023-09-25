import { PlayerCharacterData } from "@/entities/characterData";
import { DeletableContainerMap } from "@COMMONS/utils/deletable";

export namespace CharacterManager {
    class CharacterManagerState {
        private playerMap: DeletableContainerMap<number, PlayerCharacterData>;

    }
}