import { EventEmitter } from "@angular/core";
import { ITableState, ITableStatePagination, ITableStateSearch, ITableStateSort } from "./ITableState.interface";
import { SortOrder } from './Sort/Sort.component';

export class DefaultTableStateSearch implements ITableStateSearch {

}

export class DefaultTableStatePagination implements ITableStatePagination {
    public start: number;
    public end: number;
    public pageSize: number;
    public totalItemCount: number;

    constructor() {
        this.start = 0;
        this.end = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
    }
}

export class DefaultTableStateSort implements ITableStateSort {
    
    public changed: EventEmitter<void> = new EventEmitter<void>();
    
    private _order: SortOrder;
    get order(): SortOrder {
        return this._order;
    }
    set order(order: SortOrder) {
        var original = this._order;
        this._order = order;

        if (original !== this._order) 
            this.changed.emit();
    }

    private _predicate: string;
    get predicate(): string {
        return this._predicate;
    }
    set predicate(predicate: string) {
        var original = this._predicate;
        this._predicate = predicate;

        if (original !== this._predicate) 
            this.changed.emit();
    }

    constructor() {
        this._order = SortOrder.NotSet;
        this._predicate = null;
    }
}

export class DefaultTableState implements ITableState {
    public sort: DefaultTableStateSort;
    public pagination: DefaultTableStatePagination;
    public search: DefaultTableStateSearch;

    constructor() {
        this.sort = new DefaultTableStateSort();
        this.pagination = new DefaultTableStatePagination();
        this.search = new DefaultTableStateSearch();
    }
}

