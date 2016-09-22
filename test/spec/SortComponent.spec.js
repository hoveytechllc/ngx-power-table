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
var Sort_component_1 = require("./../../src/Sort/Sort.component");
var Table_component_1 = require("./../../src/Table.component");
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
    TestTableComponent.prototype.getProperty = function (e) {
    };
    TestTableComponent = __decorate([
        core_1.Component({
            selector: 'my-test-component',
            template: "<div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestTableComponent);
    return TestTableComponent;
}());
describe('SortComponent tests', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({ declarations: [TestTableComponent, component_factory_1.TestComp] }); });
    it('should not be created', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        expect(function () {
            var el = component_factory_1.createComponent('<table><thead><tr><th pt-sort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        }).toThrowError(/No provider for TableComponent!/);
    });
    it('should be created', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponent('<table ptTable=""><thead><tr><th pt-sort>Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        //             table         thead      <tr>       <th>
        var table = el.children[0].injector.get(Table_component_1.TableComponent);
        var sort = el.children[0].children[0].children[0].children[0].injector.get(Sort_component_1.SortComponent);
        expect(table).toBeDefined();
        expect(sort).toBeDefined();
    });
    it('predicate is set on directive', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var el = component_factory_1.createComponent('<table ptTable=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        expect(directive.predicate).toBe("id");
    });
    it('initial sort is "NotSet"', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        expect(directive.order).toBe(Sort_component_1.SortOrder.NotSet);
    });
    it('on click does increment index', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        sortEl.nativeElement.click();
        expect(directive.order).toBe(Sort_component_1.SortOrder.Ascending);
    });
    it('on two clicks does change to "Descending"', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var fix = component_factory_1.createComponentFixture('<table ptTable=""><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>');
        var el = fix.debugElement;
        var sortEl = el.children[0].children[0].children[0].children[0];
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        sortEl.nativeElement.click();
        sortEl.nativeElement.click();
        expect(directive.order).toBe(Sort_component_1.SortOrder.Descending);
    });
    it('does sort original array ascending', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var template = '<table ptTable="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
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
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        var tableEl = el.children[0].injector.get(Table_component_1.TableComponent);
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
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var template = '<table ptTable="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
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
        var directive = sortEl.injector.get(Sort_component_1.SortComponent);
        var tableEl = el.children[0].injector.get(Table_component_1.TableComponent);
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
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var template = '<table ptTable="" [pt-original]="originalData"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(1, "Name 1"));
        original.push(new TestObject(2, "Name 2"));
        original.push(new TestObject(3, "Name 3"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
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
    it('does use table eventEmitter to check which property should be used for sorting', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_component_1.SortComponent, Table_component_1.TableComponent]
        });
        var template = '<table ptTable="" [pt-original]="originalData" (propertySelector)="getProperty($event)"><thead><tr><th pt-sort="id">Header 1</th></tr></thead><tbody><tr><td>Row 1</td></tr></tbody></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        original.push(new TestObject(1, "Name 3"));
        original.push(new TestObject(2, "Name 2"));
        original.push(new TestObject(3, "Name 1"));
        fix.componentInstance.originalData = original;
        fix.componentInstance.getProperty = function (e) {
            // this minics custom property handling.
            return e.row.name;
        };
        fix.detectChanges();
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        var sortEl = fix.debugElement.children[0].children[0].children[0].children[0];
        sortEl.nativeElement.click();
        fix.detectChanges();
        var display = tableEl.displayArray;
        expect(display).toBeDefined();
        expect(display.length).toBe(3);
        expect(display[0].name).toBe("Name 1");
        expect(display[1].name).toBe("Name 2");
        expect(display[2].name).toBe("Name 3");
    });
    it('order is automatically reset if sort object changed from outside directive', function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_component_1.TableComponent, Sort_component_1.SortComponent]
        });
        var template = "<table [(tableState)]=\"tableState\" ptTable=\"\" [pt-original]=\"originalData\">\n      <thead><tr><th pt-sort=\"id\">Header 1</th><th pt-sort=\"name\">Header 2</th></tr></thead>\n      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        var sortEl = fix.debugElement.children[0].children[0].children[0].children[0];
        var sortDirective = sortEl.injector.get(Sort_component_1.SortComponent);
        var original = new Array();
        original.push(new TestObject(2, "Name 3"));
        original.push(new TestObject(3, "Name 2"));
        original.push(new TestObject(1, "Name 1"));
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        sortEl.nativeElement.click();
        fix.detectChanges();
        expect(sortDirective.order).toBe(Sort_component_1.SortOrder.Ascending);
        var display = tableEl.displayArray;
        expect(display).toBeDefined();
        expect(display.length).toBe(3);
        expect(display[0].id).toBe(1);
        expect(display[1].id).toBe(2);
        expect(display[2].id).toBe(3);
        fix.detectChanges();
        expect(fix.componentInstance.tableState).toBeDefined();
        fix.componentInstance.tableState.sort.order = Sort_component_1.SortOrder.Descending;
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
            declarations: [Table_component_1.TableComponent, Sort_component_1.SortComponent]
        });
        var template = "<table [(tableState)]=\"tableState\" ptTable=\"\" [pt-original]=\"originalData\">\n      <thead><tr><th pt-sort=\"id\">Header 1</th><th pt-sort=\"name\">Header 2</th></tr></thead>\n      <tbody><tr><td>Row 1</td><td>Row 1</td></tr></tbody></table>";
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var tableEl = fix.debugElement.children[0].injector.get(Table_component_1.TableComponent);
        var sortIdEl = fix.debugElement.children[0].children[0].children[0].children[0];
        var sortNameEl = fix.debugElement.children[0].children[0].children[0].children[1];
        var sortIdDirective = sortIdEl.injector.get(Sort_component_1.SortComponent);
        var sortNameDirective = sortNameEl.injector.get(Sort_component_1.SortComponent);
        tableEl.tableState.sort.predicate = "id";
        tableEl.tableState.sort.order = Sort_component_1.SortOrder.Ascending;
        expect(sortIdDirective.order).toBe(Sort_component_1.SortOrder.Ascending);
        expect(sortNameDirective.order).toBe(Sort_component_1.SortOrder.NotSet);
        tableEl.tableState.sort.predicate = "name";
        expect(sortIdDirective.order).toBe(Sort_component_1.SortOrder.NotSet);
        expect(sortNameDirective.order).toBe(Sort_component_1.SortOrder.Ascending);
    });
});
//# sourceMappingURL=SortComponent.spec.js.map