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
var DefaultDataPipeService_class_1 = require('./../../src/Pipe/DefaultDataPipeService.class');
var Pagination_component_1 = require('./../../src/Pagination/Pagination.component');
var TestObject = (function () {
    function TestObject(id, name) {
        this.id = id;
        this.name = name;
    }
    return TestObject;
}());
var TestTableDirective = (function () {
    /**
     *
     */
    function TestTableDirective() {
        this.originalData = new Array();
        this.displayData = new Array();
    }
    TestTableDirective = __decorate([
        core_1.Component({
            selector: 'my-test-component',
            template: "<div></div>"
        }), 
        __metadata('design:paramtypes', [])
    ], TestTableDirective);
    return TestTableDirective;
}());
describe('Pagination.component tests', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, Pagination_component_1.PaginationComponent, TestTableDirective, component_factory_1.TestComp],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        });
    });
    it('should create buttons for page count', function () {
        var template = '<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData">' +
            '<tfoot><pt-pagination></pt-pagination></tfoot></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableDirective);
        var paginationEl = fix.debugElement.children[0].children[0].children[0];
        var paginationComponent = paginationEl.componentInstance;
        var original = new Array();
        for (var i = 0; i < 40; i++) {
            original.push(new TestObject(i, "Name " + i));
        }
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        expect(paginationComponent).toBeDefined();
        expect(fix.componentInstance.displayData).toBeDefined();
        expect(fix.componentInstance.displayData.length).toBe(10);
        expect(paginationEl.nativeElement.children[0].children[0].children.length).toBe(4);
    });
});
//# sourceMappingURL=Pagination.component.spec.js.map