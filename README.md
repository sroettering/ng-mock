[![NPM version](https://badge.fury.io/js/ng2-mock.svg)](http://badge.fury.io/js/ng2-mock)

# ng2-mock

An easy way to mock Angular.

```
npm install --save-dev ng2-mock
```

## Currently Supported Angular Elements

- [x] Component (since 0.0.1)
- [x] Pipe
- [ ] Directive
- [ ] Service
- [ ] Guard
- [ ] Module

## Usage

Just call the `Mock()` function with your desired class(es) and let ng2-mock do the magic.

## Examples

Mock() accepts an arbitrary number of supported angular elements as an argument and returns their mocked versions.

```typescript
import { Mock } from 'ng2-mock';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Mock(MyAComponent),
        Mock(MyBComponent, MyCComponent, APipe),
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
