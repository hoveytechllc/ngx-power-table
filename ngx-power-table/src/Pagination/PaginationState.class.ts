import { EventEmitter } from '@angular/core';
import { IPaginationState } from './IPaginationState.interface';

export class PaginationState implements IPaginationState {
    
    public changed: EventEmitter<void> = new EventEmitter<void>();
    
    private _start: number;
    get start(): number {
        return this._start;
    }
    set start(value: number) {
        var original = this._start;
        this._start = value;

        this.boundsCheck();

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

        this.boundsCheck();

        if (original !== this._totalItemCount) 
            this.changed.emit();
    }

    boundsCheck() {
        if (this._start >= this._totalItemCount) {
            let numPages = Math.max(1, Math.ceil(this._totalItemCount / this._pageSize));
            this._start = (numPages - 1) * this._pageSize;
        }
    }

    constructor() {
        this.start = 0;
        this.pageSize = 10;
        this.totalItemCount = 0;
    }
}
