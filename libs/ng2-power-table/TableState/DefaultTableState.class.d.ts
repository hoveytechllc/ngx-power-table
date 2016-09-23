import { EventEmitter } from "@angular/core";
import { ITableState, ITableStatePagination, ITableStateSearch, ITableStateSort } from "./ITableState.interface";
import { SortOrder } from './../Sort/SortOrder.enum';
export declare class DefaultTableStateSearch implements ITableStateSearch {
}
export declare class DefaultTableStatePagination implements ITableStatePagination {
    start: number;
    end: number;
    pageSize: number;
    totalItemCount: number;
    constructor();
}
export declare class DefaultTableStateSort implements ITableStateSort {
    changed: EventEmitter<void>;
    private _order;
    order: SortOrder;
    private _predicate;
    predicate: string;
    constructor();
}
export declare class DefaultTableState implements ITableState {
    sort: DefaultTableStateSort;
    pagination: DefaultTableStatePagination;
    search: DefaultTableStateSearch;
    constructor();
}
