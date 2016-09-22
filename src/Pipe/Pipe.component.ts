import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableDirective } from "./../Table/Table.directive";
import { ITableState } from "./../TableState/ITableState.interface";

@Component({
    selector: "[pt-pipe]"
})
export class PipeComponent {
    @Input()
    table: TableDirective;
    @Output()
    refreshData: EventEmitter<ITableState> = new EventEmitter<ITableState>();

    /**
     *
     */
    constructor() {
        this.table.preventRefreshDataEvent();

    }
}