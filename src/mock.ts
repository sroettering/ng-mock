import { Component, Pipe, Type } from '@angular/core';

import { MockComponent } from './component';
import { MockPipe } from './pipe';

function isOfType<T>(element: any, type: Type<T>): boolean {
    const annotations = Reflect.getMetadata('annotations', element);
    return annotations && annotations.some(annotation => annotation instanceof type);
}

function MockElement(element: any): any {
    if (isOfType(element, Component)) {
        return MockComponent(element);
    } else if (isOfType(element, Pipe)) {
        return MockPipe(element);
    }
    throw new TypeError('ng2-mock currently does not support this type');
}

export function Mock(...elements: any[]): any[] {
    return elements.map(element => MockElement(element));
}
