import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, tick, fakeAsync } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';
import {dispatchEvent} from '@angular/platform-browser/testing/browser_util';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
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
class TestTableComponent {
  public originalData: Array<TestObject>;
  public displayData: Array<TestObject>;
  public tableState: ITableState;

}

describe('SortDirective tests', function () {

  beforeEach(() => TestBed.configureTestingModule({ declarations: [TestTableComponent, TestComp] }));

  it('should not be created', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    expect(() => {
      var el = createComponent('<table><thead><tr><th ptSort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    }).toThrowError(/No provider for TableDirective/)
  });

  it('should be created', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var el = createComponent('<table ptTable=""><thead><tr><th ptSort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    //             table         thead      <tr>       <th>
    var table = el.children[0].injector.get(TableDirective);
    var sort = el.children[0].children[0].children[0].children[0].injector.get(SortDirective);

    expect(table).toBeDefined();
    expect(sort).toBeDefined();
  });

  it('predicate is set on directive', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });
    var el = createComponent('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    expect(directive.predicate).toBe("id");
  });

  it('initial sort is "NotSet"', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var fix = createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    expect(directive.order).toBe(SortOrder.NotSet);
  });

  it('on click does increment index', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var fix = createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    sortEl.nativeElement.click();

    expect(directive.order).toBe(SortOrder.Ascending);
  });

  it('on two clicks does change to "Descending"', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var fix = createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    sortEl.nativeElement.click();
    sortEl.nativeElement.click();

    expect(directive.order).toBe(SortOrder.Descending);
  });

  it('does sort original array ascending', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
    var fix = createComponentFixture(template, [], TestTableComponent);

    var original = new Array<TestObject>();
    original.push(new TestObject(2, "David"));
    original.push(new TestObject(4, "Kim"));
    original.push(new TestObject(3, "Rohan"));
    original.push(new TestObject(1, "Ryan"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();

    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    var tableEl = <TableDirective>el.children[0].injector.get(TableDirective);

    sortEl.nativeElement.click();
    fix.detectChanges();

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(4);
    expect(display[0].id).toBe(1);
    expect(display[1].id).toBe(2);
    expect(display[2].id).toBe(3);
    expect(display[3].id).toBe(4);
  });

  it('does sort original array descending', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
    var fix = createComponentFixture(template, [], TestTableComponent);

    var original = new Array<TestObject>();
    original.push(new TestObject(2, "David"));
    original.push(new TestObject(4, "Kim"));
    original.push(new TestObject(3, "Rohan"));
    original.push(new TestObject(1, "Ryan"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();

    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortDirective>sortEl.injector.get(SortDirective);

    var tableEl = <TableDirective>el.children[0].injector.get(TableDirective);

    sortEl.nativeElement.click();
    fix.detectChanges();
    sortEl.nativeElement.click();
    fix.detectChanges();

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(4);
    expect(display[0].id).toBe(4);
    expect(display[1].id).toBe(3);
    expect(display[2].id).toBe(2);
    expect(display[3].id).toBe(1);
  });

  it('does sort reverse after clicking twice', () => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TableDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
    var fix = createComponentFixture(template, [], TestTableComponent);

    var original = new Array<TestObject>();
    original.push(new TestObject(1, "Name 1"));
    original.push(new TestObject(2, "Name 2"));
    original.push(new TestObject(3, "Name 3"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);
    var sortEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];

    sortEl.nativeElement.click();
    fix.detectChanges();
    sortEl.nativeElement.click();
    fix.detectChanges();

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].id).toBe(3);
    expect(display[1].id).toBe(2);
    expect(display[2].id).toBe(1);
  });

  it('order is automatically reset if sort object changed from outside directive', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective, SortDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState">
      <thead><tr><th ptSort="id">Header 1</th><th pt-sort="name">Header 2</th></tr></thead>
      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);
    var sortEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];
    var sortDirective = sortEl.injector.get(SortDirective);

    var original = new Array<TestObject>();
    original.push(new TestObject(2, "Name 3"));
    original.push(new TestObject(3, "Name 2"));
    original.push(new TestObject(1, "Name 1"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();
  
    sortEl.nativeElement.click();
    fix.detectChanges();
    expect(sortDirective.order).toBe(SortOrder.Ascending);

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].id).toBe(1);
    expect(display[1].id).toBe(2);
    expect(display[2].id).toBe(3);

    fix.detectChanges();
    expect(fix.componentInstance.tableState).toBeDefined();
    fix.componentInstance.tableState.sort.order = SortOrder.Descending;
    fix.detectChanges();

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].id).toBe(3);
    expect(display[1].id).toBe(2);
    expect(display[2].id).toBe(1);
  });
  
  it('order is synced for all sort directives when sort is changed', () => {
    TestBed.configureTestingModule({
      declarations: [TableDirective, SortDirective],
      providers: [ConfigurationProvider, DefaultDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState">
      <thead><tr><th ptSort="id">Header 1</th><th ptSort="name">Header 2</th></tr></thead>
      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);
    var sortIdEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];
    var sortNameEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[1];
    
    var sortIdDirective = <SortDirective>sortIdEl.injector.get(SortDirective);
    var sortNameDirective = <SortDirective>sortNameEl.injector.get(SortDirective);

    tableEl.tableState.sort.predicate = "id";
    tableEl.tableState.sort.order = SortOrder.Ascending;
    expect(sortIdDirective.order).toBe(SortOrder.Ascending);
    expect(sortNameDirective.order).toBe(SortOrder.NotSet);

    tableEl.tableState.sort.predicate = "name";
    expect(sortIdDirective.order).toBe(SortOrder.NotSet);
    expect(sortNameDirective.order).toBe(SortOrder.Ascending);

  });
});
