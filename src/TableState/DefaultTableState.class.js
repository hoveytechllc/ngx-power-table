"use strict";
var core_1 = require("@angular/core");
var SortOrder_enum_1 = require("./../Sort/SortOrder.enum");
var DefaultTableStateSearch = (function () {
    function DefaultTableStateSearch() {
    }
    return DefaultTableStateSearch;
}());
exports.DefaultTableStateSearch = DefaultTableStateSearch;
var DefaultTableStatePagination = (function () {
    function DefaultTableStatePagination() {
        this.changed = new core_1.EventEmitter();
        this.start = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
        this.numberOfPages = 0;
    }
    Object.defineProperty(DefaultTableStatePagination.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            var original = this._start;
            this._start = value;
            if (original !== this._start)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultTableStatePagination.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            var original = this._pageSize;
            this._pageSize = value;
            if (original !== this._pageSize)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultTableStatePagination.prototype, "totalItemCount", {
        get: function () {
            return this._totalItemCount;
        },
        set: function (value) {
            var original = this._totalItemCount;
            this._totalItemCount = value;
            if (original !== this._totalItemCount)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultTableStatePagination.prototype, "numberOfPages", {
        get: function () {
            return this._numberOfPages;
        },
        set: function (value) {
            var original = this._numberOfPages;
            this._numberOfPages = value;
            if (original !== this._numberOfPages)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    return DefaultTableStatePagination;
}());
exports.DefaultTableStatePagination = DefaultTableStatePagination;
var DefaultTableStateSort = (function () {
    function DefaultTableStateSort() {
        this.changed = new core_1.EventEmitter();
        this._order = SortOrder_enum_1.SortOrder.NotSet;
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