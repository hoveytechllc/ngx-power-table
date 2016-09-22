import { EventEmitter } from "@angular/core";
import { SortOrder } from './../Sort/Sort.directive';

export interface ITableStateSearch {

}

export interface ITableStatePagination {
    start: number;
    end: number;
    pageSize: number;
    totalItemCount: number;
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