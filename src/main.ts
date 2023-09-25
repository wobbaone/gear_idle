import { NavigationState } from "./client/navigation";
import { Client } from "./client/client";
import { Zones } from "./commons/zones/zoneManager";

export namespace Game {
    class GameState {   
        private gameLoopThread: number | null;
    
        constructor() {
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
            
            const zone: Zones.AZoneRenderer | null = Client.getCurrentZoneActivity();
            if (zone !== null) {
                zone.onGameTick();
            }
        }
    }
    
    const game = new GameState();
    game.start();
}

