import { Component, EventEmitter, Input, Output } from '@angular/core';

import { annotations, propertiesWithDecoratorType, propertyDecorators } from './util/reflection';

export function MockComponent(component: any): any {
    let metadata;

    if (typeof component === 'object') {
        metadata = {
            selector: component.selector,
            exportAs: component.exportAs,
            template: component.template || '',
            inputs: component.inputs || [],
            outputs: component.outputs || [],
        };
    } else {
        const annotationMetadata = annotations(component);
        const propertyMetadata = propertyDecorators(component);

        metadata = {
            selector: annotationMetadata[0].selector,
            exportAs: annotationMetadata[0].exportAs,
            template: '',
            inputs: propertiesWithDecoratorType(propertyMetadata, Input),
            outputs: propertiesWithDecoratorType(propertyMetadata, Output),
        };
    }

    const c = class {
    };

    Object.defineProperty(c, 'name', { value: component['name'] || 'TestComponent' });

    metadata.outputs.forEach(output => {
        c.prototype[output] = new EventEmitter<any>();
    });

    return Component(metadata)(c as any);
}
