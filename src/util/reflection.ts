import { Type } from '@angular/core';
import 'reflect-metadata';

export function annotations(clazz: any): any[] {
    return Reflect.getOwnMetadata('annotations', clazz);
}

export function propertyDecorators(clazz: any): any[] {
    return Reflect.getMetadata('propMetadata', clazz);
}

export function propertiesWithDecoratorType(props: any = {}, decoratorType: any): string[] {
    const entries = Object.entries(props);
    return entries
        .filter(entry => entry[1]
        .some(decorator => decorator instanceof decoratorType))
        .map(entry => entry[0]);
};

export function isOfType<T>(element: any, type: Type<T>): boolean {
    const annotationMetadata = annotations(element);
    return annotationMetadata && annotationMetadata.some(annotation => annotation instanceof type);
}