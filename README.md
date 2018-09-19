[![NPM version](https://badge.fury.io/js/ng2-mock.svg)](http://badge.fury.io/js/ng2-mock)

# ng2-mock

An easy way to mock your Angular elements.

_Note_: If you are using Angular < 5 use v0.0.7 of ng2-mock
_Note_: If you are using Angular < 6 use v0.1.0 of ng2-mock

## Currently Supported Angular Elements

- [x] Component
- [x] Pipe
- [x] Directive
- [x] Service
- [ ] Guard
- [ ] Module

## Installation

```
npm install --save-dev ng2-mock
```

## Usage

Just call the `Mock()` function with your desired class(es) and let ng2-mock do the magic.

Mock() accepts an arbitrary number of supported angular elements as an argument and returns their mocked versions.
If it detects an Injectable class, e.g. Services, as input it mocks the class and returns a provider object 
```typescript
{ provide: MyInjectableClass, useValue: MockedMyInjectableClass }
```
wrapping the mocked element, so you don't have to override the provider yourself.

__Note:__ In order for a mocked service method to return a value other than `undefined` you have to use spies (`Jasmine.spyOn()` for 
example).

## Example
```typescript
import { Mock } from 'ng2-mock';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
    
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        Mock(MyAComponent),
        Mock(MyBComponent, MyCComponent, APipe),
      ],
      providers: [
        Mock(MyAService),
        Mock(MyBService, MyCService, MyDService),  
      ],
    }).compileComponents();
    
  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
    
  }));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  
  it('should call CService.doSomething', () => {
      // Spying on a mocked service
      const cServiceInstance = TestBed.get(MyCService);
      const spy = spyOn(cServiceInstance, 'doSomething');
      app.methodWhichCallsCServiceDoSomething();
      expect(spy).toHaveBeenCalled();
    });
});
```
