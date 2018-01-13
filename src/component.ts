import { Component, EventEmitter, Input, Output } from '@angular/core';

import { annotations, propertyDecorators, propertiesWithDecoratorType } from './util/reflection';

export function MockComponent(component: any): any {
    const annotationMetadata = annotations(component);
    const propertyMetadata = propertyDecorators(component);

    const metadata = {
        selector: annotationMetadata[0].selector,
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
