
import { Directive, Component, OnInit, Host } from '@angular/core';

import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';

describe('Sanity check', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});


@Directive({
  selector: '[parent-attr]'
})
export class TestParentDirective {
  constructor() { }

  ngOnInit() { }
}

@Component({
  selector: 'child-comp',
  template: '<div></div>'
})
export class TestChildComponent {

  constructor(@Host() private dependency: TestParentDirective) {

   }
}


describe('Component directive relationships', () => {

  beforeEach(() => TestBed.configureTestingModule({ declarations: [TestComp, TestChildComponent, TestParentDirective] }));

  it('child component should be able to resolve parent directive', () => {

    var template = `<div parent-attr="">
                      <child-comp></child-comp>
                  </div>`;
    var fix = createComponentFixture(template);


  });
});

