import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState} from './../../src/TableState/ITableState.interface';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';

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

describe('TableDirective tests', function () {

  beforeEach(() => TestBed.configureTestingModule({ declarations: [TestTableDirective, TestComp] }));

  it('should be created when [pt-table] on element', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var el = createComponent('<table ptTable=""></table>');
    expect(el.children[0].injector.get(TableDirective)).toBeDefined();
  });

  it('should inject same table instance', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var el = createComponent('<table ptTable=""></table>');

    var table1 = <TableDirective>el.children[0].injector.get(TableDirective);
    var table2 = <TableDirective>el.children[0].injector.get(TableDirective);
    expect(table1).toEqual(table2);
    table1.tableState.pagination.start = 1;
    expect(table2.tableState.pagination.start).toBe(1);
  });

  it('should initialize tableState when created', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var el = createComponent('<table ptTable=""></table>');

    var table = <TableDirective>el.children[0].injector.get(TableDirective);
    var tableState = table.tableState;
    expect(tableState).toBeDefined();
    expect(tableState.pagination.start).toBe(0);
  });

  it('originalArray is populated from parentComponent', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var el = createComponentFixture('<table [ptTable]="originalData"></table>', [], TestTableDirective);

    var table = <TableDirective>el.debugElement.children[0].injector.get(TableDirective);
    expect(table.originalArray).toBeDefined();
  });

  it('can update tableState from parent controller', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState" (ptDisplayData)="displayData"></table>`;
    var fix = createComponentFixture(template, [], TestTableDirective);

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);

    fix.componentInstance.originalData =  new Array<TestObject>();
    fix.detectChanges();
    
    expect(tableEl.tableState).toBeDefined();
    expect(fix.componentInstance.tableState).toBeDefined();
  });

  it('displayArray is set by directive when data sorted', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective, SortDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData">
      <thead><tr><th ptSort="id">Header 1</th></tr></thead>
      <tbody><tr><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableDirective);

    var original = new Array<TestObject>();
    original.push(new TestObject(2, "Name 2"));
    original.push(new TestObject(3, "Name 3"));
    original.push(new TestObject(1, "Name 1"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();
  
    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);
    var sortIdEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];
    
    var sortIdDirective = <SortDirective>sortIdEl.injector.get(SortDirective);

    tableEl.tableState.sort.predicate = "id";
    tableEl.tableState.sort.order = SortOrder.Ascending;
    fix.detectChanges();
    
    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].id).toBe(1);
    expect(display[1].id).toBe(2);
    expect(display[2].id).toBe(3);
  });
  
  it('displayArray is set when directive first loaded', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective, SortDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData">
      <thead><tr><th ptSort="id">Header 1</th></tr></thead>
      <tbody><tr><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableDirective);

    var original = new Array<TestObject>();
    original.push(new TestObject(2, "Name 2"));
    original.push(new TestObject(3, "Name 3"));
    original.push(new TestObject(1, "Name 1"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();
    
    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].id).toBe(2);
    expect(display[1].id).toBe(3);
    expect(display[2].id).toBe(1);
  });
});
