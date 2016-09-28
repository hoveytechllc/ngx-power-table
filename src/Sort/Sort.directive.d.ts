import { ElementRef, Renderer } from "@angular/core";
import { TableDirective } from "./../Table/Table.directive";
import { SortOrder } from "./SortOrder.enum";
export declare class SortDirective {
    table: TableDirective;
    private element;
    private renderer;
    predicate: string;
    order: SortOrder;
    private removeClickListener;
    private removeTableStateListener;
    private removeSortListener;
    private suppressSortChangedHandler;
    /**
     *
     */
    constructor(table: TableDirective, element: ElementRef, renderer: Renderer);
    ngOnDestroy(): void;
    private unsubscribeToSortListener();
    private resolveTableState();
    private onTableStateChanged(tableState);
    private onClicked(ev);
}
