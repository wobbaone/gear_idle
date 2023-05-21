import { Zones } from "./zones/zones";

export namespace MessagingBus {
    export class Subscription<T> {
        private registrationId: number;
        private parent: MessagingBusData<T>;

        /** @internal */
        constructor(parent: MessagingBusData<T>, id: number) {
            this.registrationId = id;
            this.parent = parent;
        }

        unsubscribe(): void {
            if (!this.parent.subscriptions.has(this.registrationId)) {
                console.error("Could not unsubscribe from messaging bus because listener id (" + this.registrationId + ") could not be found in subscriptions");
                return;
            }

            this.parent.subscriptions.delete(this.registrationId);
        }
    }

    class SubscriptionRecord<T> {
        func: (arg: T) => void;
        order: number;

        constructor(func: (arg: T) => void, order: number) {
            this.func = func;
            this.order = order;
        }
    }

    class MessagingBusData<T> {
        lastId: number = 0;
        subscriptions: Map<number, SubscriptionRecord<T>> = new Map<number, SubscriptionRecord<T>>();

        subscribe(callback: (arg: T) => void, order?: number): Subscription<T> {
            const registrationId: number = this.getNextId();

            let orderValue: number = 0;
            if (order !== undefined) {
                orderValue = order;
            }
            
            this.subscriptions.set(registrationId, new SubscriptionRecord<T>(callback, orderValue));
            
            return new Subscription(this, registrationId);
        }

        publish(arg: T): void {
            const subscriptionCallbacks: SubscriptionRecord<T>[] = Array.from<SubscriptionRecord<T>>(this.subscriptions.values());
            subscriptionCallbacks.sort((a: SubscriptionRecord<T>, b: SubscriptionRecord<T>) => a.order - b.order);

            subscriptionCallbacks.forEach((callback: SubscriptionRecord<T>) => {
                callback.func(arg);
            });
        }

        private getNextId(): number {
            return ++this.lastId;
        }
    }

    export type ZoneChangeEvent = Zones.IZone | null;
    export type ResourceChangeEvent = readonly [resourceId: number, amount: number];

    const changeZoneBus: MessagingBusData<ZoneChangeEvent> = new MessagingBusData<ZoneChangeEvent>();
    const resourceChangeBus: MessagingBusData<ResourceChangeEvent> = new MessagingBusData<ResourceChangeEvent>();

    export function subscribeToZoneChange(callback: (zone: ZoneChangeEvent) => void, order?: number): Subscription<ZoneChangeEvent> {
        return changeZoneBus.subscribe(callback, order);
    }
    
    export function publishToZoneChange(zone: ZoneChangeEvent): void {
        changeZoneBus.publish(zone);
    }

    export function subscribeToResourceChange(callback: (resourceId: number, amount: number) => void, order?: number): Subscription<ResourceChangeEvent> {
        return resourceChangeBus.subscribe((resourceChange: ResourceChangeEvent) => {
            callback(resourceChange[0], resourceChange[1]);
        }, order);
    }
    
    export function publishToResourceChange(resourceId: number, amount: number): void {
        const resourceChange: ResourceChangeEvent = [resourceId, amount];
        resourceChangeBus.publish(resourceChange);
    }
}