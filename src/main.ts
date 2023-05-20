import { NavigationState } from "./navigation";
import { Player } from "./player";
import { IZone } from "./zones/zone";

export namespace Game {
    class GameState {
        private navigation: NavigationState;
    
        private gameLoopThread: number | null;
    
        constructor() {
            this.navigation = new NavigationState();
            this.gameLoopThread = null;
        }
    
        start(): void {
            stop();
    
            this.gameLoopThread = setInterval(this.gameLoop, 1000);
        }
    
        stop(): void {
            if (this.gameLoopThread === null) {
                return;
            } 
    
            clearInterval(this.gameLoopThread);
        }
    
        gameLoop(): void {
            console.log("In game loop");
            
            const zone: IZone | null = Player.getCurrentZoneActivity().getCurrentZone();
            if (zone !== null) {
                zone.onGameTick();
            }
        }
    
        getNavigationState(): NavigationState {
            return this.navigation;
        }
    }
    
    const game = new GameState();
    game.start();

    export function getNavigationState(): NavigationState {
        return game.getNavigationState();
    }
}

