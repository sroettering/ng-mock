import {Component, EventEmitter, Injectable, Input, Output, ViewChild} from '@angular/core';
import 'reflect-metadata';

import {MockComponent} from '../src/component';

@Component({selector: 'empty', template: 'empty template'})
class EmptyComponent {
}

@Component({selector: 'i-comp', template: 'i-component template'})
class IComponent {
    @Input() input: any;
}

@Component({selector: 'o-comp', template: 'o-component template'})
class OComponent {
    @Output() output: any;
}

@Component({selector: 'oiio-comp', template: 'oiio-component template'})
class OIIOComponent {
    @Output() @Input() outputInput: any;
    @Input() @Output() inputOutput: any;
}

@Component({selector: 'v-comp', template: '<h1></h1>'})
class VComponent {
    @ViewChild('h1') headline: any;
}

@Component({selector: 's-comp', template: 's-component template'})
class SComponent {
    constructor(private service: DummyService) {
    }
}

@Injectable()
class DummyService {
}

describe('Mocking a Component', () => {

    it('should mock EmptyComponent', () => {
        const mockedComponent = MockComponent(EmptyComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('empty');
        expect(annotations[0].template).toBe('');
    });

    it('should mock IComponent', () => {
        const mockedComponent = MockComponent(IComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('i-comp');
        expect(annotations[0].template).toBe('');
        expect(annotations[0].inputs).toEqual(['input']);
    });

    it('should mock OComponent', () => {
        const mockedComponent = MockComponent(OComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('o-comp');
        expect(annotations[0].template).toBe('');
        expect(annotations[0].outputs).toEqual(['output']);
        expect(mockedComponent.prototype['output'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock OIIOComponent', () => {
        const mockedComponent = MockComponent(OIIOComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('oiio-comp');
        expect(annotations[0].template).toBe('');
        expect(annotations[0].inputs).toEqual(['outputInput', 'inputOutput']);
        expect(annotations[0].outputs).toEqual(['outputInput', 'inputOutput']);
        expect(mockedComponent.prototype['outputInput'] instanceof EventEmitter).toBeTruthy();
        expect(mockedComponent.prototype['inputOutput'] instanceof EventEmitter).toBeTruthy();
    });

    it('should mock VComponent', () => {
        const mockedComponent = MockComponent(VComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('v-comp');
        expect(annotations[0].template).toBe('');
    });

    it('should mock SComponent', () => {
        const mockedComponent = MockComponent(SComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('s-comp');
        expect(annotations[0].template).toBe('');
        // TODO check constructor parameters
    });
});
