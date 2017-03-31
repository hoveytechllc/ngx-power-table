"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SortOrder_enum_1 = require("./../../src/Sort/SortOrder.enum");
var DefaultTableState_class_1 = require("./../../src/TableState/DefaultTableState.class");
describe('DefaultTableState', function () {
    describe('DefaultTableStateSort', function () {
        it('should be initialized with default values', function () {
            var sut = new DefaultTableState_class_1.DefaultTableState();
            expect(sut.sort).toBeDefined();
            expect(sut.sort.order).toBe(SortOrder_enum_1.SortOrder.NotSet);
            expect(sut.sort.predicate).toBeNull();
        });
        it('event emitter should be triggered with new sort', function () {
            var sut = new DefaultTableState_class_1.DefaultTableState();
            var called = false;
            sut.sort.changed.subscribe(function () {
                called = true;
                expect(sut.sort.order).toBe(SortOrder_enum_1.SortOrder.Ascending);
            });
            sut.sort.order = SortOrder_enum_1.SortOrder.Ascending;
            expect(called).toBeTruthy();
        });
        it('event emitter should be triggered with new predicate', function () {
            var sut = new DefaultTableState_class_1.DefaultTableState();
            var called = false;
            sut.sort.changed.subscribe(function () {
                called = true;
                expect(sut.sort.predicate).toBe("id");
            });
            sut.sort.predicate = "id";
            expect(called).toBeTruthy();
        });
    });
});
//# sourceMappingURL=DefaultTableState.spec.js.map