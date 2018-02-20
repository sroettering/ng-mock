import { Injectable } from '@angular/core';

import { isOfType } from '../src/util/reflection';
import { MockService } from "../src/service";

@Injectable()
class EmptyService {
}

@Injectable()
class ComplexService {
    value = 42;

    constructor(a: any, b: any) {
    }

    doSomeThing() {
        return this.value
    }
}

describe('Mocking a Service', () => {

    it('should mock EmptyService and return a provider object', () => {
        const mockedService = MockService(EmptyService);
        expect(mockedService).toBeTruthy();
        expect(mockedService.provide).toEqual(EmptyService);
        expect(mockedService.useValue).toBeTruthy();
        expect(isOfType(mockedService.useValue, Injectable)).toBeTruthy();
        expect(() => new mockedService.useValue()).not.toThrow();
    });

    it('should mock ComplexService', () => {
        const mockedService = MockService(ComplexService).useValue;
        expect(mockedService).toBeTruthy();
        expect(isOfType(mockedService, Injectable)).toBeTruthy();
        expect(() => new mockedService('param 1', [1, 2, 3])).not.toThrow();
        expect(() => mockedService.doSomeThing()).not.toThrow();
        expect(mockedService.doSomeThing()).toBeUndefined();
        expect(mockedService.value).toBeUndefined();
    });
});
