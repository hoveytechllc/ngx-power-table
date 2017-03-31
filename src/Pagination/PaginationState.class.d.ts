import { EventEmitter } from '@angular/core';
import { IPaginationState } from './IPaginationState.interface';
export declare class PaginationState implements IPaginationState {
    changed: EventEmitter<void>;
    private _start;
    start: number;
    private _pageSize;
    pageSize: number;
    private _totalItemCount;
    totalItemCount: number;
    boundsCheck(): void;
    constructor();
}
