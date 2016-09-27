import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';
import { PaginationComponent } from './../../src/Pagination/Pagination.component';

class TestObject {

    constructor(public id: number, public name: string) {

    }
}

@Component({
    selector: 'my-test-component',
    template: "<div></div>"
})
class TestTableDirective {
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

describe('Pagination.component tests', function () {

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [TableDirective, PaginationComponent, TestTableDirective, TestComp],
            providers: [ConfigurationProvider, DefaultDataPipeService]
        });
    });

    it('should create buttons for page count', () => {

        var template = '<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData">' +
            '<tfoot><pt-pagination></pt-pagination></tfoot></table>';
        var fix = createComponentFixture(template, [], TestTableDirective);

        var paginationEl = fix.debugElement.children[0].children[0].children[0];
        var paginationComponent = <PaginationComponent>paginationEl.componentInstance;

        var original = new Array<TestObject>();
        for (var i = 0; i < 40; i++) {
            original.push(new TestObject(i, "Name " + i));
        }
        fix.componentInstance.originalData = original;
        fix.detectChanges();

        expect(paginationComponent).toBeDefined();

        expect(fix.componentInstance.displayData).toBeDefined();
        expect(fix.componentInstance.displayData.length).toBe(10);
        expect(paginationEl.nativeElement.children[0].children[0].children.length).toBe(4);

    });

});
