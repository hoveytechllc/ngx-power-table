import { Provider, Type, DebugElement, Component, Injectable, Injector, EventEmitter } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, fakeAsync, tick } from '@angular/core/testing';
import { ElementInjector } from '@angular/core/src/linker/element_injector';
import { TestComp, createComponent, createComponentFixture } from './component.factory';

import { TableDirective } from "./../../src/Table/Table.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
import { IDefaultTableState } from './../../src/TableState/IDefaultTableState.interface';
import { DefaultTableState } from './../../src/TableState/DefaultTableState.class';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../../src/Configuration/IConfiguration.interface';
import { DefaultConfiguration } from './../../src/Configuration/DefaultConfiguration.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';
import { PaginationComponent } from './../../src/Pagination/Pagination.component';
import { IDataPipeService, IDataPipeFunction } from './../../src/Pipe/IDataPipeService.interface';

import { TestObject } from './../helpers/TestObject.class';


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

    return Promise.resolve([
      { name: "override" }
    ]);
  }
}

describe('TableDirective tests', function () {

  var mockConfigurationProvider = {
    globalConfiguration: {
      pipeServiceType: TestDataPipeService,
      tableStateType: DefaultTableState
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
    expect(table2.dataPipe.observers.length).toBe(0);

    table1.dataPipe.subscribe(() => { });
    expect(table2.dataPipe.observers.length).toBe(1);
  });

  it('should initialize tableState when created', () => {
    var el = createComponent('<table ptTable=""></table>');

    var table = <TableDirective>el.children[0].injector.get(TableDirective);
    var tableState = <IDefaultTableState>table.tableState;
    expect(tableState).toBeDefined();
    expect(tableState instanceof DefaultTableState).toBeTruthy();
  });

  it('originalArray is populated from parentComponent', () => {
    var el = createComponentFixture('<table [ptTable]="originalData"></table>', [], TestTableComponent);

    var table = <TableDirective>el.debugElement.children[0].injector.get(TableDirective);
    expect(table.originalArray).toBeDefined();
  });

  it('can update tableState from parent controller', () => {

    var template = `<table [ptTable]="originalData" [(ptTableState)]="tableState" (ptDisplayData)="displayData"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var tableEl = <TableDirective>fix.debugElement.children[0].injector.get(TableDirective);

    fix.componentInstance.originalData = new Array<TestObject>();
    fix.detectChanges();

    expect(tableEl.tableState).toBeDefined();
    expect(fix.componentInstance.tableState).toBeDefined();
  });

  it('displayArray is set using result from IDataPipeService', fakeAsync(() => {

    var template = `<table [ptTable]="originalData" [(ptTableState)]="tableState" [(ptDisplayArray)]="displayData"></table>`;
    var fix = createComponentFixture(template, [], TestTableComponent);

    tick();

    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(1);
    expect(display[0].name).toBe("override");
    expect(dataPipeCallCount).toBe(1);
  }));

  it('table will use item configuration to inject IDataPipeService', fakeAsync(() => {
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
    tick();

    var display = fix.componentInstance.displayData;
    expect(display).toBeDefined();
    expect(display.length).toBe(1);
    expect(display[0].name).toBe("override");
    expect(dataPipeCallCount).toBe(1);
  }));


  class CustomTableState extends DefaultTableState {
    public customProperty: string = "custom table state";
  }

  @Component({
    selector: 'my-test-component',
    template: "<div></div>"
  })
  class TableWithCustomStateComponent {
    public originalData: Array<TestObject> = new Array<TestObject>();
    public tableState: CustomTableState = new CustomTableState();

    /**
     *
     */
    constructor() {

    }
  }

  var hasClass = (element: any, className: string): boolean => {
    var hasClass: boolean = false;

    for (var i = 0; i < element.classList.length; i++) {
      if (element.classList[i] === className) hasClass = true;
    }

    return hasClass;
  }

  it('table will call emit for tableState when custom state is being used by consumer', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableDirective, TableWithCustomStateComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table [ptTable]="originalData" [(ptTableState)]="tableState">
          <tfoot>
              <pt-pagination></pt-pagination>
          </tfoot>
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomStateComponent);

    var items = new Array<TestObject>();
    for (var i = 0; i < 20; i++) {
      items.push(new TestObject(i, ""));
    }
    fix.componentInstance.originalData = items;

    var tableEl = <TableDirective>fix.debugElement.children[0].children[0].injector.get(TableDirective);
    fix.detectChanges();
    expect((<CustomTableState>tableEl.tableState).customProperty).toBe("custom table state");

    var paginationEl = fix.debugElement.children[0].children[0].children[0].children[0];
    var buttonPage1 = paginationEl.children[0].children[2];
    var buttonPage2 = paginationEl.children[0].children[3];

    buttonPage2.nativeElement.click();
    fix.detectChanges();

    expect(fix.componentInstance.tableState.pagination.start).toBe(10);
  });

  it('table will call emit if tableState is set by consumer after constructor', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table [ptTable]="originalData" [(ptTableState)]="tableState">
          <tfoot>
              <pt-pagination></pt-pagination>
          </tfoot>
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TestTableComponent);

    var newTableState = new DefaultTableState();
    newTableState.pagination.totalItemCount = 20;
    newTableState.pagination.start = 10;

    var tableEl = <TableDirective>fix.debugElement.children[0].children[0].injector.get(TableDirective);
    fix.componentInstance.tableState = newTableState;
    fix.detectChanges();

    var paginationEl = fix.debugElement.children[0].children[0].children[0].children[0];
    var page1Button = paginationEl.children[0].children[2];
    var page2Button = paginationEl.children[0].children[3];
    expect(hasClass(page1Button.nativeElement, 'active')).toBeFalsy();
    expect(hasClass(page2Button.nativeElement, 'active')).toBeTruthy();
  });

  @Component({
    selector: 'my-test-component',
    template: "<div></div>"
  })
  class TableWithCustomDataPipeFunction {
    public tableState: CustomTableState = new CustomTableState();
    public displayArray: Array<TestObject>;
    public pipeCount: number = 0;

    public pipe(tableState: IDefaultTableState, config: IConfiguration): void {
      var self = this;
      this.pipeCount++;

      setTimeout(function () {
        tableState.updateWithoutEmitting(() => {
          tableState.pagination.totalItemCount = 3;
          self.displayArray = [
            new TestObject(1, "ng2"),
            new TestObject(1, "power"),
            new TestObject(1, "table")
          ];
        });
      });
    }
  }

  it('table will use dataPipe value on directive if set', (done: () => void) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableWithCustomDataPipeFunction, TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table [ptTable]="" (ptDataPipe)="pipe($event[0], $event[1])" [(ptDisplayArray)]="displayArray" [(ptTableState)]="tableState">
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomDataPipeFunction)
    var intervalHandle: any;
    var start = new Date();

    intervalHandle = setInterval(function () {
      fix.detectChanges();
      var now = new Date();
      if ((now.getTime() - start.getTime()) > 2000) {
        clearInterval(intervalHandle);
        expect(true).toBeFalsy();
        done();
        throw new Error("Timeout passed, displayArray not set.");
      }
      if (fix.componentInstance.displayArray
        && fix.componentInstance.displayArray.length === 3) {
        clearInterval(intervalHandle);
        expect(fix.componentInstance.displayArray.length).toBe(3);
        expect(fix.componentInstance.displayArray[0].name).toBe("ng2");
        expect(fix.componentInstance.displayArray[1].name).toBe("power");
        expect(fix.componentInstance.displayArray[2].name).toBe("table");
        done();
      }
    }, 50);

  });

  it('table will use dataPipe only once when view first initialized', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableWithCustomDataPipeFunction, TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table ptTable="" (ptDataPipe)="pipe($event[0], $event[1])" [(ptDisplayArray)]="displayArray" [(ptTableState)]="tableState">
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomDataPipeFunction);

    tick();
    expect(fix.componentInstance.pipeCount).toBe(1);
  }));

  it('table will subscribe to changed EventEmitter on tableState and tigger pipe()', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableWithCustomDataPipeFunction, TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table ptTable="" (ptDataPipe)="pipe($event[0], $event[1])" [(ptDisplayArray)]="displayArray" [(ptTableState)]="tableState">
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomDataPipeFunction);

    tick();
    expect(fix.componentInstance.pipeCount).toBe(1);
    fix.componentInstance.tableState.changed.emit();
    tick();
    expect(fix.componentInstance.pipeCount).toBe(2);
  }));

  it('table will call ptDataPipe EventEmitter even when ptTableState is not bound to table', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableWithCustomDataPipeFunction, TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table ptTable="" (ptDataPipe)="pipe($event[0], $event[1])">
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomDataPipeFunction);
    var table = <TableDirective>fix.debugElement.children[0].children[0].injector.get(TableDirective);
    tick();
    expect(fix.componentInstance.pipeCount).toBe(1);
    expect(table.tableState.changed.observers.length).toBe(1);
    table.tableState.changed.emit();
    tick();
    expect(fix.componentInstance.pipeCount).toBe(2);
  }));

  it('table will observe tableState manually set by component', fakeAsync(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TableWithCustomDataPipeFunction, TableDirective, TestTableComponent, PaginationComponent],
      providers: [ConfigurationProvider, DefaultDataPipeService, TestDataPipeService]
    });

    var template = `
    <div>
      <table ptTable="" [(ptTableState)]="tableState">
      </table>
    </div>
    `;
    var fix = createComponentFixture(template, [], TableWithCustomDataPipeFunction);

    fix.componentInstance.tableState = new CustomTableState();
    expect(fix.componentInstance.tableState.changed.observers.length).toBe(0);
    fix.detectChanges();
    expect(fix.componentInstance.tableState.changed.observers.length).toBe(1);
  }));
});
