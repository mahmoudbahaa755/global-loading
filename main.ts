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

const eventEmitter = new EventEmitter();

function GlobalLoading(): boolean {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe("changeLoading", setLoading);
    return () => unsubscribe();
  }, []);
  return loading;
}
export const globalLoading = GlobalLoading;

export const setGlobalLoading = (loading: boolean) => {
  eventEmitter.emit("changeLoading", loading);
};
