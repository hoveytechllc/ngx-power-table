"use strict";
var core_1 = require("@angular/core");
var PaginationState = (function () {
    function PaginationState() {
        this.changed = new core_1.EventEmitter();
        this.start = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
    }
    Object.defineProperty(PaginationState.prototype, "start", {
        get: function () {
            return this._start;
        },
        set: function (value) {
            var original = this._start;
            this._start = value;
            this.boundsCheck();
            if (original !== this._start)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationState.prototype, "pageSize", {
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
    Object.defineProperty(PaginationState.prototype, "totalItemCount", {
        get: function () {
            return this._totalItemCount;
        },
        set: function (value) {
            var original = this._totalItemCount;
            this._totalItemCount = value;
            this.boundsCheck();
            if (original !== this._totalItemCount)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    PaginationState.prototype.boundsCheck = function () {
        if (this._start >= this._totalItemCount) {
            var numPages = Math.max(1, Math.ceil(this._totalItemCount / this._pageSize));
            this._start = (numPages - 1) * this._pageSize;
        }
    };
    return PaginationState;
}());
exports.PaginationState = PaginationState;
//# sourceMappingURL=PaginationState.class.js.map