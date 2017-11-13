import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, fakeAsync, tick } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture, SetupComponentFixture, createComponentFixtureAfterSetup } from './TestHelpers/component.factory';

import { PowerTableModule } from "./index";
import { ITableState  } from "./TableState/ITableState.interface";
import { TestTableComponent } from "./TestHelpers/test.component.spec";
import { TestObject } from "./TestHelpers/TestObject.class";

describe('PowerTableModule tests', function () {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestTableComponent],
            imports: [PowerTableModule]
        })
    });

    // it('does create table and set displayData on consumer', fakeAsync(() => {
    //     var template = '<table [ptTable]="originalData" [(ptTableState)]="tableState" [(ptDisplayArray)]="displayData"></table>';

    //     var fix = createComponentFixture(template, [], TestTableComponent);

    //     var original = new Array<TestObject>();
    //     for (var i = 0; i < 40; i++) {
    //         original.push(new TestObject(i, "Name " + i));
    //     }
    //     fix.componentInstance.originalData = original;
    //     fix.detectChanges();
    //     tick();

    //     expect(fix.componentInstance.displayData).toBeDefined();
    //     expect(fix.componentInstance.displayData.length).toBe(10);
    // }));

});
