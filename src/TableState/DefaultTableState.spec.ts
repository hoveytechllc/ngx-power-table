import { Provider, Type, DebugElement, Component } from "@angular/core";
import { TestBed, inject, ComponentFixture, TestComponentRenderer, tick, fakeAsync } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from './../TestHelpers/component.factory';

import { SortOrder } from './../../src/Sort/SortOrder.enum';
import { ITableState } from './../../src/TableState/ITableState.interface';
import { DefaultTableState } from './../../src/TableState/DefaultTableState.class';

describe('DefaultTableState', function () {

    describe('DefaultTableStateSort', function () {

        it('should be initialized with default values', () => {
            var sut = new DefaultTableState();
            expect(sut.sort).toBeDefined();
            expect(sut.sort.order).toBe(SortOrder.NotSet);
            expect(sut.sort.predicate).toBeNull();
        });

        it('event emitter should be triggered with new sort', () => {
            var sut = new DefaultTableState();
            var called: boolean = false;

            sut.sort.changed.subscribe(() => {
                called = true;
                expect(sut.sort.order).toBe(SortOrder.Ascending);
            });

            sut.sort.order = SortOrder.Ascending;
            expect(called).toBeTruthy();
        });

        it('event emitter should be triggered with new predicate', () => {
            var sut = new DefaultTableState();
            var called: boolean = false;

            sut.sort.changed.subscribe(() => {
                called = true;
                expect(sut.sort.predicate).toBe("id");
            });

            sut.sort.predicate = "id";
            expect(called).toBeTruthy();
        });
    });

});
