import { Component, Directive, Injectable, Pipe } from '@angular/core';

import { isOfType } from './util/reflection';
import { MockComponent } from './component';
import { MockDirective } from './directive';
import { MockPipe } from './pipe';
import { MockService } from "./service";

function MockElement(element: any): any {
    if (isOfType(element, Component)) {
        return MockComponent(element);
    } else if (isOfType(element, Pipe)) {
        return MockPipe(element);
    } else if (isOfType(element, Directive)) {
        return MockDirective(element);
    } else if (isOfType(element, Injectable)) {
        return MockService(element);
    }
    throw new TypeError('ng2-mock does not support this type');
}

export function Mock(...elements: any[]): any[] {
    return elements.map(element => MockElement(element));
}
