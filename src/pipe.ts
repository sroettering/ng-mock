import {Pipe, PipeTransform} from '@angular/core';

import {annotations} from './util/reflection';

export function MockPipe(pipe: any): any {
    const annotationMetadata = annotations(pipe)
        .filter(annotation => annotation instanceof Pipe);

    const metadata = {
        name: annotationMetadata[0].name
    };

    class _ implements PipeTransform {
        transform(input: any, ...args: any[]): any {
            return input;
        }
    }

    return Pipe(metadata)(_ as any);
}
