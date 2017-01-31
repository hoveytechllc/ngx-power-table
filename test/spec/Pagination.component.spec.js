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
var testing_1 = require("@angular/core/testing");
var component_factory_1 = require("./component.factory");
var Table_directive_1 = require("./../../src/Table/Table.directive");
var ConfigurationProvider_class_1 = require("./../../src/Configuration/ConfigurationProvider.class");
var DefaultDataPipeService_class_1 = require("./../../src/Pipe/DefaultDataPipeService.class");
var Pagination_component_1 = require("./../../src/Pagination/Pagination.component");
var TestObject_class_1 = require("./../helpers/TestObject.class");
describe('Pagination.component tests', function () {
    var tableDirectiveSub = {
        tableStateChange: new core_1.EventEmitter(),
        tableState: {
            pagination: {
                start: 0,
                pageSize: 0,
                totalItemCount: 0
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
    var hasClass = function (element, className) {
        var hasClass = false;
        for (var i = 0; i < element.classList.length; i++) {
            if (element.classList[i] === className)
                hasClass = true;
        }
        return hasClass;
    };
    var providers = [{ provide: Table_directive_1.TableDirective, useValue: tableDirectiveSub }];
    function configureModule() {
        return testing_1.TestBed.configureTestingModule({
            declarations: [Pagination_component_1.PaginationComponent, component_factory_1.TestComp]
        }).compileComponents();
    }
    it('should create buttons for page count', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            expect(paginationComponent).toBeDefined();
            var buttonArray = paginationEl.children[0].children;
            // two left, 4 pages, two right
            expect(buttonArray.length).toBe(8);
            done();
        });
    });
    it('does call pipe with start 0, if "first" button clicked', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 10;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var pipeCalled = false;
        tableDirectiveSub.pipe = function () {
            pipeCalled = true;
        };
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            var buttonArray = paginationEl.children[0].children;
            buttonArray[0].nativeElement.click();
            expect(pipeCalled).toBeTruthy();
            expect(paginationComponent.table.tableState.pagination.start).toBe(0);
            done();
        });
    });
    it('does disable prev & first buttons if on page 1', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 30;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var pipeCalled = false;
        tableDirectiveSub.pipe = function () {
            pipeCalled = true;
        };
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            var buttonArray = paginationEl.children[0].children;
            fix.detectChanges();
            var nextButton = buttonArray[buttonArray.length - 2].nativeElement;
            var lastButton = buttonArray[buttonArray.length - 1].nativeElement;
            expect(nextButton.disabled).toBeTruthy();
            expect(hasClass(nextButton, 'disabled')).toBeTruthy();
            expect(lastButton.disabled).toBeTruthy();
            expect(hasClass(lastButton, 'disabled')).toBeTruthy();
            done();
        });
    });
    it('does disable prev & first buttons if on page 1', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var pipeCalled = false;
        tableDirectiveSub.pipe = function () {
            pipeCalled = true;
        };
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            var buttonArray = paginationEl.children[0].children;
            fix.detectChanges();
            var firstButton = buttonArray[0].nativeElement;
            var previousButton = buttonArray[1].nativeElement;
            expect(firstButton.disabled).toBeTruthy();
            expect(hasClass(firstButton, 'disabled')).toBeTruthy();
            expect(previousButton.disabled).toBeTruthy();
            expect(hasClass(previousButton, 'disabled')).toBeTruthy();
            done();
        });
    });
    it('does apply "active" cssClass for page button', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var pipeCalled = false;
        tableDirectiveSub.pipe = function () {
            pipeCalled = true;
        };
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            var buttonArray = paginationEl.children[0].children;
            fix.detectChanges();
            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeTruthy();
            done();
        });
    });
    var TestPaginationComponent = (function () {
        /**
         *
         */
        function TestPaginationComponent() {
            this.originalData = new Array();
            this.displayData = new Array();
            this.isPaginationComponentVisible = false;
            for (var i = 0; i < 20; i++) {
                this.originalData.push(new TestObject_class_1.TestObject(i, i.toString()));
            }
        }
        return TestPaginationComponent;
    }());
    TestPaginationComponent = __decorate([
        core_1.Component({
            selector: 'my-test-component',
            template: "<div></div>"
        }),
        __metadata("design:paramtypes", [])
    ], TestPaginationComponent);
    it('does repond to events if created after ptTable initialization', function (done) {
        testing_1.TestBed.resetTestingModule();
        var template = "\n            <table [ptTable]=\"originalData\" [(tableState)]=\"tableState\">\n                <tfoot>\n                    <pt-pagination *ngIf=\"isPaginationComponentVisible\"></pt-pagination>\n                </tfoot>\n            </table>\n            ";
        component_factory_1.SetupComponentFixture(template, [], TestPaginationComponent);
        testing_1.TestBed.configureTestingModule({
            declarations: [Table_directive_1.TableDirective, TestPaginationComponent, Pagination_component_1.PaginationComponent],
            providers: [ConfigurationProvider_class_1.ConfigurationProvider, DefaultDataPipeService_class_1.DefaultDataPipeService]
        }).compileComponents().then(function () {
            var fix = component_factory_1.createComponentFixture('', [], TestPaginationComponent);
            fix.detectChanges();
            var tFootElem = fix.debugElement.children[0].children[0];
            expect(tFootElem.children.length).toBe(0);
            fix.componentInstance.isPaginationComponentVisible = true;
            fix.detectChanges();
            expect(tFootElem.children.length).toBe(1);
            fix.componentInstance.tableState.pagination.start = 10;
            fix.detectChanges();
            var buttonArray = tFootElem.children[0].children[0].children;
            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeFalsy();
            expect(hasClass(buttonArray[3].nativeElement, 'active')).toBeTruthy();
            fix.componentInstance.tableState.pagination.start = 11;
            fix.detectChanges();
            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeFalsy();
            expect(hasClass(buttonArray[3].nativeElement, 'active')).toBeTruthy();
            done();
        });
    });
    it('does call pipe with start for last page, if "last" button clicked', function (done) {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 10;
        tableDirectiveSub.tableState.pagination.pageSize = 10;
        var pipeCalled = false;
        tableDirectiveSub.pipe = function () {
            pipeCalled = true;
        };
        var template = '<div><pt-pagination></pt-pagination></div>';
        component_factory_1.SetupComponentFixture(template, providers);
        configureModule().then(function () {
            var fix = component_factory_1.createComponentFixtureAfterSetup(component_factory_1.TestComp);
            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = paginationEl.injector.get(Pagination_component_1.PaginationComponent);
            var buttonArray = paginationEl.children[0].children;
            buttonArray[buttonArray.length - 1].nativeElement.click();
            expect(pipeCalled).toBeTruthy();
            expect(paginationComponent.table.tableState.pagination.start).toBe(30);
            done();
        });
    });
});
//# sourceMappingURL=Pagination.component.spec.js.map