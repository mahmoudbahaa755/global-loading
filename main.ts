import { useEffect, useState } from "react";

interface EventMap {
  [eventName: string]: Array<(data?: any) => void>;
}

class EventEmitter {
  private events: EventMap = {};

  subscribe(eventName: string, fn: (data?: any) => void): () => void {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn !== eventFn
      );
    };
  }

  emit(eventName: string, data?: any): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }
}

export const globalLoader = new EventEmitter();

export function useGlobalLoading(): boolean {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = globalLoader.subscribe("changeLoading", setLoading);
    return () => unsubscribe();
  }, []);
  return loading;
}

export function startLoading() {
  globalLoader.emit("changeLoading", true);
}

export function endLoading() {
  globalLoader.emit("changeLoading", false);
}
