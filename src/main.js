import { useEffect, useState } from "react";

class EventEmitter {

  subscribe(eventName, fn) {
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

  emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }
}
const eventEmitter = new EventEmitter();
function GlobalLoading() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe("changeLoading", setLoading);
    return () => unsubscribe();
  }, []);
  return loading;
}
exports.GlobalLoading = GlobalLoading;
exports.eventEmitter = eventEmitter;
