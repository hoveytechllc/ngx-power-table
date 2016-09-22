"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var DefaultTableState_class_1 = require("./../TableState/DefaultTableState.class");
var PropertyValueSelectorEvent_class_1 = require('./../Sort/PropertyValueSelectorEvent.class');
var Sort_directive_1 = require('./../Sort/Sort.directive');
var TableDirective = (function () {
    function TableDirective(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.displayArrayChange = new core_1.EventEmitter();
        this.tableStateChange = new core_1.EventEmitter();
        /*
            if consumer would like to leverage aggresive minification for their
            project they can leverage this callback to select property value
            internally it will be used to sort
        */
        this.propertySelector = new core_1.EventEmitter();
        this.customPipe = null;
    }
    TableDirective.prototype.ngOnInit = function () {
        this.getTableState();
    };
    TableDirective.prototype.preventRefreshDataEvent = function () {
    };
    TableDirective.prototype.getTableState = function () {
        if (!this.tableState) {
            this.tableState = new DefaultTableState_class_1.DefaultTableState();
            this.tableStateChange.emit(this.tableState);
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    };
    TableDirective.prototype.doSort = function (predicate, order) {
        var state = this.getTableState();
        state.sort.predicate = predicate;
        state.sort.order = order;
        this.pipe();
    };
    TableDirective.prototype.doSearch = function (predicate, reverse) {
        // update table state
        // 
        this.pipe();
    };
    TableDirective.prototype.overridePipe = function (func) {
        this.customPipe = func;
        this.pipe();
    };
    TableDirective.prototype.getPropertyValue = function (row) {
        if (!row)
            return undefined;
        var state = this.getTableState();
        if (this.propertySelector.observers.length > 0) {
            var msg = new PropertyValueSelectorEvent_class_1.PropertyValueSelectorEvent();
            msg.row = row;
            msg.propertyName = state.sort.predicate;
            this.propertySelector.emit(msg);
            return msg.value;
        }
        return row[state.sort.predicate];
    };
    TableDirective.prototype.pipe = function () {
        var _this = this;
        if (this.customPipe) {
            this.customPipe();
            return;
        }
        if (!this.originalArray)
            return;
        var state = this.getTableState();
        // 1. filter array by possible search predicate
        // 2. sort array if predicate
        if (state.sort.predicate) {
            var newArray = new Array();
            newArray = this.originalArray.sort(function (a, b) {
                var aValue = _this.getPropertyValue(a);
                var bValue = _this.getPropertyValue(b);
                // null or undefined values should be first
                if (!aValue)
                    return 1;
                var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                // Descending order only if items not equal, and descending selected.
                if (state.sort.order === Sort_directive_1.SortOrder.Descending
                    && filter !== 0) {
                    filter = filter * -1;
                }
                ;
                return filter;
            });
            this.displayArray = newArray;
            this.displayArrayChange.emit(this.displayArray);
        }
        // 3. splice array by pageSize if applicable
    };
    ;
    __decorate([
        core_1.Input('ptTable'), 
        __metadata('design:type', Array)
    ], TableDirective.prototype, "originalArray", void 0);
    __decorate([
        core_1.Input('ptDisplayArray'), 
        __metadata('design:type', Array)
    ], TableDirective.prototype, "displayArray", void 0);
    __decorate([
        core_1.Output('ptDisplayArrayChange'), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableDirective.prototype, "displayArrayChange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableDirective.prototype, "tableState", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableDirective.prototype, "tableStateChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableDirective.prototype, "propertySelector", void 0);
    TableDirective = __decorate([
        core_1.Directive({
            selector: "[ptTable]"
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], TableDirective);
    return TableDirective;
}());
exports.TableDirective = TableDirective;
//# sourceMappingURL=Table.directive.js.map