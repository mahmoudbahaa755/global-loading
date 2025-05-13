declare class EventEmitter {
    private events;
    subscribe(eventName: string, fn: (data?: any) => void): () => void;
    emit(eventName: string, data?: any): void;
}
export declare const globalLoader: EventEmitter;
export declare function useGlobalLoading(): boolean;
export declare function startLoading(): void;
export declare function endLoading(): void;
export {};
