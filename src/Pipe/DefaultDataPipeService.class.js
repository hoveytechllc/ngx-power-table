"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SortOrder_enum_1 = require("./../Sort/SortOrder.enum");
var PaginationState_class_1 = require("./../Pagination/PaginationState.class");
var SortState_class_1 = require("./../Sort/SortState.class");
var DefaultDataPipeService = (function () {
    function DefaultDataPipeService() {
    }
    DefaultDataPipeService.prototype.pipe = function (data, tableState, configuration) {
        if (!data || !Array.isArray(data)) {
            return Promise.resolve(undefined);
        }
        var resultArray = [].concat(data);
        resultArray = this.filter(resultArray, tableState, configuration);
        resultArray = this.sort(resultArray, tableState, configuration);
        resultArray = this.page(resultArray, tableState, configuration);
        return Promise.resolve(resultArray);
    };
    DefaultDataPipeService.prototype.sort = function (data, tableState, configuration) {
        var tableStateAny = tableState;
        if (!tableStateAny.sort || !(tableStateAny.sort instanceof SortState_class_1.SortState))
            return data;
        var sort = tableStateAny.sort;
        if (sort.order === SortOrder_enum_1.SortOrder.NotSet)
            return data;
        return data.sort(function (a, b) {
            // TODO: Implement configuration setting to help with aggresive minification by consumer
            var aValue = a[sort.predicate];
            var bValue = b[sort.predicate];
            // null or undefined values should be first
            if (!aValue)
                return 1;
            var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            // Descending order only if items not equal, and descending selected.
            if (sort.order === SortOrder_enum_1.SortOrder.Descending
                && filter !== 0) {
                filter = filter * -1;
            }
            ;
            return filter;
        });
    };
    DefaultDataPipeService.prototype.filter = function (data, tableState, configuration) {
        // TODO: Implement filtering
        return data;
    };
    DefaultDataPipeService.prototype.page = function (data, tableState, configuration) {
        var tableStateAny = tableState;
        if (!tableStateAny.pagination || !(tableStateAny.pagination instanceof PaginationState_class_1.PaginationState))
            return data;
        var pagination = tableStateAny.pagination;
        pagination.totalItemCount = data.length;
        return data.slice(pagination.start, pagination.start + pagination.pageSize);
    };
    return DefaultDataPipeService;
}());
DefaultDataPipeService = __decorate([
    core_1.Injectable()
], DefaultDataPipeService);
exports.DefaultDataPipeService = DefaultDataPipeService;
//# sourceMappingURL=DefaultDataPipeService.class.js.map