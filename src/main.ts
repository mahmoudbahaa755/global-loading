import { useEffect, useState } from "react";

class EventEmitter {
  private events: { [key: string]: Function[] } = {};

  subscribe(eventName: string, fn: Function) {
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

  emit(eventName: string, data?: boolean) {
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

export default GlobalLoading;
export { eventEmitter };
