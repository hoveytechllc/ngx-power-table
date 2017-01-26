import { EventEmitter } from "@angular/core";
import { ITableState, ITableStatePagination, ITableStateSearch, ITableStateSort } from "./ITableState.interface";
import { SortOrder } from './../Sort/SortOrder.enum';

export class DefaultTableStateSearch implements ITableStateSearch {

}

export class DefaultTableStatePagination implements ITableStatePagination {
    
    public changed: EventEmitter<void> = new EventEmitter<void>();
    
    private _start: number;
    get start(): number {
        return this._start;
    }
    set start(value: number) {
        var original = this._start;
        this._start = value;

        if (original !== this._start) 
            this.changed.emit();
    }
       
    private _pageSize: number;
    get pageSize(): number {
        return this._pageSize;
    }
    set pageSize(value: number) {
        var original = this._pageSize;
        this._pageSize = value;

        if (original !== this._pageSize) 
            this.changed.emit();
    }

    private _totalItemCount: number;
    get totalItemCount(): number {
        return this._totalItemCount;
    }
    set totalItemCount(value: number) {
        var original = this._totalItemCount;
        this._totalItemCount = value;

        if (original !== this._totalItemCount) 
            this.changed.emit();
    }

    private _numberOfPages: number;
    get numberOfPages(): number {
        return this._numberOfPages;
    }
    set numberOfPages(value: number) {
        var original = this._numberOfPages;
        this._numberOfPages = value;

        if (original !== this._numberOfPages) 
            this.changed.emit();
    }

    constructor() {
        this.start = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
        this.numberOfPages = 0;
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

