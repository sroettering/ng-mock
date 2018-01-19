import {Component, EventEmitter, Input, Output} from '@angular/core';

import {annotations, propertiesWithDecoratorType, propertyDecorators} from './util/reflection';

export function MockComponent(component: any): any {
    const annotationMetadata = annotations(component)
        .filter(annotation => annotation instanceof Component);
    const propertyMetadata = propertyDecorators(component);

    const metadata = {
        selector: annotationMetadata[0].selector,
        exportAs: annotationMetadata[0].exportAs,
        template: '',
        inputs: propertiesWithDecoratorType(propertyMetadata, Input),
        outputs: propertiesWithDecoratorType(propertyMetadata, Output),
    };

    const c = class {
    };

    Object.defineProperty(c, 'name', { value: component['name'] });

    metadata.outputs.forEach(output => {
        c.prototype[output] = new EventEmitter<any>();
    });

    return Component(metadata)(c as any);
}
