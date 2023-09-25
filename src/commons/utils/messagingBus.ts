import { ZoneManager } from "@COMMONS/zones/zoneManager";
import { Debug } from "./debug";
import { PlayerCharacterData } from "@/entities/characterData";
import { ZoneStateEnum } from "@COMMONS/zones/zoneTypes/zone";

export namespace MessagingBus {
    const DEBUG_SUBSCRIPTIONS: boolean = false;

    export class Subscription<T> {
        private registrationId: number;
        private parent: MessagingBusData<T>;

        /** @internal */
        constructor(parent: MessagingBusData<T>, id: number) {
            this.registrationId = id;
            this.parent = parent;
        }

        unsubscribe(): void {
            this.parent.unsubscribe(this.registrationId);
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
        private name: string;
        private lastId: number = 0;
        private subscriptions: Map<number, SubscriptionRecord<T>> = new Map<number, SubscriptionRecord<T>>();

        constructor(name: string) {
            this.name = name;
        }

        subscribe(callback: (arg: T) => void, order?: number): Subscription<T> {
            if (DEBUG_SUBSCRIPTIONS) {
                console.debug("Subscribed to " + this.getName() + " from " + Debug.getCallerClass(MessagingBusData.name, 2))
            }

            const registrationId: number = this.getNextId();

            let orderValue: number = 0;
            if (order !== undefined) {
                orderValue = order;
            }
            
            this.subscriptions.set(registrationId, new SubscriptionRecord<T>(callback, orderValue));
            
            return new Subscription(this, registrationId);
        }

        unsubscribe(registrationId: number): void {
            if (DEBUG_SUBSCRIPTIONS) {
                console.debug("Subscribed to " + this.getName() + " from " + Debug.getCallerClass(MessagingBusData.name, 2))
            }

            if (!this.subscriptions.has(registrationId)) {
                console.error("Could not unsubscribe from messaging bus because listener id (" + registrationId + ") could not be found in subscriptions");
                return;
            }

            this.subscriptions.delete(registrationId);
        }

        publish(arg: T): void {
            if (DEBUG_SUBSCRIPTIONS) {
                console.debug("Published to " + this.getName() + " from " + Debug.getCallerClass(MessagingBusData.name, 2))
            }

            const subscriptionCallbacks: SubscriptionRecord<T>[] = Array.from<SubscriptionRecord<T>>(this.subscriptions.values());
            subscriptionCallbacks.sort((a: SubscriptionRecord<T>, b: SubscriptionRecord<T>) => a.order - b.order);

            subscriptionCallbacks.forEach((callback: SubscriptionRecord<T>) => {
                callback.func(arg);
            });
        }

        private getNextId(): number {
            return ++this.lastId;
        }

        getName(): string {
            return this.name;
        }
    }

    export type ZoneChangeEvent = readonly [entityId: number, zone: ZoneStateEnum | null];    
    export type ResourceChangeEvent = readonly [entityId: number, resourceId: number, amount: number];
    export type ActivityProgressEvent = readonly [entityId: number, amount: number];
    export type ExecuteZoneActionEvent = readonly [entityId: number, zoneId: number];
    export type PlayerDeathActionEvent = readonly [entityId: number, zoneId: number];
    export type EnterZoneRequestEvent = readonly [entityId: number, zone: ZoneManager.Zone | null];

    const changeZoneBus: MessagingBusData<ZoneChangeEvent> = new MessagingBusData<ZoneChangeEvent>("ZoneChangeBus");
    const resourceChangeBus: MessagingBusData<ResourceChangeEvent> = new MessagingBusData<ResourceChangeEvent>("ResourceChangeBus");
    const addActivityProgressBus: MessagingBusData<ActivityProgressEvent> = new MessagingBusData<ActivityProgressEvent>("ActivityProgressBus");
    const executeZoneActionBus: MessagingBusData<ExecuteZoneActionEvent> = new MessagingBusData<ExecuteZoneActionEvent>("ZoneActionBus");
    const playerDeathActionBus: MessagingBusData<PlayerDeathActionEvent> = new MessagingBusData<PlayerDeathActionEvent>("PlayerDeathActionBus");
    const enterZoneRequestActionBus: MessagingBusData<EnterZoneRequestEvent> = new MessagingBusData<EnterZoneRequestEvent>("EnterZoneRequestActionBus");

