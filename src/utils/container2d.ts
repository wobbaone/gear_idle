import { Identifiable } from "./identifiable";

export class Container2D<T extends Identifiable> implements Iterable<Container2DResult<T>>{
    private data: (T | null)[];
    private width: number;
    private height: number;

    private dataMap: Map<number, Container2DResult<T>>;
    
    constructor(width: number, height: number) {
        this.data = new Array<T | null>(width * height).fill(null);
        this.width = width;
        this.height = height;

        this.dataMap = new Map<number, Container2DResult<T>>();
    }
    
    [Symbol.iterator](): Iterator<Container2DResult<T>> {
        return new Container2DIterator<T>(this);
    }

    iterateAll(): Iterable<Container2DResult<T | null>> {
        return new NullableContainer2D<T>(this);       
    }

    get(x: number, y?: number | undefined): T | null {
        if (y == undefined) {
            return this.getByIndex(x);
        }

        return this.getByIndex(this.width * y + x);
    }

    private getByIndex(index: number): T | null {
        if (index < 0) {
            return null;
        }

        if (index >= this.data.length) {
            return null;
        }

        return this.data[index];
    }

    getFromId(id: number) : Container2DResult<T> | null {
        if (!this.dataMap.has(id)) {
            return null;
        }

        const constvalue: Container2DResult<T> | undefined = this.dataMap.get(id);
        if (constvalue === undefined) {
            return null;
        }

        return constvalue;
    }

    hasId(id: number): boolean {
        return this.dataMap.has(id)
    }

    set(value: T | null, x: number, y: number): void {
        if (x < 0 || y < 0) {
            return;
        }

        if (x > this.width - 1 || y > this.height - 1) {
            return;
        }

        const index: number = this.width * y + x;

        const currentValue: T | null = this.data[index];
        if (currentValue !== null && this.dataMap.has(currentValue.getId())) {
            this.dataMap.delete(currentValue.getId());
        }

        this.data[index] = value;

        if (value !== null) {
            this.dataMap.set(value.getId(), new Container2DResult<T>(x, y, value));
        }
    }

    removeById(id: number): void {
        const item: Container2DResult<T> | null = this.getFromId(id);
        if (item === null) {
            return;
        }

        this.set(null, item.getX(), item.getY());
    }

    getRandomEntry(): Container2DResult<T> | null {
        const data: number[] = Array.from(this.dataMap.keys());

        if (data.length === 0) {
            return null;
        }

        const index: number = Math.floor(Math.random() * data.length);
        const result: Container2DResult<T> | undefined = this.dataMap.get(data[index]);
        if (result === undefined) {
            console.error("There is an invalid entity in a zone container with id: " + data[index])
            return null;
        }

        return result;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    count(): number {
        let count: number = 0;
        for (const value of this.data) {
            if (value !== null) {
                count++;
            }
        }

        return count;
    }
}

class NullableContainer2D<T extends Identifiable> implements Iterable<Container2DResult<T | null>> {
    private parent: Container2D<T>;

    constructor(parent: Container2D<T>) {
        this.parent = parent;
    }

    [Symbol.iterator](): Iterator<Container2DResult<T | null>> {
        return new NullableIterable2DIterator<T>(this.parent);
    } 
}

class Container2DIterator<T extends Identifiable> implements Iterator<Container2DResult<T>> {
    private pointer: number = 0;
    private parent: Container2D<T>

    constructor(parent: Container2D<T>) {
        this.parent = parent;
    }

    next(): IteratorResult<Container2DResult<T>> {
        if (this.pointer >= this.parent.getWidth() * this.parent.getHeight()) {
            return new class implements IteratorReturnResult<null> {
                done: true = true;
                value: null = null;
            }();
        }

        let x: number = this.pointer % this.parent.getWidth();
        let y: number = Math.floor(this.pointer / this.parent.getWidth());

        const currentValue: T | null = this.parent.get(this.pointer++)
        if (currentValue === null) {
            return this.next();
        }
        const result: Container2DResult<T> = new Container2DResult<T>(x, y, currentValue);

        return new class implements IteratorYieldResult<Container2DResult<T>> {
            done: false = false;
            value: Container2DResult<T> = result;
        }(); 
    }
}

class NullableIterable2DIterator<T extends Identifiable> implements Iterator<Container2DResult<T | null>> {
    private pointer: number = 0;
    private parent: Container2D<T>

    constructor(parent: Container2D<T>) {
        this.parent = parent;
    }

    next(): IteratorResult<Container2DResult<T | null>> {
        if (this.pointer >= this.parent.getWidth() * this.parent.getHeight()) {
            return new class implements IteratorReturnResult<null> {
                done: true = true;
                value: null = null;
            }();
        }

        let x: number = this.pointer % this.parent.getWidth();
        let y: number = Math.floor(this.pointer / this.parent.getWidth());

        const currentValue: T | null = this.parent.get(this.pointer++)
        const result: Container2DResult<T | null> = new Container2DResult<T | null>(x, y, currentValue);

        return new class implements IteratorYieldResult<Container2DResult<T | null>> {
            done: false = false;
            value: Container2DResult<T | null> = result;
        }(); 
    }
}

export class Container2DResult<T> {
    private x: number;
    private y: number;

    private value: T;

    constructor(x: number, y: number, value: T) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    get(): T {
        return this.value;
    }
}