"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var testing_1 = require('@angular/core/testing');
var component_factory_1 = require('./component.factory');
var Table_directive_1 = require("./../../src/Table/Table.directive");
var ConfigurationProvider_class_1 = require('./../../src/Configuration/ConfigurationProvider.class');
var DefaultConfiguration_class_1 = require('./../../src/Configuration/DefaultConfiguration.class');
var DefaultDataPipeService_class_1 = require('./../../src/Pipe/DefaultDataPipeService.class');
var TestObject = (function () {
    function TestObject(id, name) {
        this.id = id;
        this.name = name;
    }
    return TestObject;
}());
var TestTableComponent = (function () {
    /**
     *
     */
    function TestTableComponent() {
        this.originalData = new Array();
        this.displayData = new Array();
    }
    TestTableComponent = __decorate([
        core_1.Component({
            selector: 'my-test-component',
            template: "<div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestTableComponent);
    return TestTableComponent;
}());
var dataPipeCallCount;
var TestDataPipeService = (function () {
    function TestDataPipeService() {
    }
    TestDataPipeService.prototype.pipe = function (array, state, config) {
        dataPipeCallCount++;
        return [
            { name: "override" }
        ];
    };
    TestDataPipeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TestDataPipeService);
    return TestDataPipeService;
}());
exports.TestDataPipeService = TestDataPipeService;
describe('TableDirective tests', function () {
    var mockConfigurationProvider = {
        globalConfiguration: {
            pipeServiceType: TestDataPipeService
        },
        globalConfigurationChanged: new core_1.EventEmitter()
    };
    beforeEach(function () {
        dataPipeCallCount = 0;
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, TestTableComponent, component_factory_1.TestComp],
            providers: [TestDataPipeService, { provide: ConfigurationProvider_class_1.ConfigurationProvider, useValue: mockConfigurationProvider }]
        });
    });
    it('should be created when [pt-table] on element', function () {
        var el = component_factory_1.createComponent('<table ptTable=""></table>');
        expect(el.children[0].injector.get(Table_directive_1.TableDirective)).toBeDefined();
    });
    it('should inject same table instance', function () {
        var el = component_factory_1.createComponent('<table ptTable=""></table>');
        var table1 = el.children[0].injector.get(Table_directive_1.TableDirective);
        var table2 = el.children[0].injector.get(Table_directive_1.TableDirective);
        expect(table1).toEqual(table2);
        table1.tableState.pagination.start = 1;
        expect(table2.tableState.pagination.start).toBe(1);
    });
    it('should initialize tableState when created', function () {
        var el = component_factory_1.createComponent('<table ptTable=""></table>');
        var table = el.children[0].injector.get(Table_directive_1.TableDirective);
        var tableState = table.tableState;
        expect(tableState).toBeDefined();
        expect(tableState.pagination.start).toBe(0);
    });
    it('originalArray is populated from parentComponent', function () {
        var el = component_factory_1.createComponentFixture('<table [ptTable]="originalData"></table>', [], TestTableComponent);
        var table = el.debugElement.children[0].injector.get(Table_directive_1.TableDirective);
        expect(table.originalArray).toBeDefined();
    });
    it('can update tableState from parent controller', function () {
        var template = "<table [ptTable]=\"originalData\" [(tableState)]=\"tableState\" (ptDisplayData)=\"displayData\"></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_directive_1.TableDirective);
        fix.componentInstance.originalData = new Array();
        fix.detectChanges();
        expect(tableEl.tableState).toBeDefined();
        expect(fix.componentInstance.tableState).toBeDefined();
    });
    it('displayArray is set using result from IDataPipeService', function () {
        var template = "<table [ptTable]=\"originalData\" [(tableState)]=\"tableState\" [(ptDisplayArray)]=\"displayData\"></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        fix.componentInstance.originalData = new Array();
        //fix.detectChanges();
        var display = fix.componentInstance.displayData;
        expect(display).toBeDefined();
        expect(display.length).toBe(1);
        expect(display[0].name).toBe("override");
        expect(dataPipeCallCount).toBe(1);
    });
    it('table will use item configuration to inject IDataPipeService', function () {
        testing_1.TestBed.resetTestingModule();
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, TestTableComponent],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService, TestDataPipeService]
        });
        var template = "<table [ptTable]=\"originalData\" [(ptDisplayArray)]=\"displayData\" [ptConfiguration]=\"tableConfiguration\"></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        fix.componentInstance.tableConfiguration = DefaultConfiguration_class_1.DefaultConfiguration.create();
        fix.componentInstance.tableConfiguration.pipeServiceType = TestDataPipeService;
        fix.componentInstance.originalData = new Array();
        fix.detectChanges();
        var display = fix.componentInstance.displayData;
        expect(display).toBeDefined();
        expect(display.length).toBe(1);
        expect(display[0].name).toBe("override");
        expect(dataPipeCallCount).toBe(1);
    });
});
//# sourceMappingURL=Table.directive.spec.js.map