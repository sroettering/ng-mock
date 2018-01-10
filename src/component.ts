import { Component, EventEmitter, Input, Output } from '@angular/core';
import 'reflect-metadata';

export function MockComponent(component: any): any {
    const annotations = Reflect.getOwnMetadata('annotations', component);
    const propertyMetadata = Reflect.getMetadata('propMetadata', component);

    const metadata = {
        selector: annotations[0].selector,
        template: '',
        inputs: findPropsWithDecoratorType(propertyMetadata, Input),
        outputs: findPropsWithDecoratorType(propertyMetadata, Output),
    };

    class _ {
    }

    metadata.outputs.forEach(output => {
        _.prototype[output] = new EventEmitter<any>();
    });

    return Component(metadata)(_ as any);
}

const findPropsWithDecoratorType = (props: any = {}, decoratorType: any) => {
    const entries = Object.entries(props);
    return entries.filter(entry => entry[1].some(decorator => decorator instanceof decoratorType))
        .map(entry => entry[0]);
};
