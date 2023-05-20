export class ItemEntry {
    private name: string;
    private id: number;
    private imagePath: string;

    constructor(id: number, name: string, imagePath: string) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
    }

    getName(): string {
        return this.name;
    }
    
    getId(): number {
        return this.id;
    }

    getImagePath(): string {
        return this.imagePath;
    }
}