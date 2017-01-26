"use strict";
var DefaultDataPipeService_class_1 = require("./../../src/Pipe/DefaultDataPipeService.class");
var SortOrder_enum_1 = require("./../../src/Sort/SortOrder.enum");
var DefaultTableState_class_1 = require("./../../src/TableState/DefaultTableState.class");
describe('DefaultDataPipeService tests', function () {
    var sut;
    beforeEach(function () {
        sut = new DefaultDataPipeService_class_1.DefaultDataPipeService();
    });
    it('pipe should not sort if predicate or order not provided', function () {
        var state = new DefaultTableState_class_1.DefaultTableState();
        state.sort.order = SortOrder_enum_1.SortOrder.NotSet;
        state.sort.predicate = "id";
        var config = {};
        var data = [
            { id: 3, name: "David" },
            { id: 2, name: "Bill" },
            { id: 1, name: "Stacey" }
        ];
        sut.pipe(data, state, config)
            .then(function (result) {
            expect(data[0].id).toBe(3, "expected data to not be modified");
            expect(data[1].id).toBe(2, "expected data to not be modified");
            expect(data[2].id).toBe(1, "expected data to not be modified");
            expect(result[0].id).toBe(3, "expected result to be sorted");
            expect(result[1].id).toBe(2, "expected result to be sorted");
            expect(result[2].id).toBe(1, "expected result to be sorted");
        });
    });
    it('pipe should not modify original array', function () {
        var state = new DefaultTableState_class_1.DefaultTableState();
        state.sort.order = SortOrder_enum_1.SortOrder.Ascending;
        state.sort.predicate = "id";
        var config = {};
        var data = [
            { id: 3, name: "David" },
            { id: 2, name: "Bill" },
            { id: 1, name: "Stacey" }
        ];
        sut.pipe(data, state, config)
            .then(function (result) {
            expect(data[0].id).toBe(3, "expected data to not be modified");
            expect(data[1].id).toBe(2, "expected data to not be modified");
            expect(data[2].id).toBe(1, "expected data to not be modified");
            expect(result[0].id).toBe(1, "expected result to be sorted");
            expect(result[1].id).toBe(2, "expected result to be sorted");
            expect(result[2].id).toBe(3, "expected result to be sorted");
        });
    });
});
//# sourceMappingURL=DefaultDataPipeService.spec.js.map