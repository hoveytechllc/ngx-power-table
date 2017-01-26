import { EventEmitter } from "@angular/core";
import { SortOrder } from './../Sort/SortOrder.enum';
export interface ITableStateSearch {
}
export interface ITableStatePagination {
    start: number;
    pageSize: number;
    totalItemCount: number;
    changed: EventEmitter<void>;
}
export interface ITableStateSort {
    predicate: string;
    order: SortOrder;
    changed: EventEmitter<void>;
}
export interface ITableState {
    sort: ITableStateSort;
    search: ITableStateSearch;
    pagination: ITableStatePagination;
}
