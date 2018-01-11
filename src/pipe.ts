import { Pipe, PipeTransform } from '@angular/core';
import 'reflect-metadata';

export function MockPipe(pipe: any): any {
    const annotations = Reflect.getOwnMetadata('annotations', pipe);

    const metadata = {
        name: annotations[0].name
    };

    class _ implements PipeTransform {
        transform(input: any, ...args: any[]): any {
            return input;
        }
    }

    return Pipe(metadata)(_ as any);
}
