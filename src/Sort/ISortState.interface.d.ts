import { SortOrder } from './SortOrder.enum';
import { EventEmitter } from '@angular/core';
export interface ISortState {
    predicate: string;
    order: SortOrder;
    changed: EventEmitter<void>;
}
