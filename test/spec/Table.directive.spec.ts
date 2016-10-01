import { Provider, Type, DebugElement, Component, Injectable, Injector, EventEmitter } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer } from '@angular/core/testing';
import { ElementInjector } from '@angular/core/src/linker/element_injector';
import { TestComp, createComponent, createComponentFixture }  from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState} from './../../src/TableState/ITableState.interface';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../../src/Configuration/IConfiguration.interface';
import { DefaultConfiguration } from './../../src/Configuration/DefaultConfiguration.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';
import { IDataPipeService } from './../../src/Pipe/IDataPipeService.interface';

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
  public tableConfiguration: IConfiguration;

  /**
   *
   */
  constructor() {
    this.originalData = new Array<TestObject>();
    this.displayData = new Array<TestObject>();
  }
}

var dataPipeCallCount: number;

@Injectable()
export class TestDataPipeService implements IDataPipeService {

  public pipe(array: Array<any>, state: ITableState, config: IConfiguration) {
    dataPipeCallCount++;

    return [
      { name: "override" }
    ];
  }
}

describe('TableDirective tests', function () {

  var mockConfigurationProvider = {
    globalConfiguration: {
      pipeServiceType: TestDataPipeService
    },
    globalConfigurationChanged: new EventEmitter<IConfiguration>()
  }

  beforeEach(() => {
    dataPipeCallCount = 0;

    TestBed.configureTestingModule({
      declarations: [TableDirective, TestTableComponent, TestComp],
      providers: [TestDataPipeService, { provide: ConfigurationProvider, useValue: mockConfigurationProvider }]
    })
  });

  it('should be created when [pt-table] on element', () => {
    var el = createComponent('<table ptTable=""></table>');
    expect(el.children[0].injector.get(TableDirective)).toBeDefined();
  });

  it('should inject same table instance', () => {
    var el = createComponent('<table ptTable=""></table>');

    var table1 = <TableDirective>el.children[0].injector.get(TableDirective);
    var table2 = <TableDirective>el.children[0].injector.get(TableDirective);
    expect(table1).toEqual(table2);
    table1.tableState.pagination.start = 1;
    expect(table2.tableState.pagination.start).toBe(1);
  });

  it('should initialize tableState when created', () => {

    var el = createComponent('<table ptTable=""></table>');

    var table = <TableDirective>el.children[0].injector.get(TableDirective);
    var tableState = table.tableState;
    expect(tableState).toBeDefined();
    expect(tableState.pagination.start).toBe(0);
  });

  it('originalArray is populated from parentComponent', () => {
    var el = createComponentFixture('<table [ptTable]="originalData"></table>', [], TestTableComponent);

    var table = <TableDirective>el.debugElement.children[0].injector.get(TableDirective);
    expect(table.originalArray).toBeDefined();
  });

  it('can update tableState from parent controller', () => {

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState" (ptDisplayData)="displayData"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);

    fix.componentInstance.originalData = new Array<TestObject>();
    fix.detectChanges();

    expect(tableEl.tableState).toBeDefined();
    expect(fix.componentInstance.tableState).toBeDefined();
  });

  it('displayArray is set using result from IDataPipeService', () => {

    var template = `<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    fix.componentInstance.originalData =  new Array<TestObject>();
    //fix.detectChanges();

    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(1);
    expect(display[0].name).toBe("override");
    expect(dataPipeCallCount).toBe(1);
  });

  it('table will use item configuration to inject IDataPipeService', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableDirective, TestTableComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `<table [ptTable]="originalData" [(ptDisplayArray)]="displayData" [ptConfiguration]="tableConfiguration"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    fix.componentInstance.tableConfiguration = DefaultConfiguration.create();
    fix.componentInstance.tableConfiguration.pipeServiceType = TestDataPipeService;
    fix.componentInstance.originalData = new Array<TestObject>();
    fix.detectChanges();

    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(1);
    expect(display[0].name).toBe("override");
    expect(dataPipeCallCount).toBe(1);
  });
});
