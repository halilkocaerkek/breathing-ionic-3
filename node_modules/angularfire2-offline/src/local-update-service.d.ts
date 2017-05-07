import { Optional } from '@angular/core';
export declare class LocalUpdateService {
    private localForage;
    cache: {};
    queue: LocalUpdateQueue;
    constructor(localForage: any);
    update(key: any, valueFunction: any): Promise<{}>;
    private updateNext(key);
    private checkCache(key);
    private updateValue(key, localUpdate);
}
export interface LocalUpdateQueue {
    [key: string]: {
        running: boolean;
        updates: LocalUpdate[];
    };
}
export interface LocalUpdate {
    resolve: Function;
    function: Function;
}
export declare function LOCAL_UPDATE_SERVICE_PROVIDER_FACTORY(parent: LocalUpdateService, token: any): LocalUpdateService;
export declare const LOCAL_UPDATE_SERVICE_PROVIDER: {
    provide: typeof LocalUpdateService;
    deps: Optional[][];
    useFactory: (parent: LocalUpdateService, token: any) => LocalUpdateService;
};
