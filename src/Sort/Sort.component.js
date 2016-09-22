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
var Table_component_1 = require("./../Table.component");
(function (SortOrder) {
    SortOrder[SortOrder["NotSet"] = 0] = "NotSet";
    SortOrder[SortOrder["Ascending"] = 1] = "Ascending";
    SortOrder[SortOrder["Descending"] = 2] = "Descending";
})(exports.SortOrder || (exports.SortOrder = {}));
var SortOrder = exports.SortOrder;
var SortComponent = (function () {
    /**
     *
     */
    function SortComponent(table, element, renderer) {
        var _this = this;
        this.table = table;
        this.element = element;
        this.renderer = renderer;
        this.order = SortOrder.NotSet;
        this.suppressSortChangedHandler = false;
        this.removeClickListener = this.renderer.listen(this.element.nativeElement, 'click', function (ev) {
            _this.onClicked(ev);
        });
        this.removeTableStateListener = this.table.tableStateChange.subscribe(function (tableState) {
            _this.onTableStateChanged(tableState);
        });
    }
    SortComponent.prototype.ngOnDestroy = function () {
        if (this.removeClickListener)
            this.removeClickListener();
        if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe)
            this.removeTableStateListener.unsubscribe();
        this.unsubscribeToSortListener();
    };
    SortComponent.prototype.unsubscribeToSortListener = function () {
        if (this.removeSortListener && this.removeSortListener.unsubscribe)
            this.removeSortListener.unsubscribe();
    };
    SortComponent.prototype.resolveTableState = function () {
        if (this.suppressSortChangedHandler) {
            // this directive is causing the callback   
            return;
        }
        // 1. consumer of power-table is modifying sort values directly.
        // 2. another sort triggered sort so we need to update state.
        if ((!this.table.tableState.sort.predicate || (this.table.tableState.sort.predicate !== this.predicate))
            && this.order !== SortOrder.NotSet) {
            // tableState has no predicate set, everything should be clear
            this.order = SortOrder.NotSet;
            // fix css classes
            return;
        }
        if (!this.table.tableState.sort.predicate)
            return;
        if (this.table.tableState.sort.predicate === this.predicate
            && this.table.tableState.sort.order !== this.order) {
            // since suppressSortChangedHandler was not set, we can safely assume
            // we need to trigger sort.
            this.order = this.table.tableState.sort.order;
            this.triggerSort();
            // fix css classes
            return;
        }
    };
    SortComponent.prototype.onTableStateChanged = function (tableState) {
        var _this = this;
        this.unsubscribeToSortListener();
        this.resolveTableState();
        this.removeSortListener = tableState.sort.changed.subscribe(function () {
            _this.resolveTableState();
        });
    };
    SortComponent.prototype.triggerSort = function () {
        this.suppressSortChangedHandler = true;
        this.table.doSort(this.predicate, this.order);
        this.suppressSortChangedHandler = false;
    };
    SortComponent.prototype.onClicked = function (ev) {
        if (this.order === SortOrder.Descending) {
            // manual reset
            this.order = SortOrder.NotSet;
        }
        else {
            this.order++;
        }
        this.triggerSort();
    };
    __decorate([
        core_1.Input("ptSort"), 
        __metadata('design:type', String)
    ], SortComponent.prototype, "predicate", void 0);
    SortComponent = __decorate([
        core_1.Directive({
            selector: "[ptSort]"
        }), 
        __metadata('design:paramtypes', [Table_component_1.TableComponent, core_1.ElementRef, core_1.Renderer])
    ], SortComponent);
    return SortComponent;
}());
exports.SortComponent = SortComponent;
//# sourceMappingURL=Sort.component.js.map