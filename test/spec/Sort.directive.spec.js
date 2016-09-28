"use strict";
var core_1 = require("@angular/core");
var testing_1 = require('@angular/core/testing');
var component_factory_1 = require('./component.factory');
var SortOrder_enum_1 = require("./../../src/Sort/SortOrder.enum");
var Table_directive_1 = require("./../../src/Table/Table.directive");
var Sort_directive_1 = require("./../../src/Sort/Sort.directive");
describe('SortDirective tests', function () {
    var tableDirectiveSub = {
        tableStateChange: new core_1.EventEmitter(),
        tableState: {
            sort: {
                predicate: '',
                order: SortOrder_enum_1.SortOrder.NotSet,
                changed: new core_1.EventEmitter()
            }
        },
        pipe: function () {
        },
        getConfiguration: function () {
            return {
                ascendingCssClass: "fa fa-sort-asc",
                descendingCssClass: "fa fa-sort-desc"
            };
        }
    };
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, component_factory_1.TestComp],
            providers: [{ provide: Table_directive_1.TableDirective, useValue: tableDirectiveSub }]
        });
    });
    it('should not be created', function () {
        testing_1.TestBed.resetTestingModule();
        testing_1.TestBed.configureTestingModule({
            declarations: [Sort_directive_1.SortDirective, component_factory_1.TestComp]
        });
        expect(function () {
            var el = component_factory_1.createComponent('<div><div ptSort="col1"></div></div>');
        }).toThrowError(/No provider for TableDirective/);
    });
    it('should be created', function () {
        var el = component_factory_1.createComponent('<div><div ptSort="col1"></div></div>');
        var sort = el.children[0].children[0].injector.get(Sort_directive_1.SortDirective);
        expect(sort).toBeDefined();
    });
    it('predicate is populated with property value', function () {
        var template = "<div><div ptSort=\"col1\"></div></div>";
        var fix = component_factory_1.createComponentFixture(template);
        fix.detectChanges();
        var sort1 = fix.debugElement.children[0].children[0].injector.get(Sort_directive_1.SortDirective);
        expect(sort1.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
    });
    it('does iterate sort value', function () {
        var template = '<div><div ptSort="col1"></div></div>';
        var fix = component_factory_1.createComponentFixture(template);
        var sortEl = fix.debugElement.children[0].children[0];
        var sortDirective = sortEl.injector.get(Sort_directive_1.SortDirective);
        expect(sortDirective.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
        sortEl.nativeElement.click();
        expect(sortDirective.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
        sortEl.nativeElement.click();
        expect(sortDirective.order).toBe(SortOrder_enum_1.SortOrder.Descending);
        sortEl.nativeElement.click();
        expect(sortDirective.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
    });
    it('predicate is populated with property value', function () {
        var template = "<div><div ptSort=\"col1\"></div></div>";
        var fix = component_factory_1.createComponentFixture(template);
        fix.detectChanges();
        var sort1 = fix.debugElement.children[0].children[0].injector.get(Sort_directive_1.SortDirective);
        expect(sort1.predicate).toBe('col1');
    });
    it('order is synced for all sort directives when sort is changed', function () {
        var template = "<div><div ptSort=\"col1\"></div><div ptSort=\"col2\"></div><div ptSort=\"col3\"></div></div>";
        var fix = component_factory_1.createComponentFixture(template);
        var sort1 = fix.debugElement.children[0].children[0].injector.get(Sort_directive_1.SortDirective);
        var sort2 = fix.debugElement.children[0].children[1].injector.get(Sort_directive_1.SortDirective);
        var sort3 = fix.debugElement.children[0].children[2].injector.get(Sort_directive_1.SortDirective);
        sort1.order = SortOrder_enum_1.SortOrder.Ascending;
        sort2.order = SortOrder_enum_1.SortOrder.Ascending;
        sort3.order = SortOrder_enum_1.SortOrder.Ascending;
        sort1.table.tableState.sort.predicate = 'col2';
        sort1.table.tableState.sort.order = SortOrder_enum_1.SortOrder.Descending;
        sort1.table.tableStateChange.emit(sort1.table.tableState);
        expect(sort1.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
        expect(sort2.order).toBe(SortOrder_enum_1.SortOrder.Descending);
        expect(sort3.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
    });
    it('does add css class from configuration based on SortOrder', function () {
        var template = "<div><div ptSort=\"col1\"></div></div>";
        var fix = component_factory_1.createComponentFixture(template, [{ provide: Table_directive_1.TableDirective, useValue: tableDirectiveSub }]);
        fix.detectChanges();
        var sortEl = fix.debugElement.children[0].children[0];
        var sortDirective = sortEl.injector.get(Sort_directive_1.SortDirective);
        expect(sortEl.nativeElement.classList.length).toBe(0);
        sortEl.nativeElement.click();
        expect(sortEl.nativeElement.classList.value).toBe('fa fa-sort-asc');
        sortEl.nativeElement.click();
        expect(sortEl.nativeElement.classList.value).toBe('fa fa-sort-desc');
        sortEl.nativeElement.click();
        expect(sortEl.nativeElement.classList.length).toBe(0);
    });
});
//# sourceMappingURL=Sort.directive.spec.js.map