    export function subscribeToZoneChange(callback: (entityId: number, zone: ZoneStateEnum | null) => void, order?: number): Subscription<ZoneChangeEvent> {
        return changeZoneBus.subscribe((zoneChange: ZoneChangeEvent) => {
            callback(zoneChange[0], zoneChange[1]);
        }, order);
    }  
    export function subscribeToResourceChange(callback: (entityId: number, resourceId: number, amount: number) => void, order?: number): Subscription<ResourceChangeEvent> {
        return resourceChangeBus.subscribe((resourceChange: ResourceChangeEvent) => {
            callback(resourceChange[0], resourceChange[1], resourceChange[2]);
        }, order);
    } 
    export function subscribeToAddActivityProgress(callback: (entityId: number, amount: number) => void, order?: number): Subscription<ActivityProgressEvent> {
        return addActivityProgressBus.subscribe((activityProgress: ActivityProgressEvent) => {
            callback(activityProgress[0], activityProgress[1]);
        }, order);
    }
    export function subscribeToExecuteZoneAction(callback: (entityId: number, zoneId: number) => void, order?: number): Subscription<ExecuteZoneActionEvent> {
        return executeZoneActionBus.subscribe((zoneAction: ExecuteZoneActionEvent) => {
            callback(zoneAction[0], zoneAction[1]);
        }, order);
    }
    export function subscribeToPlayerDeathAction(callback: (entityId: number, zoneId: number) => void, order?: number): Subscription<PlayerDeathActionEvent> {
        return playerDeathActionBus.subscribe((zoneAction: PlayerDeathActionEvent) => {
            callback(zoneAction[0], zoneAction[1]);
        }, order);
    }
    export function subscribeToEnterZoneRequestAction(callback: (entityId: number, zone: ZoneManager.Zone | null) => void, order?: number): Subscription<EnterZoneRequestEvent> {
        return enterZoneRequestActionBus.subscribe((zoneAction: EnterZoneRequestEvent) => {
            callback(zoneAction[0], zoneAction[1]);
        }, order);
    }

    export function publishToZoneChange(entityId: number, zone: ZoneStateEnum | null): void {
        const zoneChange: ZoneChangeEvent = [entityId, zone];
        changeZoneBus.publish(zoneChange);
    }     
    export function publishToResourceChange(entityId: number, resourceId: number, amount: number): void {
        const resourceChange: ResourceChangeEvent = [entityId, resourceId, amount];
        resourceChangeBus.publish(resourceChange);
    } 
    export function publishToAddActivityProgress(entityId: number, amount: number): void {
        const addActivityProgressEvent: ActivityProgressEvent = [entityId, amount];
        addActivityProgressBus.publish(addActivityProgressEvent);
    } 
    export function publishToExecuteZoneAction(entityId: number, zoneId: number): void {
        const zoneChange: ExecuteZoneActionEvent = [entityId, zoneId];
        executeZoneActionBus.publish(zoneChange);
    }
    export function publishToPlayerDeathAction(entityId: number, zoneId: number): void {
        const deathEvent: PlayerDeathActionEvent = [entityId, zoneId];
        playerDeathActionBus.publish(deathEvent);
    }
    export function publishToZoneChangeRequestAction(entityId: number, zone: ZoneManager.Zone | null): void {
        const deathEvent: EnterZoneRequestEvent = [entityId, zone];
        enterZoneRequestActionBus.publish(deathEvent);
    }
}