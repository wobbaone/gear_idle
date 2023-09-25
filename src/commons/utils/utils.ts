export class Utils {
    // returns the result inclusive
    static randomIntBetween(min: number, max: number) : number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}