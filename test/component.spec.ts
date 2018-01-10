import { Component } from '@angular/core';
import 'reflect-metadata';

import { MockComponent } from '../src/component';

@Component({
    selector: 'empty',
    template: 'empty template'
})
export class EmptyComponent {
}

describe('Component', () => {
    it('should mock a simple component', () => {
        const mockedComponent = MockComponent(EmptyComponent);
        const annotations = Reflect.getMetadata('annotations', mockedComponent);
        expect(annotations[0].selector).toBe('empty');
        expect(annotations[0].template).toBe('');
    });
});
