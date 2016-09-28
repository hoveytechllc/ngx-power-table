import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture, SetupComponentFixture, createComponentFixtureAfterSetup } from './component.factory';

import { PowerTableModule } from "./../..";
import { ITableState  } from "./../../src/TableState/ITableState.interface";

class TestObject {

    constructor(public id: number, public name: string) {

    }
}

@Component({
    selector: 'my-test-component',
    template: "<div></div>"
})
class TestTableComponent {
    public originalData: Array<TestObject>;
    public displayData: Array<TestObject>;
    public tableState: ITableState;

    /**
     *
     */
    constructor() {
        this.originalData = new Array<TestObject>();
        this.displayData = new Array<TestObject>();
    }
}

describe('PowerTableModule tests', function () {

    function configureModule(): Promise<any> {
        return TestBed.configureTestingModule({
            declarations: [TestTableComponent],
            imports: [PowerTableModule]
        }).compileComponents();
    }

    it('does create table and set displayData on consumer', (done) => {
        var template = '<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData"></table>';
        SetupComponentFixture(template, [], TestTableComponent);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestTableComponent);

            var original = new Array<TestObject>();
            for (var i = 0; i < 40; i++) {
                original.push(new TestObject(i, "Name " + i));
            }
            fix.componentInstance.originalData = original;
            fix.detectChanges();

            expect(fix.componentInstance.displayData).toBeDefined();
            expect(fix.componentInstance.displayData.length).toBe(10);
            done();
        });
    });

});
