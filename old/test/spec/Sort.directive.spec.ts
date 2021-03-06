import { EventEmitter } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { DefaultTableState } from './../../src/TableState/DefaultTableState.class';
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
import { IDefaultTableState } from '../../src/TableState/IDefaultTableState.interface';

describe('SortDirective tests', function () {
  var tableDirectiveSub = {
    tableStateChange: new EventEmitter<ITableState>(),
    tableState:  new DefaultTableState(),
    pipe: function () {

    },
    getConfiguration: () => {
      return {
          ascendingCssClass: "fa fa-sort-asc",
          descendingCssClass: "fa fa-sort-desc"
      };
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortDirective, TestComp],
      providers: [{ provide: TableDirective, useValue: tableDirectiveSub }]
    });
  });

  it('should not be created', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [SortDirective, TestComp]
    });

    expect(() => {
      var el = createComponent('<div><div ptSort="col1"></div></div>');
    }).toThrowError(/No provider for TableDirective/)
  });

  it('should be created', () => {
    var el = createComponent('<div><div ptSort="col1"></div></div>');
    var sort = el.children[0].children[0].injector.get(SortDirective);
    expect(sort).toBeDefined();
  });

  it('predicate is populated with property value', () => {
    var template = `<div><div ptSort="col1"></div></div>`;
    var fix = createComponentFixture(template);
    fix.detectChanges();

    var sort1 = <SortDirective>fix.debugElement.children[0].children[0].injector.get(SortDirective);
    expect(sort1.order).toBe(SortOrder.NotSet);
  });

  it('does iterate sort value', () => {
    var template = '<div><div ptSort="col1"></div></div>';
    var fix = createComponentFixture(template);

    var sortEl = fix.debugElement.children[0].children[0];
    var sortDirective = <SortDirective>sortEl.injector.get(SortDirective);

    expect(sortDirective.order).toBe(SortOrder.NotSet);
    sortEl.nativeElement.click();
    expect(sortDirective.order).toBe(SortOrder.Ascending);
    sortEl.nativeElement.click();
    expect(sortDirective.order).toBe(SortOrder.Descending);
    sortEl.nativeElement.click();
    expect(sortDirective.order).toBe(SortOrder.NotSet);
  });

  it('predicate is populated with property value', () => {
    var template = `<div><div ptSort="col1"></div></div>`;
    var fix = createComponentFixture(template);
    fix.detectChanges();

    var sort1 = <SortDirective>fix.debugElement.children[0].children[0].injector.get(SortDirective);
    expect(sort1.predicate).toBe('col1');
  });

  it('order is synced for all sort directives when sort is changed', () => {
    var template = `<div><div ptSort="col1"></div><div ptSort="col2"></div><div ptSort="col3"></div></div>`;
    var fix = createComponentFixture(template);

    var sort1 = <SortDirective>fix.debugElement.children[0].children[0].injector.get(SortDirective);
    var sort2 = <SortDirective>fix.debugElement.children[0].children[1].injector.get(SortDirective);
    var sort3 = <SortDirective>fix.debugElement.children[0].children[2].injector.get(SortDirective);

    sort1.order = SortOrder.Ascending;
    sort2.order = SortOrder.Ascending;
    sort3.order = SortOrder.Ascending;

    (<IDefaultTableState>sort1.table.tableState).sort.predicate = 'col2';
     (<IDefaultTableState>sort1.table.tableState).sort.order = SortOrder.Descending;
    sort1.table.tableStateChange.emit(<ITableState>sort1.table.tableState);

    expect(sort1.order).toBe(SortOrder.NotSet);
    expect(sort2.order).toBe(SortOrder.Descending);
    expect(sort3.order).toBe(SortOrder.NotSet);
  });
  
  it('does add css class from configuration based on SortOrder', () => {
    var template = `<div><div ptSort="col1"></div></div>`;

    var fix = createComponentFixture(template, [{provide: TableDirective, useValue: tableDirectiveSub}]);
    fix.detectChanges();

    var sortEl = fix.debugElement.children[0].children[0];
    var sortDirective = <SortDirective>sortEl.injector.get(SortDirective);
    
    expect(sortEl.nativeElement.classList.length).toBe(0);
    sortEl.nativeElement.click();
    expect(sortEl.nativeElement.classList.length).toBe(2);
    expect(sortEl.nativeElement.classList[0]).toBe('fa');
    expect(sortEl.nativeElement.classList[1]).toBe('fa-sort-asc');
    sortEl.nativeElement.click();
    expect(sortEl.nativeElement.classList.length).toBe(2);
    expect(sortEl.nativeElement.classList[0]).toBe('fa');
    expect(sortEl.nativeElement.classList[1]).toBe('fa-sort-desc');
    sortEl.nativeElement.click();
    expect(sortEl.nativeElement.classList.length).toBe(0);
  });
});
