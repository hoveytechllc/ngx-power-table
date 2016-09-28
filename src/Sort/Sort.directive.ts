import { Directive, Input, ElementRef, Renderer, SimpleChange, Inject, Host } from "@angular/core";
import { TableDirective } from "./../Table/Table.directive";
import { ITableState } from "./../TableState/ITableState.interface"
import { SortOrder } from "./SortOrder.enum";

@Directive({
    selector: "[ptSort]"
})
export class SortDirective {

    @Input("ptSort")
    public predicate: string;
    public order: SortOrder;

    private removeClickListener: Function;
    private removeTableStateListener: any;
    private removeSortListener: any;
    private suppressSortChangedHandler: boolean;

    /**
     *
     */
    constructor(public table: TableDirective,
        private element: ElementRef,
        private renderer: Renderer) {
        this.order = SortOrder.NotSet;
        this.suppressSortChangedHandler = false;

        this.removeClickListener = this.renderer.listen(this.element.nativeElement, 'click', (ev: MouseEvent) => {
            this.onClicked(ev);
        });

        this.removeTableStateListener = this.table.tableStateChange.subscribe((tableState: ITableState) => {
            this.onTableStateChanged(tableState);
        });
    }

    ngOnDestroy() {
        if (this.removeClickListener) this.removeClickListener();
        if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe) this.removeTableStateListener.unsubscribe();
        this.unsubscribeToSortListener();
    }

    private unsubscribeToSortListener() {
        if (this.removeSortListener && this.removeSortListener.unsubscribe)
            this.removeSortListener.unsubscribe();
    }

    private resolveTableState() {

        if (this.suppressSortChangedHandler) {
            // this directive is causing the callback   
            return;
        }

        if ((!this.table.tableState.sort.predicate || (this.table.tableState.sort.predicate !== this.predicate))
            && this.order !== SortOrder.NotSet) {
            // tableState has no predicate set, everything should be clear
            this.order = SortOrder.NotSet;
            // fix css classes
            return;
        }

        if (!this.table.tableState.sort.predicate)
            return;

        if (this.table.tableState.sort.predicate === this.predicate
            && this.table.tableState.sort.order !== this.order) {
            // since suppressSortChangedHandler was not set, we can safely assume
            // we need to trigger sort.
            this.order = this.table.tableState.sort.order;
            this.table.pipe();
            // fix css classes
            return;
        }
    }

    private onTableStateChanged(tableState: ITableState) {
        this.unsubscribeToSortListener();
        this.resolveTableState();

        this.removeSortListener = tableState.sort.changed.subscribe(() => {
            this.resolveTableState();
        });
    }

    private onClicked(ev: MouseEvent) {
        if (this.order === SortOrder.Descending) {
            // manual reset
            this.order = SortOrder.NotSet;
        } else {
            this.order++;
        }

        this.suppressSortChangedHandler = true;

        var state = this.table.tableState;
        state.sort.predicate = this.predicate;
        state.sort.order = this.order;

        this.table.pipe();
        this.suppressSortChangedHandler = false;
    }
}