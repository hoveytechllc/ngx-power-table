import { Component, OnInit, Host } from '@angular/core';

import { TableDirective } from './../Table/Table.directive';
import { ITableState } from './../TableState/ITableState.interface';
import { IDefaultTableStatePagination } from './../TableState/IDefaultTableState.interface';
import { IPaginationState } from './IPaginationState.interface';
import { PaginationState } from './PaginationState.class';

var paginationTemplate = `
<div class="btn-group" role="group">
  <button type="button" class="btn btn-default" [disabled]="currentPage === 1"
    [ngClass]="{ 'disabled' : currentPage === 1}"
     (click)="goToFirstPage()"><i class="fa fa-angle-double-left"></i></button>
  <button type="button" class="btn btn-default" [disabled]="currentPage==1"
    [ngClass]="{ 'disabled' : currentPage === 1}" 
    (click)="goToPreviousPage()"><i class="fa fa-angle-left"></i></button>

  <button *ngFor="let page of pages" type="button" class="btn btn-default" 
    [ngClass]="{ 'active' : page === currentPage}"
    (click)="selectPage(page)">
    {{page}}
  </button>

  <button type="button" class="btn btn-default" [disabled]="currentPage==numPages" 
    [ngClass]="{ 'disabled' : currentPage === numPages}"
    (click)="goToNextPage()"><i class="fa fa-angle-right"></i></button>
  <button type="button" class="btn btn-default" [disabled]="currentPage==numPages" 
    [ngClass]="{ 'disabled' : currentPage === numPages}"
    (click)="goToLastPage()"><i class="fa fa-angle-double-right"></i></button>
</div>`;

@Component({
    selector: 'pt-pagination',
    template: paginationTemplate
})
export class PaginationComponent {
    private removeTableStateListener: any;
    private removePaginationListener: any;

    public currentPage: number;
    public pages: Array<number>;
    public numPages: number;

    public displayedPagesCount: number;

    /**
     *
     */
    constructor(public table: TableDirective) {

        this.displayedPagesCount = 5;

        this.onTableStateChanged(this.table.tableState);
        this.removeTableStateListener = this.table.tableStateChange.subscribe((tableState: ITableState) => {
            this.onTableStateChanged(tableState);
        });

    }

    ngOnInit() {
        this.rebuildPagination();
    }

    ngOnDestroy() {
        if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe) this.removeTableStateListener.unsubscribe();
        this.unsubscribeToPagination();
    }

    private unsubscribeToPagination() {
        if (this.removePaginationListener && this.removePaginationListener.unsubscribe) this.removePaginationListener.unsubscribe();
    }

    private rebuildPagination() {
        var start = 1;
        var end: number;
        var i: number;

        var pagination = this.getPaginationState();

        if (!pagination) return;

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

    }

    public goToFirstPage() {
        this.selectPage(1);
    }

    public goToPreviousPage() {
        this.selectPage(this.currentPage - 1);
    }

    public goToNextPage() {
        this.selectPage(this.currentPage + 1);
    }

    public goToLastPage() {
        this.selectPage(this.numPages);
    }

    public selectPage(page: number): void {
        if (page > 0 && page <= this.numPages) {
            var pageSize = this.getPaginationState().pageSize;
            this.triggerPaging((page - 1) * pageSize);
        }
    }

    private triggerPaging(start: number) {
        this.getPaginationState().start = start;
    }

    private getPaginationState(): IPaginationState {
        var tableState = <any>this.table.tableState as IDefaultTableStatePagination;
        if (!tableState || !tableState.pagination) {
            return null;
        }
        return tableState.pagination;
    }

    private onTableStateChanged(tableState: ITableState) {
        this.unsubscribeToPagination();
        this.rebuildPagination();
        var pagination = this.getPaginationState();

        if (pagination && pagination.changed) {
            this.removePaginationListener = pagination.changed.subscribe(() => {
                this.rebuildPagination();
            });
        }
    }
}