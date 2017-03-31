import { EventEmitter } from "@angular/core";
export interface IPaginationState {
    start: number;
    pageSize: number;
    totalItemCount: number;
    changed: EventEmitter<void>;
}
