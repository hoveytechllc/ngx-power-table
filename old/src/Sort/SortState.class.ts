import { ISortState } from './ISortState.interface' ;
import { EventEmitter} from '@angular/core';
import { SortOrder } from './SortOrder.enum';

export class SortState implements ISortState {
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
