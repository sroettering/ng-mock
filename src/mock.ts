import { Component, Directive, Injectable, NgModule, Pipe } from '@angular/core';

import { MockComponent } from './component';
import { MockPipe } from './pipe';

const Mock = (element: Component | Pipe | Directive | Injectable | NgModule): any => {
    if (element instanceof Component) {
        return MockComponent(element);
    } else if (element instanceof Pipe) {
        return MockPipe(element);
    }
    console.warn('Could not mock your type as it is currently not supported by ng2-mock.');
    return element;
};

export default Mock;
