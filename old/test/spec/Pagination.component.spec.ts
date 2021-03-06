import { Provider, Type, DebugElement, Component, EventEmitter } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture, SetupComponentFixture, createComponentFixtureAfterSetup } from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { IDefaultTableState } from '../../src/TableState/IDefaultTableState.interface';
import { DefaultTableState }from '../../src/TableState/DefaultTableState.class';
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';
import { PaginationComponent } from './../../src/Pagination/Pagination.component';

import { TestObject } from './../helpers/TestObject.class';

describe('Pagination.component tests', function () {
    var tableDirectiveSub = {
        tableStateChange: new EventEmitter<ITableState>(),
        tableState: new DefaultTableState,
        pipe: function () {

        },
        getConfiguration: () => {
            return {
                ascendingCssClass: "fa fa-sort-asc",
                descendingCssClass: "fa fa-sort-desc"
            };
        }
    };

    var hasClass = (element: any, className: string): boolean => {
        var hasClass: boolean = false;

        for (var i = 0; i < element.classList.length; i++) {
            if (element.classList[i] === className) hasClass = true;
        }

        return hasClass;
    }

    var providers = [{ provide: TableDirective, useValue: tableDirectiveSub }];

    function configureModule(): Promise<any> {
        return TestBed.configureTestingModule({
            declarations: [PaginationComponent, TestComp]
        }).compileComponents();
    }

    it('should create buttons for page count', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

            expect(paginationComponent).toBeDefined();

            var buttonArray = paginationEl.children[0].children;

            // two left, 4 pages, two right
            expect(buttonArray.length).toBe(8);
            done();
        })
    });

    it('does call pipe with start 0, if "first" button clicked', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 10;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

            var buttonArray = paginationEl.children[0].children;

            buttonArray[0].nativeElement.click();

            expect((<IDefaultTableState>paginationComponent.table.tableState).pagination.start).toBe(0);
            done();
        });
    });

    it('does disable prev & first buttons if on page 1', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 30;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var pipeCalled: boolean = false;
        tableDirectiveSub.pipe = () => {
            pipeCalled = true;
        };

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

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

    it('does disable prev & first buttons if on page 1', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var pipeCalled: boolean = false;
        tableDirectiveSub.pipe = () => {
            pipeCalled = true;
        };

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

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

    it('does apply "active" cssClass for page button', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 0;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var pipeCalled: boolean = false;
        tableDirectiveSub.pipe = () => {
            pipeCalled = true;
        };

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

            var buttonArray = paginationEl.children[0].children;

            fix.detectChanges();

            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeTruthy();
            done();
        });
    });


    @Component({
        selector: 'my-test-component',
        template: "<div></div>"
    })
    class TestPaginationComponent {
        public originalData: Array<TestObject>;
        public displayData: Array<TestObject>;
        public tableState: ITableState;
        public isPaginationComponentVisible: boolean;

        /**
         *
         */
        constructor() {
            this.originalData = new Array<TestObject>();
            this.displayData = new Array<TestObject>();
            this.isPaginationComponentVisible = false;

            for (var i = 0; i < 20; i++) {
                this.originalData.push(new TestObject(i, i.toString()));
            }
        }
    }


    it('does respond to events if created after ptTable initialization', (done: () => void) => {
        TestBed.resetTestingModule();

        var template = `
            <table [ptTable]="originalData" [(ptTableState)]="tableState">
                <tfoot>
                    <pt-pagination *ngIf="isPaginationComponentVisible"></pt-pagination>
                </tfoot>
            </table>
            `;

        SetupComponentFixture(template, [], TestPaginationComponent);

        TestBed.configureTestingModule({
            declarations: [TableDirective, TestPaginationComponent, PaginationComponent],
            providers: [ConfigurationProvider, DefaultDataPipeService]
        }).compileComponents().then(() => {

            var fix = createComponentFixture('', [], TestPaginationComponent);
            fix.detectChanges();

            var tFootElem = fix.debugElement.children[0].children[0];
            expect(tFootElem.children.length).toBe(0);

            fix.componentInstance.isPaginationComponentVisible = true;
            fix.detectChanges();
            expect(tFootElem.children.length).toBe(1);

            (<IDefaultTableState>fix.componentInstance.tableState).pagination.start = 10;
            fix.detectChanges();

            var buttonArray = tFootElem.children[0].children[0].children;
            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeFalsy();
            expect(hasClass(buttonArray[3].nativeElement, 'active')).toBeTruthy();
            
            (<IDefaultTableState>fix.componentInstance.tableState).pagination.start = 11;
            fix.detectChanges();
            expect(hasClass(buttonArray[2].nativeElement, 'active')).toBeFalsy();
            expect(hasClass(buttonArray[3].nativeElement, 'active')).toBeTruthy();

            done();
        });
    });

    it('does call pipe with start for last page, if "last" button clicked', (done: () => void) => {
        tableDirectiveSub.tableState.pagination.totalItemCount = 40;
        tableDirectiveSub.tableState.pagination.start = 10;
        tableDirectiveSub.tableState.pagination.pageSize = 10;

        var template = '<div><pt-pagination></pt-pagination></div>';
        SetupComponentFixture(template, providers);

        configureModule().then(() => {
            var fix = createComponentFixtureAfterSetup(TestComp);

            var paginationEl = fix.debugElement.children[0].children[0];
            var paginationComponent = <PaginationComponent>paginationEl.injector.get(PaginationComponent);

            var buttonArray = paginationEl.children[0].children;

            buttonArray[buttonArray.length - 1].nativeElement.click();

            expect((<IDefaultTableState>paginationComponent.table.tableState).pagination.start).toBe(30);
            done();
        });
    });
});
