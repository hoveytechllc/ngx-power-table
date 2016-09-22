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
var Table_component_1 = require("./../../src/Table.component");
var Sort_component_1 = require("./../../src/Sort/Sort.component");
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
describe('TableComponent tests', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({ declarations: [TestTableComponent, component_factory_1.TestComp] }); });
    it('should be created when [pt-table] on element', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponent('<table pt-table=""></table>');
        expect(el.children[0].injector.get(Table_component_1.TableComponent)).toBeDefined();
    });
    it('should inject same table instance', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponent('<table pt-table=""></table>');
        var table1 = el.children[0].injector.get(Table_component_1.TableComponent);
        var table2 = el.children[0].injector.get(Table_component_1.TableComponent);
        expect(table1).toEqual(table2);
        table1.tableState.pagination.start = 1;
        expect(table2.tableState.pagination.start).toBe(1);
    });
    it('should initialize tableState when created', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponent('<table pt-table=""></table>');
        var table = el.children[0].injector.get(Table_component_1.TableComponent);
        var tableState = table.tableState;
        expect(tableState).toBeDefined();
        expect(tableState.pagination.start).toBe(0);
    });
    it('originalArray is populated from parentComponent', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponentFixture('<table pt-table="" [pt-original]="originalData" [(displayArray)]="displayArray"></table>', [], TestTableComponent);
        var table = el.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        expect(table.originalArray).toBeDefined();
    });
    it('can update tableState from parent controller', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent]
        });
        var template = "<table pt-table=\"\" [(tableState)]=\"tableState\" [(displayArray)]=\"displayData\" [pt-original]=\"originalData\"></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        fix.componentInstance.originalData = new Array();
        fix.detectChanges();
        expect(tableEl.tableState).toBeDefined();
        expect(fix.componentInstance.tableState).toBeDefined();
    });
    it('displayArray is set by directive when data sorted', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent, Sort_component_1.SortComponent]
        });
        var template = "<table pt-table=\"\" [(tableState)]=\"tableState\" [(displayArray)]=\"displayData\" [pt-original]=\"originalData\">\n      <thead><tr><th pt-sort=\"id\">Header 1</th></tr></thead>\n      <tbody><tr><td>Row 1</td></tr></tbody></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(2, "Name 2"));
        original.push(new TestObject(3, "Name 3"));
        original.push(new TestObject(1, "Name 1"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        var sortIdEl = fix.debugElement.children[0].children[0].children[0].children[0];
        var sortIdDirective = sortIdEl.injector.get(Sort_component_1.SortComponent);
        tableEl.tableState.sort.predicate = "id";
        tableEl.tableState.sort.order = Sort_component_1.SortOrder.Ascending;
        fix.detectChanges();
        var display = fix.componentInstance.displayData;
        expect(display).toBeDefined();
        expect(display.length).toBe(3);
        expect(display[0].id).toBe(1);
        expect(display[1].id).toBe(2);
        expect(display[2].id).toBe(3);
    });
});
//# sourceMappingURL=Table.component.spec.js.map