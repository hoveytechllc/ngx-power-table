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
var SortOrder_enum_1 = require("./../Sort/SortOrder.enum");
var DefaultDataPipeService = (function () {
    function DefaultDataPipeService() {
    }
    DefaultDataPipeService.prototype.pipe = function (data, tableState, configuration) {
        if (!data || !Array.isArray(data)) {
            return undefined;
        }
        var resultArray = [].concat(data);
        resultArray = this.filter(resultArray, tableState, configuration);
        resultArray = this.sort(resultArray, tableState, configuration);
        resultArray = this.page(resultArray, tableState, configuration);
        return resultArray;
    };
    DefaultDataPipeService.prototype.sort = function (data, tableState, configuration) {
        if (!tableState.sort.predicate)
            return data;
        return data.sort(function (a, b) {
            // TODO: Implement configuration setting to help with aggresive minification by consumer
            var aValue = a[tableState.sort.predicate];
            var bValue = b[tableState.sort.predicate];
            // null or undefined values should be first
            if (!aValue)
                return 1;
            var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            // Descending order only if items not equal, and descending selected.
            if (tableState.sort.order === SortOrder_enum_1.SortOrder.Descending
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
        if (!tableState.pagination || !tableState.pagination.pageSize)
            return data;
        tableState.pagination.numberOfPages = data.length > 0 ? Math.ceil(data.length / tableState.pagination.pageSize) : 1;
        tableState.pagination.start = tableState.pagination.start >= data.length ? (tableState.pagination.numberOfPages - 1) * tableState.pagination.pageSize : tableState.pagination.start;
        return data.slice(tableState.pagination.start, tableState.pagination.start + tableState.pagination.pageSize);
    };
    DefaultDataPipeService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DefaultDataPipeService);
    return DefaultDataPipeService;
}());
exports.DefaultDataPipeService = DefaultDataPipeService;
//# sourceMappingURL=DefaultDataPipeService.class.js.map