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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var Table_directive_1 = require('./../Table/Table.directive');
var PaginationComponent = (function () {
    /**
     *
     */
    function PaginationComponent(table) {
        var _this = this;
        this.table = table;
        this.displayedPagesCount = 5;
        this.removeTableStateListener = this.table.tableStateChange.subscribe(function (tableState) {
            _this.onTableStateChanged(tableState);
        });
    }
    PaginationComponent.prototype.ngOnDestroy = function () {
        if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe)
            this.removeTableStateListener.unsubscribe();
        this.unsubscribeToPagination();
    };
    PaginationComponent.prototype.unsubscribeToPagination = function () {
        if (this.removePaginationListener && this.removePaginationListener.unsubscribe)
            this.removePaginationListener.unsubscribe();
    };
    PaginationComponent.prototype.rebuildPagination = function () {
        var start = 1;
        var end;
        var i;
        //scope.totalItemCount = paginationState.totalItemCount;
        var pagination = this.table.tableState.pagination;
        this.currentPage = Math.floor(pagination.start / pagination.pageSize) + 1;
        start = Math.max(start, this.currentPage - Math.abs(Math.floor(this.displayedPagesCount / 2)));
        end = start + this.displayedPagesCount;
        if (end > pagination.numberOfPages) {
            end = pagination.numberOfPages + 1;
            start = Math.max(1, end - this.displayedPagesCount);
        }
        this.pages = [];
        this.numPages = pagination.numberOfPages;
        for (i = start; i < end; i++) {
            this.pages.push(i);
        }
    };
    PaginationComponent.prototype.selectPage = function (page) {
        if (page > 0 && page <= this.numPages) {
            var pageSize = this.table.tableState.pagination.pageSize;
            this.triggerPaging((page - 1) * pageSize);
        }
    };
    PaginationComponent.prototype.triggerPaging = function (start) {
        this.table.tableState.pagination.start = start;
        this.table.pipe();
    };
    PaginationComponent.prototype.onTableStateChanged = function (tableState) {
        var _this = this;
        this.unsubscribeToPagination();
        this.rebuildPagination();
        this.removePaginationListener = tableState.pagination.changed.subscribe(function () {
            _this.rebuildPagination();
        });
    };
    PaginationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pt-pagination',
            template: "<nav *ngIf=\"numPages && pages.length >= 2\">\n                    <ul class=\"pagination\">\n                        <li *ngFor=\"let page of pages\" ngClass=\"{active: page==currentPage}\"><a href=\"javascript: void(0);\" ng-click=\"selectPage(page)\">{{page}}</a></li>\n                    </ul>\n                </nav>"
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [Table_directive_1.TableDirective])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=Pagination.component.js.map