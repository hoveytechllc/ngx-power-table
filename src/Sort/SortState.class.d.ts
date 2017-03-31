import { ISortState } from './ISortState.interface';
import { EventEmitter } from '@angular/core';
import { SortOrder } from './SortOrder.enum';
export declare class SortState implements ISortState {
    changed: EventEmitter<void>;
    private _order;
    order: SortOrder;
    private _predicate;
    predicate: string;
    constructor();
}
