"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
// import components / directives for the module
var Table_directive_1 = require("./src/Table/Table.directive");
var Sort_directive_1 = require("./src/Sort/Sort.directive");
var DefaultDataPipeService_class_1 = require("./src/Pipe/DefaultDataPipeService.class");
var Pagination_component_1 = require("./src/Pagination/Pagination.component");
var ConfigurationProvider_class_1 = require("./src/Configuration/ConfigurationProvider.class");
// export for any consumers of module
var Table_directive_2 = require("./src/Table/Table.directive");
exports.TableDirective = Table_directive_2.TableDirective;
var SortOrder_enum_1 = require("./src/Sort/SortOrder.enum");
exports.SortOrder = SortOrder_enum_1.SortOrder;
var Sort_directive_2 = require("./src/Sort/Sort.directive");
exports.SortDirective = Sort_directive_2.SortDirective;
var SortState_class_1 = require("./src/Sort/SortState.class");
exports.SortState = SortState_class_1.SortState;
var DefaultTableState_class_1 = require("./src/TableState/DefaultTableState.class");
exports.DefaultTableState = DefaultTableState_class_1.DefaultTableState;
var DefaultDataPipeService_class_2 = require("./src/Pipe/DefaultDataPipeService.class");
exports.DefaultDataPipeService = DefaultDataPipeService_class_2.DefaultDataPipeService;
var Pagination_component_2 = require("./src/Pagination/Pagination.component");
exports.PaginationComponent = Pagination_component_2.PaginationComponent;
var PaginationState_class_1 = require("./src/Pagination/PaginationState.class");
exports.PaginationState = PaginationState_class_1.PaginationState;
var ConfigurationProvider_class_2 = require("./src/Configuration/ConfigurationProvider.class");
exports.ConfigurationProvider = ConfigurationProvider_class_2.ConfigurationProvider;
var DefaultConfiguration_class_1 = require("./src/Configuration/DefaultConfiguration.class");
exports.DefaultConfiguration = DefaultConfiguration_class_1.DefaultConfiguration;
var declarations = [
    Table_directive_1.TableDirective,
    Sort_directive_1.SortDirective,
    Pagination_component_1.PaginationComponent
];
var PowerTableModule = (function () {
    function PowerTableModule() {
    }
    return PowerTableModule;
}());
PowerTableModule = __decorate([
    core_1.NgModule({
        exports: declarations,
        declarations: [declarations],
        imports: [common_1.CommonModule],
        providers: [DefaultDataPipeService_class_1.DefaultDataPipeService, ConfigurationProvider_class_1.ConfigurationProvider]
    })
], PowerTableModule);
exports.PowerTableModule = PowerTableModule;
//# sourceMappingURL=ng2-power-table.js.map