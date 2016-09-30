import { Provider, Type, DebugElement, Component, EventEmitter } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture, SetupComponentFixture, createComponentFixtureAfterSetup } from './component.factory';

import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { TableDirective } from "./../../src/Table/Table.directive";
import { SortDirective } from "./../../src/Sort/Sort.directive";
import { ITableState } from './../../src/TableState/ITableState.interface';
import { ConfigurationProvider } from './../../src/Configuration/ConfigurationProvider.class';
import { DefaultDataPipeService } from './../../src/Pipe/DefaultDataPipeService.class';
import { PaginationComponent } from './../../src/Pagination/Pagination.component';

describe('Pagination.component tests', function () {
    var tableDirectiveSub = {
        tableStateChange: new EventEmitter<ITableState>(),
        tableState: {
            pagination: {
                start: 0,
                end: 0,
                pageSize: 0,
                numberOfPages: 0
            }
        },
        pipe: function () {

        },
        getConfiguration: () => {
            return {
                ascendingCssClass: "fa fa-sort-asc",
                descendingCssClass: "fa fa-sort-desc"
            };
        }
    };

    var providers = [{ provide: TableDirective, useValue: tableDirectiveSub }];

    function configureModule(): Promise<any> {
        return TestBed.configureTestingModule({
            declarations: [PaginationComponent, TestComp]
        }).compileComponents();
    }

    it('should create buttons for page count', (done) => {
        tableDirectiveSub.tableState.pagination.numberOfPages = 4;
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

    it('does call pipe with start 0, if "first" button clicked', (done) => {
        tableDirectiveSub.tableState.pagination.numberOfPages = 4;
        tableDirectiveSub.tableState.pagination.start = 10;
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

            buttonArray[0].nativeElement.click();

            expect(pipeCalled).toBeTruthy();
            expect(paginationComponent.table.tableState.pagination.start).toBe(0);
            done();
        });
    });

    it('does apply "active" cssClass for page button', (done) => {
        tableDirectiveSub.tableState.pagination.numberOfPages = 4;
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

            var classArray = <Array<string>>buttonArray[2].nativeElement.classList;
            var hasClass: boolean = false;

            for (var i = 0; i < classArray.length; i++) {
                if (classArray[i] === 'active') hasClass = true;
            }
            
            expect(hasClass).toBeTruthy();
            done();
        });
    });
    it('does call pipe with start for last page, if "last" button clicked', (done) => {
        tableDirectiveSub.tableState.pagination.numberOfPages = 4;
        tableDirectiveSub.tableState.pagination.start = 10;
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

            buttonArray[buttonArray.length - 1].nativeElement.click();

            expect(pipeCalled).toBeTruthy();
            expect(paginationComponent.table.tableState.pagination.start).toBe(30);
            done();
        });
    });
});
