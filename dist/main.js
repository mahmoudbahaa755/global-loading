import { useEffect, useState } from "react";
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.events = {};
    }
    EventEmitter.prototype.subscribe = function (eventName, fn) {
        var _this = this;
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
        return function () {
            _this.events[eventName] = _this.events[eventName].filter(function (eventFn) { return fn !== eventFn; });
        };
    };
    EventEmitter.prototype.emit = function (eventName, data) {
        var event = this.events[eventName];
        if (event) {
            event.forEach(function (fn) {
                fn.call(null, data);
            });
        }
    };
    return EventEmitter;
}());
export var globalLoader = new EventEmitter();
export function useGlobalLoading() {
    var _a = useState(false), loading = _a[0], setLoading = _a[1];
    useEffect(function () {
        var unsubscribe = globalLoader.subscribe("changeLoading", setLoading);
        return function () { return unsubscribe(); };
    }, []);
    return loading;
}
export function startLoading() {
    globalLoader.emit("changeLoading", true);
}
export function endLoading() {
    globalLoader.emit("changeLoading", false);
}
