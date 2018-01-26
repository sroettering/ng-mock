import { Component, EventEmitter, Injectable, Input, Output, ViewChild } from '@angular/core';
import { MockComponent } from '../src/component';

import { annotations } from '../src/util/reflection';

@Component({ selector: 'empty', template: 'empty template' })
class EmptyComponent {
}

@Component({ selector: 'i-comp', template: 'i-component template' })
class IComponent {
    @Input() input: any;
}

@Component({ selector: 'o-comp', template: 'o-component template' })
class OComponent {
    @Output() output: any;
}

@Component({ selector: 'oiio-comp', template: 'oiio-component template' })
class OIIOComponent {
    @Output() @Input() outputInput: any;
    @Input() @Output() inputOutput: any;
}

@Component({ selector: 'v-comp', template: '<h1></h1>' })
class VComponent {
    @ViewChild('h1') headline: any;
}

@Component({ selector: 's-comp', template: 's-component template' })
class SComponent {
    constructor(private service: DummyService) {}
}

@Injectable()
class DummyService {
}

@Component({selector: 'e-comp', template: 'e-comp template', exportAs: 'other-selector'})
class EComponent {
}

@ClassDecorator()
@Component({selector: 'd-comp', template: 'd-comp template'})
@OtherClassDecorator()
class DComponent {
}

function ClassDecorator() {
    return (target) => {
    };
}

function OtherClassDecorator() {
    return (target) => {
    };
}

describe('Mocking a Component', () => {

    it('should mock EmptyComponent', () => {
        const mockedComponent = MockComponent(EmptyComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('EmptyComponent');
        expect(annotationMetadata[0].selector).toBe('empty');
        expect(annotationMetadata[0].template).toBe('');
    });

    it('should mock IComponent', () => {
        const mockedComponent = MockComponent(IComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('IComponent');
        expect(annotationMetadata[0].selector).toBe('i-comp');
        expect(annotationMetadata[0].template).toBe('');
        expect(annotationMetadata[0].inputs).toEqual(['input']);
    });

    it('should mock OComponent', () => {
        const mockedComponent = MockComponent(OComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('OComponent');
        expect(annotationMetadata[0].selector).toBe('o-comp');
        expect(annotationMetadata[0].template).toBe('');
        expect(annotationMetadata[0].outputs).toEqual(['output']);
        expect(mockedComponent.prototype['output'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock OIIOComponent', () => {
        const mockedComponent = MockComponent(OIIOComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('OIIOComponent');
        expect(annotationMetadata[0].selector).toBe('oiio-comp');
        expect(annotationMetadata[0].template).toBe('');
        expect(annotationMetadata[0].inputs).toEqual(['outputInput', 'inputOutput']);
        expect(annotationMetadata[0].outputs).toEqual(['outputInput', 'inputOutput']);
        expect(mockedComponent.prototype['outputInput'] instanceof EventEmitter).toBeTruthy();
        expect(mockedComponent.prototype['inputOutput'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock VComponent', () => {
        const mockedComponent = MockComponent(VComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('VComponent');
        expect(annotationMetadata[0].selector).toBe('v-comp');
        expect(annotationMetadata[0].template).toBe('');
    });

    it('should mock SComponent', () => {
        const mockedComponent = MockComponent(SComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('SComponent');
        expect(annotationMetadata[0].selector).toBe('s-comp');
        expect(annotationMetadata[0].template).toBe('');
        // TODO check constructor parameters
    });

    it('should mock EComponent', () => {
        const mockedComponent = MockComponent(EComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('EComponent');
        expect(annotationMetadata[0].selector).toBe('e-comp');
        expect(annotationMetadata[0].template).toBe('');
        expect(annotationMetadata[0].exportAs).toBe('other-selector');
    });

    it('should mock DComponent', () => {
        const mockedComponent = MockComponent(DComponent);
        const annotationMetadata = annotations(mockedComponent);
        expect(mockedComponent['name']).toBe('DComponent');
        expect(annotationMetadata[0] instanceof Component).toBeTruthy();
        expect(annotationMetadata[0].selector).toBe('d-comp');
        expect(annotationMetadata[0].template).toBe('');
    });
});
