"use strict";
var core_1 = require("@angular/core");
var Sort_directive_1 = require('./../Sort/Sort.directive');
var DefaultTableStateSearch = (function () {
    function DefaultTableStateSearch() {
    }
    return DefaultTableStateSearch;
}());
exports.DefaultTableStateSearch = DefaultTableStateSearch;
var DefaultTableStatePagination = (function () {
    function DefaultTableStatePagination() {
        this.start = 0;
        this.end = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
    }
    return DefaultTableStatePagination;
}());
exports.DefaultTableStatePagination = DefaultTableStatePagination;
var DefaultTableStateSort = (function () {
    function DefaultTableStateSort() {
        this.changed = new core_1.EventEmitter();
        this._order = Sort_directive_1.SortOrder.NotSet;
        this._predicate = null;
    }
    Object.defineProperty(DefaultTableStateSort.prototype, "order", {
        get: function () {
            return this._order;
        },
        set: function (order) {
            var original = this._order;
            this._order = order;
            if (original !== this._order)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultTableStateSort.prototype, "predicate", {
        get: function () {
            return this._predicate;
        },
        set: function (predicate) {
            var original = this._predicate;
            this._predicate = predicate;
            if (original !== this._predicate)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    return DefaultTableStateSort;
}());
exports.DefaultTableStateSort = DefaultTableStateSort;
var DefaultTableState = (function () {
    function DefaultTableState() {
        this.sort = new DefaultTableStateSort();
        this.pagination = new DefaultTableStatePagination();
        this.search = new DefaultTableStateSearch();
    }
    return DefaultTableState;
}());
exports.DefaultTableState = DefaultTableState;
//# sourceMappingURL=DefaultTableState.class.js.map