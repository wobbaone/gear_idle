import { NavigationState } from "./navigation";
import { Player } from "./player";
import { Zones } from "./zones/zones";

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
    
            this.gameLoopThread = setInterval(this.gameLoop, 100);
        }
    
        stop(): void {
            if (this.gameLoopThread === null) {
                return;
            } 
    
            clearInterval(this.gameLoopThread);
        }
    
        gameLoop(): void {
            console.log("In game loop");
            
            const zone: Zones.AZoneRenderer | null = Player.getCurrentZoneActivity();
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

