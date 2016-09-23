import { EventEmitter } from "@angular/core";
import { TableDirective } from "./../Table/Table.directive";
import { ITableState } from "./../TableState/ITableState.interface";
export declare class PipeComponent {
    table: TableDirective;
    refreshData: EventEmitter<ITableState>;
    /**
     *
     */
    constructor();
}
