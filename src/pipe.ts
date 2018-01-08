import { Pipe, PipeTransform } from '@angular/core';
import 'reflect-metadata';

export const MockPipe = (pipe: Pipe): Pipe => {
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