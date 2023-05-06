import { NavigationState } from "./navigation";

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
    }

    getNavigationState(): NavigationState {
        return this.navigation;
    }
}

const game = new GameState();
game.start();
