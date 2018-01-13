import { Directive, EventEmitter, Input, Output } from '@angular/core';

import { annotations, propertyDecorators, propertiesWithDecoratorType } from './util/reflection';

export function MockDirective(directive: any): any {
    const annotationMetadata = annotations(directive);
    const propertyMetadata = propertyDecorators(directive);

    const metadata = {
        selector: annotationMetadata[0].selector,
        exportAs: annotationMetadata[0].exportAs,
        inputs: propertiesWithDecoratorType(propertyMetadata, Input),
        outputs: propertiesWithDecoratorType(propertyMetadata, Output),
    };

    const c = class {
    };

    Object.defineProperty(c, 'name', { value: directive['name'] });

    metadata.outputs.forEach(output => {
        c.prototype[output] = new EventEmitter<any>();
    });

    return Directive(metadata)(c as any);
}

const findPropsWithDecoratorType = (props: any = {}, decoratorType: any) => {
    const entries = Object.entries(props);
    return entries.filter(entry => entry[1].some(decorator => decorator instanceof decoratorType))
        .map(entry => entry[0]);
};