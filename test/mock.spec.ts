import { Component, Pipe, PipeTransform } from '@angular/core';
import 'reflect-metadata';

import { Mock } from '../src/mock';

// import like this for spyOn to work
// https://stackoverflow.com/a/43532075
import * as MockComponentFn from '../src/component';
import * as MockPipeFn from '../src/pipe';

@Component({ selector: 'empty', template: 'empty template' })
class EmptyComponent {
}

@Pipe({ name: 'empty' })
class EmptyPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

describe('Mock function', () => {

    it('should detect a Component type', () => {
        const spyComponent = spyOn(MockComponentFn, 'MockComponent');
        const mockedElements: Array<any> = Mock(EmptyComponent);
        expect(mockedElements.length).toBe(1);
        expect(spyComponent).toHaveBeenCalled();
    });

    it('should detect a Pipe type', () => {
        const spyPipe = spyOn(MockPipeFn, 'MockPipe');
        const mockedElements: Array<any> = Mock(EmptyPipe);
        expect(mockedElements.length).toBe(1);
        expect(spyPipe).toHaveBeenCalled();
    });

    it('should throw an error for unknown types', () => {
        const wrapperFn = () => {
            Mock(class Unknown {});
        };
        expect(wrapperFn).toThrow();

        // alternative method for testing if errors are thrown
        // expect(Mock.bind(this, class Unknown {})).toThrow();
    });
});