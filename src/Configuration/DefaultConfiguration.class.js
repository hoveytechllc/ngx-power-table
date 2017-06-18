"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DefaultDataPipeService_class_1 = require("./../Pipe/DefaultDataPipeService.class");
var DefaultTableState_class_1 = require("./../TableState/DefaultTableState.class");
var DefaultConfiguration = (function () {
    function DefaultConfiguration() {
        this.changed = new core_1.EventEmitter();
    }
    Object.defineProperty(DefaultConfiguration.prototype, "ascendingCssClass", {
        get: function () {
            return this._ascendingCssClass;
        },
        set: function (cssClass) {
            var original = this._ascendingCssClass;
            this._ascendingCssClass = cssClass;
            if (original !== this._ascendingCssClass)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultConfiguration.prototype, "descendingCssClass", {
        get: function () {
            return this._descendingCssClass;
        },
        set: function (cssClass) {
            var original = this._descendingCssClass;
            this._descendingCssClass = cssClass;
            if (original !== this._descendingCssClass)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultConfiguration.prototype, "pipeServiceType", {
        get: function () {
            return this._pipeServiceType;
        },
        set: function (t) {
            var original = this._pipeServiceType;
            this._pipeServiceType = t;
            if (original !== this._pipeServiceType)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DefaultConfiguration.prototype, "tableStateType", {
        get: function () {
            return this._tableStateType;
        },
        set: function (t) {
            var original = this._tableStateType;
            this._tableStateType = t;
            if (original !== this._tableStateType)
                this.changed.emit();
        },
        enumerable: true,
        configurable: true
    });
    DefaultConfiguration.create = function () {
        var config = new DefaultConfiguration();
        config.ascendingCssClass = 'pt-sort-asc';
        config.descendingCssClass = 'pt-sort-desc';
        config.pipeServiceType = DefaultDataPipeService_class_1.DefaultDataPipeService;
        config.tableStateType = DefaultTableState_class_1.DefaultTableState;
        return config;
    };
    DefaultConfiguration.prototype.copy = function () {
        var config = new DefaultConfiguration();
        config.ascendingCssClass = this.ascendingCssClass;
        config.descendingCssClass = this.descendingCssClass;
        config.pipeServiceType = this.pipeServiceType;
        config.tableStateType = this.tableStateType;
        return config;
    };
    return DefaultConfiguration;
}());
exports.DefaultConfiguration = DefaultConfiguration;
//# sourceMappingURL=DefaultConfiguration.class.js.map