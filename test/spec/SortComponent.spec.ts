import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, tick, fakeAsync } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';
import {dispatchEvent} from '@angular/platform-browser/testing/browser_util';

import { SortOrder, SortComponent } from "./../../src/Sort/Sort.component";
import { TableComponent } from "./../../src/Table.component";
import { PropertyValueSelectorEvent } from './../../src/Sort/sort.selector.class';
import { ITableState } from './../../src/ITableState.interface';

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

  public getProperty(e: PropertyValueSelectorEvent): void {

  }
}

describe('SortComponent tests', function () {

  beforeEach(() => TestBed.configureTestingModule({ declarations: [TestTableComponent, TestComp] }));

  it('should not be created', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    expect(() => {
      var el = createComponent('<table><thead><tr><th pt-sort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    }).toThrowError(/No provider for TableComponent!/)
  });

  it('should be created', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var el = createComponent('<table pt-table=""><thead><tr><th pt-sort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    //             table         thead      <tr>       <th>
    var table = el.children[0].injector.get(TableComponent);
    var sort = el.children[0].children[0].children[0].children[0].injector.get(SortComponent);

    expect(table).toBeDefined();
    expect(sort).toBeDefined();
  });

  it('predicate is set on directive', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });
    var el = createComponent('<table pt-table=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    expect(directive.predicate).toBe("id");
  });

  it('initial sort is "NotSet"', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var fix = createComponentFixture('<table pt-table=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    expect(directive.order).toBe(SortOrder.NotSet);
  });

  it('on click does increment index', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var fix = createComponentFixture('<table pt-table=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    sortEl.nativeElement.click();

    expect(directive.order).toBe(SortOrder.Ascending);
  });

  it('on two clicks does change to "Descending"', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var fix = createComponentFixture('<table pt-table=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
    var el = fix.debugElement;
    var sortEl = el.children[0].children[0].children[0].children[0];
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    sortEl.nativeElement.click();
    sortEl.nativeElement.click();

    expect(directive.order).toBe(SortOrder.Descending);
  });

  it('does sort original array ascending', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var template = '<table pt-table="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
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
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    var tableEl = <TableComponent>el.children[0].injector.get(TableComponent);

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
      declarations: [SortComponent, TableComponent]
    });

    var template = '<table pt-table="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
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
    var directive = <SortComponent>sortEl.injector.get(SortComponent);

    var tableEl = <TableComponent>el.children[0].injector.get(TableComponent);

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
      declarations: [SortComponent, TableComponent]
    });

    var template = '<table pt-table="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
    var fix = createComponentFixture(template, [], TestTableComponent);

    var original = new Array<TestObject>();
    original.push(new TestObject(1, "Name 1"));
    original.push(new TestObject(2, "Name 2"));
    original.push(new TestObject(3, "Name 3"));
    fix.componentInstance.originalData = original;
    fix.detectChanges();

    var tableEl = <TableComponent>fix.debugElement.children[0].injector.get(TableComponent);
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

  it('does use table eventEmitter to check which property should be used for sorting', () => {
    TestBed.configureTestingModule({
      declarations: [SortComponent, TableComponent]
    });

    var template = '<table pt-table="" [pt-original]="originalData" (propertySelector)="getProperty($event)"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
    var fix = createComponentFixture(template, [], TestTableComponent);

    var original = new Array<TestObject>();
    original.push(new TestObject(1, "Name 3"));
    original.push(new TestObject(2, "Name 2"));
    original.push(new TestObject(3, "Name 1"));
    fix.componentInstance.originalData = original;
    fix.componentInstance.getProperty = (e: PropertyValueSelectorEvent): any => {
      // this minics custom property handling.
      return e.row.name;
    };
    fix.detectChanges();

    var tableEl = <TableComponent>fix.debugElement.children[0].injector.get(TableComponent);
    var sortEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];

    sortEl.nativeElement.click();
    fix.detectChanges();

    var display = tableEl.displayArray;
    expect(display).toBeDefined();
    expect(display.length).toBe(3);
    expect(display[0].name).toBe("Name 1");
    expect(display[1].name).toBe("Name 2");
    expect(display[2].name).toBe("Name 3");
  });

  it('order is automatically reset if sort object changed from outside directive', () => {
    TestBed.configureTestingModule({
      declarations: [TableComponent, SortComponent]
    });

    var template = `<table [(tableState)]="tableState" pt-table="" [pt-original]="originalData">
      <thead><tr><th pt-sort="id">Header 1</th><th pt-sort="name">Header 2</th></tr></thead>
      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableComponent>fix.debugElement.children[0].injector.get(TableComponent);
    var sortEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];
    var sortDirective = sortEl.injector.get(SortComponent);

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
      declarations: [TableComponent, SortComponent]
    });

    var template = `<table [(tableState)]="tableState" pt-table="" [pt-original]="originalData">
      <thead><tr><th pt-sort="id">Header 1</th><th pt-sort="name">Header 2</th></tr></thead>
      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableComponent>fix.debugElement.children[0].injector.get(TableComponent);
    var sortIdEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[0];
    var sortNameEl = <DebugElement>fix.debugElement.children[0].children[0].children[0].children[1];
    
    var sortIdDirective = <SortComponent>sortIdEl.injector.get(SortComponent);
    var sortNameDirective = <SortComponent>sortNameEl.injector.get(SortComponent);

    tableEl.tableState.sort.predicate = "id";
    tableEl.tableState.sort.order = SortOrder.Ascending;
    expect(sortIdDirective.order).toBe(SortOrder.Ascending);
    expect(sortNameDirective.order).toBe(SortOrder.NotSet);

    tableEl.tableState.sort.predicate = "name";
    expect(sortIdDirective.order).toBe(SortOrder.NotSet);
    expect(sortNameDirective.order).toBe(SortOrder.Ascending);

  });
});
