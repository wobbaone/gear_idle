export interface IDeletable {
    delete(): void
}

abstract class AContainer<T> {
    protected value: T;
    
    constructor(value: T) {
        this.value = value;
    }
     
    get(): T {
        return this.value;
    }

    set(value: T): void {
        this.value = value;
    }
}

export class DeletableContainer<T extends IDeletable> extends AContainer<T> {
    constructor(value: T) {
        super(value);
    }

    set(value: T): void {
        this.value.delete();
        super.set(value);
    }
}

export class NullableDeletableContainer<T extends IDeletable> extends AContainer<T | null> {
    constructor(value: T | null) {
        super(value);
    }

    set(value: T | null): void {
        if (this.value !== null) {
            this.value.delete();
        }

        super.set(value);
    }
}

export class DeletableContainerMap<TKey, TValue extends IDeletable> {
    protected data: Map<TKey, DeletableContainer<TValue>> = new Map<TKey,  DeletableContainer<TValue>>();

    constructor(copy?: DeletableContainerMap<TKey, TValue> | undefined) {
        if (copy === undefined) {
            this.data = new Map<TKey,  DeletableContainer<TValue>>();
        } else {
            this.data = copy.data;
        }
    }

    get(key: TKey): TValue | undefined {
        const entry: (DeletableContainer<TValue> | undefined) = this.data.get(key);
        if (entry === undefined) {
            return undefined;
        }

        return entry.get();
    }

    delete(key: TKey): boolean {
        const entry: TValue | undefined = this.get(key);
        if (entry === undefined) {
            return false;
        } 

        entry.delete();
        return this.data.delete(key);
    }

    set(key: TKey, value: TValue): void {
        const entry: (DeletableContainer<TValue> | undefined) = this.data.get(key);
        if (entry === undefined) {
            this.data.set(key, new DeletableContainer(value));
            return;
        } 

        entry.get().delete();
        entry.set(value);
    }

    clear(): void {
        for (const entry of this.data.values()) {
            entry.get().delete();
        }
        this.data.clear();
    }

    iterate(): IterableMapData<TKey, TValue> {
        return new IterableMapData<TKey, TValue>(this);
    }
}


export class NullableDeletableContainerMap<TKey, TValue extends IDeletable> {
    protected data: Map<TKey, NullableDeletableContainer<TValue>>;

    constructor(copy?: NullableDeletableContainerMap<TKey, TValue> | undefined) {
        if (copy === undefined) {
            this.data = new Map<TKey,  DeletableContainer<TValue>>();
        } else {
            this.data = copy.data;
        }
    }

    get(key: TKey): TValue | null | undefined {
        const entry: (NullableDeletableContainer<TValue> | undefined) = this.data.get(key);
        if (entry === undefined) {
            return undefined;
        }

        return entry.get();
    }

    delete(key: TKey): boolean {
        const entry: TValue | null | undefined = this.get(key);
        if (entry === undefined) {
            return false;
        } 
        if (entry === null) {
            return this.data.delete(key);
        }

        entry.delete();
        return this.data.delete(key);
    }

    set(key: TKey, value: TValue | null): void {
        const entry: (NullableDeletableContainer<TValue> | undefined) = this.data.get(key);
        if (entry === undefined) {
            this.data.set(key, new NullableDeletableContainer(value));
            return;
        } 

        const entryValue: TValue | null = entry.get()
        if (entryValue === null) {
            entry.set(value);
            return;
        }

        entryValue.delete();
        entry.set(value);
    }

    clear(): void {
        for (const entry of this.data.values()) {
            const entryValue: TValue | null = entry.get()
            if (entryValue === null) {
                continue;
            }
            
            entryValue.delete();
        }
        this.data.clear();
    }

    iterate(): NullableIterableMapData<TKey, TValue> {
        return new NullableIterableMapData<TKey, TValue>(this);
    }
}

class NullableDeletableContainerWrapper<TKey, TValue extends IDeletable> extends NullableDeletableContainerMap<TKey, TValue> {
    getData(): Map<TKey, NullableDeletableContainer<TValue>> {
        return this.data;
    }
}
class DeletableContainerWrapper<TKey, TValue extends IDeletable> extends DeletableContainerMap<TKey, TValue> {
    getData(): Map<TKey, DeletableContainer<TValue>> {
        return this.data;
    }
}

class NullableIterableMapData<TKey, TValue extends IDeletable> implements Iterable<[TKey, TValue]> {
    private container: NullableDeletableContainerMap<TKey, TValue>;

    constructor(container: NullableDeletableContainerMap<TKey, TValue>) {
        this.container = container;
    }

    [Symbol.iterator](): Iterator<[TKey, TValue]> {
        return new NullableMapIterator(new NullableDeletableContainerWrapper<TKey, TValue>(this.container));
    }
}
class NullableMapIterator<TKey, TValue extends IDeletable> implements Iterator<[TKey, TValue]> {
    private keyPointer: number = 0;
    private container: NullableDeletableContainerWrapper<TKey, TValue>;
    private keys: TKey[];

    constructor(container: NullableDeletableContainerWrapper<TKey, TValue>) {
        this.container = container;
        this.keys = Array.from(container.getData().keys());
    }

    next(): IteratorResult<[TKey, TValue]> {
        while (this.keyPointer < this.keys.length) {
            const key: TKey = this.keys[this.keyPointer++];
            const currentItem: TValue | null | undefined = this.container.get(key);
            if (currentItem === undefined) {
                continue
            }
            if (currentItem === null) {
                continue;
            }
            const value: TValue = currentItem;

            return new class implements IteratorYieldResult<[TKey, TValue]> {
                done: false = false;
                value: [TKey, TValue] = [key, value];
            }();
        }    

        return new class implements IteratorReturnResult<null> {
            done: true = true;
            value: null = null;
        }();
    }
}

class IterableMapData<TKey, TValue extends IDeletable> implements Iterable<[TKey, TValue]> {
    private container: DeletableContainerMap<TKey, TValue>;

    constructor(container: DeletableContainerMap<TKey, TValue>) {
        this.container = container;
    }

    [Symbol.iterator](): Iterator<[TKey, TValue]> {
        return new MapIterator(new DeletableContainerWrapper<TKey, TValue>(this.container));
    }
}
class MapIterator<TKey, TValue extends IDeletable> implements Iterator<[TKey, TValue]> {
    private keyPointer: number = 0;
    private container: DeletableContainerWrapper<TKey, TValue>;
    private keys: TKey[];

    constructor(container: DeletableContainerWrapper<TKey, TValue>) {
        this.container = container;
        this.keys = Array.from(container.getData().keys());
    }

    next(): IteratorResult<[TKey, TValue]> {
        while (this.keyPointer < this.keys.length) {
            const key: TKey = this.keys[this.keyPointer++];
            const currentItem: TValue | undefined = this.container.get(key);
            if (currentItem === undefined) {
                continue
            }

            const value: TValue = currentItem;
            return new class implements IteratorYieldResult<[TKey, TValue]> {
                done: false = false;
                value: [TKey, TValue] = [key, value];
            }();
        }    

        return new class implements IteratorReturnResult<null> {
            done: true = true;
            value: null = null;
        }();
    }
}
