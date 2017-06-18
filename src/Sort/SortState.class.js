"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SortOrder_enum_1 = require("./SortOrder.enum");
var SortState = (function () {
    function SortState() {
        this.changed = new core_1.EventEmitter();
        this._order = SortOrder_enum_1.SortOrder.NotSet;
        this._predicate = null;
    }
    Object.defineProperty(SortState.prototype, "order", {
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
    Object.defineProperty(SortState.prototype, "predicate", {
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
    return SortState;
}());
exports.SortState = SortState;
//# sourceMappingURL=SortState.class.js.map