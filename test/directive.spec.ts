import { Directive, EventEmitter, Injectable, Input, Output } from '@angular/core';

import { annotations } from '../src/util/reflection';
import { MockDirective } from '../src/directive';

@Directive({ selector: 'empty' })
class EmptyDirective {
}

@Directive({ selector: 'i-direct' })
class IDirective {
    @Input() input: any;
}

@Directive({ selector: 'o-direct' })
class ODirective {
    @Output() output: any;
}

@Directive({ selector: 'oiio-direct' })
class OIIODirective {
    @Output() @Input() outputInput: any;
    @Input() @Output() inputOutput: any;
}

@Directive({ selector: 'e-direct', exportAs: 'exported' })
class EDirective {
    constructor() {}
}

@Directive({ selector: 's-direct' })
class SDirective {
    constructor(private service: DummyService) {}
}

@Injectable()
class DummyService {
}

describe('Mocking a Directive', () => {

    it('should mock EmptyDirective', () => {
        const mockedDirective = MockDirective(EmptyDirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('EmptyDirective');
        expect(annotationMetadata[0].selector).toBe('empty');
    });

    it('should mock IDirective', () => {
        const mockedDirective = MockDirective(IDirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('IDirective');
        expect(annotationMetadata[0].selector).toBe('i-direct');
        expect(annotationMetadata[0].inputs).toEqual(['input']);
    });

    it('should mock ODirective', () => {
        const mockedDirective = MockDirective(ODirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('ODirective');
        expect(annotationMetadata[0].selector).toBe('o-direct');
        expect(annotationMetadata[0].outputs).toEqual(['output']);
        expect(mockedDirective.prototype['output'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock OIIODirective', () => {
        const mockedDirective = MockDirective(OIIODirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('OIIODirective');
        expect(annotationMetadata[0].selector).toBe('oiio-direct');
        expect(annotationMetadata[0].inputs).toEqual(['outputInput', 'inputOutput']);
        expect(annotationMetadata[0].outputs).toEqual(['outputInput', 'inputOutput']);
        expect(mockedDirective.prototype['outputInput'] instanceof EventEmitter).toBeTruthy();
        expect(mockedDirective.prototype['inputOutput'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock EDirective', () => {
        const mockedDirective = MockDirective(EDirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('EDirective');
        expect(annotationMetadata[0].selector).toBe('e-direct');
        expect(annotationMetadata[0].exportAs).toBe('exported');
    });

    it('should mock SDirective', () => {
        const mockedDirective = MockDirective(SDirective);
        const annotationMetadata = annotations(mockedDirective);
        expect(mockedDirective['name']).toBe('SDirective');
        expect(annotationMetadata[0].selector).toBe('s-direct');
        // TODO check constructor parameters
    });
});
