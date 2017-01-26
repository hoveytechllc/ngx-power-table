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
var Table_directive_1 = require("./../Table/Table.directive");
var paginationTemplate = "\n<div class=\"btn-group\" role=\"group\">\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage === 1\"\n    [ngClass]=\"{ 'disabled' : currentPage === 1}\"\n     (click)=\"goToFirstPage()\"><i class=\"fa fa-angle-double-left\"></i></button>\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==1\"\n    [ngClass]=\"{ 'disabled' : currentPage === 1}\" \n    (click)=\"goToPreviousPage()\"><i class=\"fa fa-angle-left\"></i></button>\n\n  <button *ngFor=\"let page of pages\" type=\"button\" class=\"btn btn-default\" \n    [ngClass]=\"{ 'active' : page === currentPage}\"\n    (click)=\"selectPage(page)\">\n    {{page}}\n  </button>\n\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==numPages\" \n    [ngClass]=\"{ 'disabled' : currentPage === numPages}\"\n    (click)=\"goToNextPage()\"><i class=\"fa fa-angle-right\"></i></button>\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==numPages\" \n    [ngClass]=\"{ 'disabled' : currentPage === numPages}\"\n    (click)=\"goToLastPage()\"><i class=\"fa fa-angle-double-right\"></i></button>\n</div>";
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
    PaginationComponent.prototype.ngOnInit = function () {
        this.rebuildPagination();
    };
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
        if (!this.table.tableState || !this.table.tableState.pagination)
            return;
        var pagination = this.table.tableState.pagination;
        this.numPages = Math.max(1, Math.ceil(pagination.totalItemCount / pagination.pageSize));
        this.currentPage = Math.floor(pagination.start / pagination.pageSize) + 1;
        start = Math.max(start, this.currentPage - Math.abs(Math.floor(this.displayedPagesCount / 2)));
        end = start + this.displayedPagesCount;
        if (end > this.numPages) {
            end = this.numPages + 1;
            start = Math.max(1, end - this.displayedPagesCount);
        }
        this.pages = [];
        for (i = start; i < end; i++) {
            this.pages.push(i);
        }
    };
    PaginationComponent.prototype.goToFirstPage = function () {
        this.selectPage(1);
    };
    PaginationComponent.prototype.goToPreviousPage = function () {
        this.selectPage(this.currentPage - 1);
    };
    PaginationComponent.prototype.goToNextPage = function () {
        this.selectPage(this.currentPage + 1);
    };
    PaginationComponent.prototype.goToLastPage = function () {
        this.selectPage(this.numPages);
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
        if (tableState && tableState.pagination && tableState.pagination.changed) {
            this.removePaginationListener = tableState.pagination.changed.subscribe(function () {
                _this.rebuildPagination();
            });
        }
    };
    return PaginationComponent;
}());
PaginationComponent = __decorate([
    core_1.Component({
        selector: 'pt-pagination',
        template: paginationTemplate
    }),
    __metadata("design:paramtypes", [Table_directive_1.TableDirective])
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=Pagination.component.js.map