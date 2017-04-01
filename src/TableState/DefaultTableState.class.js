"use strict";
var core_1 = require("@angular/core");
var PaginationState_class_1 = require("./../Pagination/PaginationState.class");
var SortState_class_1 = require("./../Sort/SortState.class");
var DefaultTableState = (function () {
    function DefaultTableState() {
        this.changed = new core_1.EventEmitter();
        this.sort = new SortState_class_1.SortState();
        this.pagination = new PaginationState_class_1.PaginationState();
    }
    DefaultTableState.prototype.updateWithoutEmitting = function (action) {
        DefaultTableState.PreventEmitting = true;
        action();
        DefaultTableState.PreventEmitting = false;
    };
    DefaultTableState.prototype.tryEmit = function () {
        if (DefaultTableState.PreventEmitting)
            return;
        this.changed.emit();
    };
    Object.defineProperty(DefaultTableState.prototype, "sort", {
        get: function () {
            return this._sort;
        },
        set: function (order) {
            var _this = this;
            var original = this._sort;
            this._sort = order;
            if (original !== this._sort) {
                this._sort.changed.subscribe(function () {
                    _this.tryEmit();
                });
                this.tryEmit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultTableState.prototype, "pagination", {
        get: function () {
            return this._pagination;
        },
        set: function (order) {
            var _this = this;
            var original = this._pagination;
            this._pagination = order;
            if (original !== this._pagination) {
                this._pagination.changed.subscribe(function () {
                    _this.tryEmit();
                });
                this.tryEmit();
            }
        },
        enumerable: true,
        configurable: true
    });
    return DefaultTableState;
}());
exports.DefaultTableState = DefaultTableState;
//# sourceMappingURL=DefaultTableState.class.js.map