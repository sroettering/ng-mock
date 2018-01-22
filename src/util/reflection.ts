import { Type } from '@angular/core';
import 'reflect-metadata';

export function annotations(clazz: any): any[] {
    if (Reflect.hasOwnMetadata('annotations', clazz)) {
        return Reflect.getOwnMetadata('annotations', clazz);
    } else if (Object.getOwnPropertyDescriptor(clazz, '__annotations__')) {
        return Object.getOwnPropertyDescriptor(clazz, '__annotations__').value;
    }
    return [];
}

export function propertyDecorators(clazz: any): any {
    if (Reflect.hasOwnMetadata('propMetadata', clazz)) {
        return Reflect.getMetadata('propMetadata', clazz);
    } else if (Object.getOwnPropertyDescriptor(clazz, '__prop__metadata__')) {
        return Object.getOwnPropertyDescriptor(clazz, '__prop__metadata__').value;
    }
    return {};
}

export function propertiesWithDecoratorType(props: any = {}, decoratorType: any): string[] {
    const entries = Object.entries(props);
    return entries
        .filter(entry => entry[1]
        .some(decorator => decorator instanceof decoratorType))
        .map(entry => entry[0]);
}

export function isOfType<T>(element: any, type: Type<T>): boolean {
    const annotationMetadata = annotations(element);
    return annotationMetadata && annotationMetadata.some(annotation => annotation instanceof type);
}