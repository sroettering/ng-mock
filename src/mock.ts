import { Component, Pipe } from '@angular/core';

import { MockComponent } from './component';
import { MockPipe } from './pipe';

function MockElement(element: any): any {
    if (element instanceof Component) {
        return MockComponent(element);
    } else if (element instanceof Pipe) {
        return MockPipe(element);
    }
    console.warn('Type is currently not supported by ng2-mock. Returning identity.');
    return element;
};

export function Mock(...elements: any[]): any[] {
    return elements.map(element => MockElement(element));
};
