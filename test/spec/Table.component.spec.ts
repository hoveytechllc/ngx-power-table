import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';

import { TableComponent } from "./../../src/Table.component";
import { ITableState} from './../../src/ITableState.interface';

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

describe('TableComponent tests', function () {

  beforeEach(() => TestBed.configureTestingModule({ declarations: [TestTableComponent, TestComp] }));

  it('should be created when [pt-table] on element', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });

    var el = createComponent('<table pt-table=""></table>');
    expect(el.children[0].injector.get(TableComponent)).toBeDefined();
  });

  it('should inject same table instance', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });

    var el = createComponent('<table pt-table=""></table>');

    var table1 = <TableComponent>el.children[0].injector.get(TableComponent);
    var table2 = <TableComponent>el.children[0].injector.get(TableComponent);
    expect(table1).toEqual(table2);
    table1.tableState.pagination.start = 1;
    expect(table2.tableState.pagination.start).toBe(1);
  });

  it('should initialize tableState when created', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });

    var el = createComponent('<table pt-table=""></table>');

    var table = <TableComponent>el.children[0].injector.get(TableComponent);
    var tableState = table.tableState;
    expect(tableState).toBeDefined();
    expect(tableState.pagination.start).toBe(0);
  });

  it('originalArray is populated from parentComponent', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });

    var el = createComponentFixture('<table [pt-original]="originalData" pt-table="displayArray"></table>', [], TestTableComponent);

    var table = <TableComponent>el.debugElement.children[0].injector.get(TableComponent);
    expect(table.originalArray).toBeDefined();
  });

  it('can update tableState from parent controller', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent]
    });

    var template = `<table [(tableState)]="tableState" [pt-table]="displayData" [pt-original]="originalData"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableComponent>fix.debugElement.children[0].injector.get(TableComponent);

    fix.componentInstance.originalData =  new Array<TestObject>();
    fix.detectChanges();
    
    expect(tableEl.tableState).toBeDefined();
    expect(fix.componentInstance.tableState).toBeDefined();
  });
});
