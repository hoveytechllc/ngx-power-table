import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableComponent } from "./Table.component";
import { ITableState } from "./ITableState.interface";

@Component({
    selector: "[pt-pipe]"
})
export class PipeComponent {
    @Input()
    table: TableComponent;
    @Output()
    refreshData: EventEmitter<ITableState> = new EventEmitter<ITableState>();

    /**
     *
     */
    constructor() {
        this.table.preventRefreshDataEvent();

    }
}