import { EventEmitter } from "@angular/core";
import { IDefaultTableState } from "./IDefaultTableState.interface";
import { PaginationState } from './../Pagination/PaginationState.class';
import { SortState } from './../Sort/SortState.class';
import { IPaginationState } from './../Pagination/IPaginationState.interface';
import { ISortState } from './../Sort/ISortState.interface';

export class DefaultTableState implements IDefaultTableState {
    private static PreventEmitting: boolean = false;

    public changed: EventEmitter<void> = new EventEmitter<void>();

    public updateWithoutEmitting(action: () => void): void {
        DefaultTableState.PreventEmitting = true;
        action();
        DefaultTableState.PreventEmitting = false;
    }

    private tryEmit(): void{
        if (DefaultTableState.PreventEmitting) return;
        this.changed.emit();
    }

    private _sort: ISortState;
    get sort(): ISortState {
        return this._sort;
    }
    set sort(order: ISortState) {
        var original = this._sort;
        this._sort = order;

        if (original !== this._sort){
            this._sort.changed.subscribe(() => {
                this.tryEmit();
            });
            this.tryEmit();
        }
    }

    private _pagination: IPaginationState;
    get pagination(): IPaginationState {
        return this._pagination;
    }
    set pagination(order: IPaginationState) {
        var original = this._pagination;
        this._pagination = order;

        if (original !== this._pagination){
            this._pagination.changed.subscribe(() => {
                this.tryEmit();
            });
                this.tryEmit();
        }
    }

    constructor() {
        this.sort = new SortState();
        this.pagination = new PaginationState();
    }
}

