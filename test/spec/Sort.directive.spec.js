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
var SortOrder_enum_1 = require("./../../src/Sort/SortOrder.enum");
var Table_directive_1 = require("./../../src/Table/Table.directive");
var Sort_directive_1 = require("./../../src/Sort/Sort.directive");
var ConfigurationProvider_class_1 = require('./../../src/Configuration/ConfigurationProvider.class');
var DefaultDataPipeService_class_1 = require('./../../src/Pipe/DefaultDataPipeService.class');
var TestObject = (function () {
    function TestObject(id, name) {
        this.id = id;
        this.name = name;
    }
    return TestObject;
}());
var TestTableComponent = (function () {
    function TestTableComponent() {
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
describe('SortDirective tests', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({ declarations: [TestTableComponent, component_factory_1.TestComp] }); });
    it('should not be created', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        expect(function () {
            var el = component_factory_1.createComponent('<table><thead><tr><th ptSort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        }).toThrowError(/No provider for TableDirective/);
    });
    it('should be created', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var el = component_factory_1.createComponent('<table ptTable=""><thead><tr><th ptSort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        //             table         thead      <tr>       <th>
        var table = el.children[0].injector.get(Table_directive_1.TableDirective);
        var sort = el.children[0].children[0].children[0].children[0].injector.get(Sort_directive_1.SortDirective);
        expect(table).toBeDefined();
        expect(sort).toBeDefined();
    });
    it('predicate is set on directive', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var el = component_factory_1.createComponent('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        expect(directive.predicate).toBe("id");
    });
    it('initial sort is "NotSet"', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        expect(directive.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
    });
    it('on click does increment index', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        sortEl.nativeElement.click();
        expect(directive.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
    });
    it('on two clicks does change to "Descending"', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        sortEl.nativeElement.click();
        sortEl.nativeElement.click();
        expect(directive.order).toBe(SortOrder_enum_1.SortOrder.Descending);
    });
    it('does sort original array ascending', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(2, "David"));
        original.push(new TestObject(4, "Kim"));
        original.push(new TestObject(3, "Rohan"));
        original.push(new TestObject(1, "Ryan"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        var tableEl = el.children[0].injector.get(Table_directive_1.TableDirective);
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
    it('does sort original array descending', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(2, "David"));
        original.push(new TestObject(4, "Kim"));
        original.push(new TestObject(3, "Rohan"));
        original.push(new TestObject(1, "Ryan"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_directive_1.SortDirective);
        var tableEl = el.children[0].injector.get(Table_directive_1.TableDirective);
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
    it('does sort reverse after clicking twice', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, Table_directive_1.TableDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var template = '<table [ptTable]="originalData"><thead><tr><th ptSort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(1, "Name 1"));
        original.push(new TestObject(2, "Name 2"));
        original.push(new TestObject(3, "Name 3"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        var tableEl = fix.debugElement.children[0].injector.get(Table_directive_1.TableDirective);
        var sortEl = fix.debugElement.children[0].children[0].children[0].children[0];
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
    it('order is automatically reset if sort object changed from outside directive', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, Sort_directive_1.SortDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var template = "<table [ptTable]=\"originalData\" [(tableState)]=\"tableState\">\n      <thead><tr><th ptSort=\"id\">Header 1</th><th pt-sort=\"name\">Header 2</th></tr></thead>\n      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_directive_1.TableDirective);
        var sortEl = fix.debugElement.children[0].children[0].children[0].children[0];
        var sortDirective = sortEl.injector.get(Sort_directive_1.SortDirective);
        var original = new Array();
        original.push(new TestObject(2, "Name 3"));
        original.push(new TestObject(3, "Name 2"));
        original.push(new TestObject(1, "Name 1"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        sortEl.nativeElement.click();
        fix.detectChanges();
        expect(sortDirective.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
        var display = tableEl.displayArray;
        expect(display).toBeDefined();
        expect(display.length).toBe(3);
        expect(display[0].id).toBe(1);
        expect(display[1].id).toBe(2);
        expect(display[2].id).toBe(3);
        fix.detectChanges();
        expect(fix.componentInstance.tableState).toBeDefined();
        fix.componentInstance.tableState.sort.order = SortOrder_enum_1.SortOrder.Descending;
        fix.detectChanges();
        var display = tableEl.displayArray;
        expect(display).toBeDefined();
        expect(display.length).toBe(3);
        expect(display[0].id).toBe(3);
        expect(display[1].id).toBe(2);
        expect(display[2].id).toBe(1);
    });
    it('order is synced for all sort directives when sort is changed', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, Sort_directive_1.SortDirective],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
        var template = "<table [ptTable]=\"originalData\" [(tableState)]=\"tableState\">\n      <thead><tr><th ptSort=\"id\">Header 1</th><th ptSort=\"name\">Header 2</th></tr></thead>\n      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_directive_1.TableDirective);
        var sortIdEl = fix.debugElement.children[0].children[0].children[0].children[0];
        var sortNameEl = fix.debugElement.children[0].children[0].children[0].children[1];
        var sortIdDirective = sortIdEl.injector.get(Sort_directive_1.SortDirective);
        var sortNameDirective = sortNameEl.injector.get(Sort_directive_1.SortDirective);
        tableEl.tableState.sort.predicate = "id";
        tableEl.tableState.sort.order = SortOrder_enum_1.SortOrder.Ascending;
        expect(sortIdDirective.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
        expect(sortNameDirective.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
        tableEl.tableState.sort.predicate = "name";
        expect(sortIdDirective.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
        expect(sortNameDirective.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
    });
});
//# sourceMappingURL=Sort.directive.spec.js.map