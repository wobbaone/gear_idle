export abstract class Identifiable {
    private static lastId: number = 0;

    private id: number;

    constructor() {
        this.id = ++Identifiable.lastId;
    }
   
    getId(): number {
        return this.id;
    }
}