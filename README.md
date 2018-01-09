# Work in Progress

This package is a work in progress. DO NOT use it production code.

# ng2-mock

A comprehensive mocking library for Angular.

```
npm install --save-dev ng2-mock
```

## Currently Supported Angular Elements

- [x] Component (since 0.0.1)
- [ ] Pipe
- [ ] Directive
- [ ] Service
- [ ] Guard
- [ ] Module

## Usage

Just call the `Mock()` function with your desired class and let ng-mock do the magic.

## Examples

## Mocking Components
```typescript
import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import Mock from 'ng2-mock';

import { MyComplexComponent } from "./my-complex/my-complex.component";

describe('AppComponent', () => {
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Mock(MyComplexComponent),
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
```

## How does mocking actually work?

// TODO
