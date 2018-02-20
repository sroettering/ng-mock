import { Injectable } from "@angular/core";

export function MockService(service: any): any {

    const proxy = new Proxy(service, {
        get(obj, prop) {
            if (prop === 'hasOwnProperty') {
                return (value) => obj.hasOwnProperty(value);
            }
            if (Object.getOwnPropertyDescriptor(obj, prop)) {
                return Object.getOwnPropertyDescriptor(obj, prop).value;
            }
            if (service.prototype[prop]) {
                return (...args) => undefined;
            }
            return undefined;
        },
    });

    return { provide: service, useValue: Injectable()(proxy) };
}