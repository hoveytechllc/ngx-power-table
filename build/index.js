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
var core_1 = require('@angular/core');
// import components / directives for the module
var Table_directive_1 = require('./Table/Table.directive');
var Pipe_component_1 = require('./Pipe/Pipe.component');
var Sort_directive_1 = require('./Sort/Sort.directive');
// export for any consumers of module
var SortOrder_enum_1 = require('./Sort/SortOrder.enum');
exports.SortOrder = SortOrder_enum_1.SortOrder;
var Table_directive_2 = require('./Table/Table.directive');
exports.TableDirective = Table_directive_2.TableDirective;
var Sort_directive_2 = require('./Sort/Sort.directive');
exports.SortDirective = Sort_directive_2.SortDirective;
var Pipe_component_2 = require('./Pipe/Pipe.component');
exports.PipeComponent = Pipe_component_2.PipeComponent;
var PropertyValueSelectorEvent_class_1 = require('./Sort/PropertyValueSelectorEvent.class');
exports.PropertyValueSelectorEvent = PropertyValueSelectorEvent_class_1.PropertyValueSelectorEvent;
var DefaultTableState_class_1 = require('./TableState/DefaultTableState.class');
exports.DefaultTableState = DefaultTableState_class_1.DefaultTableState;
exports.DefaultTableStatePagination = DefaultTableState_class_1.DefaultTableStatePagination;
exports.DefaultTableStateSearch = DefaultTableState_class_1.DefaultTableStateSearch;
exports.DefaultTableStateSort = DefaultTableState_class_1.DefaultTableStateSort;
var declarations = [
    Table_directive_1.TableDirective,
    Sort_directive_1.SortDirective,
    Pipe_component_1.PipeComponent
];
var PowerTableModule = (function () {
    function PowerTableModule() {
    }
    PowerTableModule = __decorate([
        core_1.NgModule({
            exports: declarations,
            declarations: declarations
        }), 
        __metadata('design:paramtypes', [])
    ], PowerTableModule);
    return PowerTableModule;
}());
exports.PowerTableModule = PowerTableModule;
//# sourceMappingURL=index.js.map