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
    set(value: T): void {
        this.value.delete();
        super.set(value);
    }
}

export class NullableDeletableContainer<T extends IDeletable> extends AContainer<T | null> {
    set(value: T | null): void {
        if (this.value !== null) {
            this.value.delete();
        }

        super.set(value);
    }
}

export class DeletableContainerMap<TKey, TValue extends IDeletable> {
    private data: Map<TKey, DeletableContainer<TValue>> = new Map<TKey,  DeletableContainer<TValue>>();

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
}


export class NullableDeletableContainerMap<TKey, TValue extends IDeletable> {
    private data: Map<TKey, NullableDeletableContainer<TValue>> = new Map<TKey,  NullableDeletableContainer<TValue>>();

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
}
