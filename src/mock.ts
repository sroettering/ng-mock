import {Component, Pipe, Type} from '@angular/core';

import {MockComponent} from './component';
import {MockPipe} from './pipe';

function isOfType<T>(annotations: any[], type: Type<T>): boolean {
    return annotations && annotations.some(annotation => annotation instanceof type);
}

export function MockElement(element: any): any {
    const annotations = Reflect.getMetadata('annotations', element);
    if (isOfType(annotations, Component)) {
        return MockComponent(element);
    } else if (isOfType(annotations, Pipe)) {
        return MockPipe(element);
    }
    throw new TypeError("ng2-mock currently does not support this type");
}

export function Mock(...elements: any[]): any[] {
    return elements.map(element => MockElement(element));
}
