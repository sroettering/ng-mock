import { Component, Directive, Injectable, Pipe, PipeTransform } from '@angular/core';

import { Mock } from '../src/mock';
// import like this for spyOn to work
// https://stackoverflow.com/a/43532075
import * as MockComponentFn from '../src/component';
import * as MockPipeFn from '../src/pipe';
import * as MockDirectiveFn from '../src/directive';
import * as MockServiceFn from '../src/service';

@Component({ selector: 'empty-component', template: 'empty template' })
class EmptyComponent {
}

@Pipe({ name: 'empty-pipe' })
class EmptyPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

@Directive({ selector: 'empty-directive' })
class EmptyDirective {
}

@Injectable()
class EmptyService {
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

    it('should detect a Directive type', () => {
        const spyDirective = spyOn(MockDirectiveFn, 'MockDirective');
        const mockedElements: Array<any> = Mock(EmptyDirective);
        expect(mockedElements.length).toBe(1);
        expect(spyDirective).toHaveBeenCalled();
    });

    it('should detect an Injectable type', () => {
        const spyService = spyOn(MockServiceFn, 'MockService');
        const mockedElements: Array<any> = Mock(EmptyService);
        expect(mockedElements.length).toBe(1);
        expect(spyService).toHaveBeenCalled();
    });

    it('should accept mixed inputs', () => {
        const spyComponent = spyOn(MockComponentFn, 'MockComponent');
        const spyPipe = spyOn(MockPipeFn, 'MockPipe');
        const spyDirective = spyOn(MockDirectiveFn, 'MockDirective');
        const mockedElements: Array<any> = Mock(EmptyComponent, EmptyPipe, EmptyDirective);
        expect(mockedElements.length).toBe(3);
        expect(spyComponent).toHaveBeenCalled();
        expect(spyPipe).toHaveBeenCalled();
        expect(spyDirective).toHaveBeenCalled();
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