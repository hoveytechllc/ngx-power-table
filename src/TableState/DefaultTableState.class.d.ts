import { EventEmitter } from "@angular/core";
import { IDefaultTableState } from "./IDefaultTableState.interface";
import { IPaginationState } from './../Pagination/IPaginationState.interface';
import { ISortState } from './../Sort/ISortState.interface';
export declare class DefaultTableState implements IDefaultTableState {
    private static PreventEmitting;
    changed: EventEmitter<void>;
    updateWithoutEmitting(action: () => void): void;
    private tryEmit();
    private _sort;
    sort: ISortState;
    private _pagination;
    pagination: IPaginationState;
    constructor();
}
