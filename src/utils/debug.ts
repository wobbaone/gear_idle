export namespace Debug {
    export function getCallerClass(methodAfter?: string, position?: number): string {
        try {
            throw new Error();
        } catch (e: any) {
            if (!(e instanceof Error)) {
                return "Unknown caller";
            }

            if (e.stack === undefined) {
                return "Unknown caller";
            }

            if (methodAfter === undefined) {
                const stackElements: string[] = e.stack.split("at ");
                if (stackElements.length <= 3) {
                    return stackElements[stackElements.length - 1].split(" (")[0];
                } 
                return stackElements[3].split(" (")[0];
            }
            
            const stackElements: string[] = e.stack.split("at ");
            for(let i: number = 0; i < stackElements.length; i++) {
                if (!stackElements[i].includes(methodAfter)) {
                    continue;
                }
                if (position === undefined) {
                    position = 1;
                }
                if (stackElements.length > i + position) {
                    return stackElements[i + position].split(" (")[0];
                } else {
                    break;
                }
            }

            return "Unknown caller";
        }
    }
}