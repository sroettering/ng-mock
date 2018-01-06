import { 
  Component,
  Directive,
  Injectable,
  NgModule,
  Pipe
} from '@angular/core';

import { MockComponent } from './component';

const Mock = (component: Component | Pipe | Directive | Injectable | NgModule): any => {
  if (component instanceof Component) {
    return MockComponent(component);
  }
  console.warn('Could not mock your type as it is currently not supported by ng-mock.');
  return component;
};

export default Mock;