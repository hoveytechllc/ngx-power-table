import { Directive, Input, ElementRef, Renderer, SimpleChange, Inject, Host } from "@angular/core";
import { TableDirective } from "./../Table/Table.directive";
import { ITableState } from "./../TableState/ITableState.interface"
import { IDefaultTableStateSort } from './../TableState/IDefaultTableState.interface';
import { SortOrder } from "./SortOrder.enum";
import { ISortState } from './ISortState.interface';
import { SortState } from './SortState.class'

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

        var sort = this.getSortState();
        if (!sort) return;

        if ((!sort.predicate || (sort.predicate !== this.predicate))
            && this.order !== SortOrder.NotSet) {
            // tableState has no predicate set, everything should be clear
            this.order = SortOrder.NotSet;
            this.updateSortDisplay();
            // fix css classes
            return;
        }

        if (!sort.predicate)
            return;

        if (sort.predicate === this.predicate
            && sort.order !== this.order) {
            // since suppressSortChangedHandler was not set, we can safely assume
            // we need to trigger sort.
            this.order = sort.order;
            this.updateSortDisplay();
            this.table.pipe();
            // fix css classes
            return;
        }
    }

    private onTableStateChanged(tableState: ITableState) {
        this.unsubscribeToSortListener();
        this.resolveTableState();
        var sort = this.getSortState();

        if (sort){
        this.removeSortListener = sort.changed.subscribe(() => {
            this.resolveTableState();
        });
        }
    }

    private updateSortDisplay() {
        var config = this.table.getConfiguration();
        var addAscending: boolean = (this.order === SortOrder.Ascending);
        var addDescending: boolean = (this.order === SortOrder.Descending);

        if (!addDescending && addAscending) {
            this.setElementClass(config.descendingCssClass, addDescending);
            this.setElementClass(config.ascendingCssClass, addAscending);
        }
        else {
            this.setElementClass(config.ascendingCssClass, addAscending);
            this.setElementClass(config.descendingCssClass, addDescending);
        }
    }

    private setElementClass(classValue: string, add: boolean) {
        var classes = classValue.split(' ');

        for (var i = 0; i < classes.length; i++) {
            var value = classes[i];
            this.renderer.setElementClass(this.element.nativeElement, value, add);
        }
    }

    private getSortState(): ISortState {
        var tableState = <any>this.table.tableState as IDefaultTableStateSort;
        if (!tableState || !tableState.sort) {
            return null;
        }
        return tableState.sort;
    }

    private onClicked(ev: MouseEvent) {
        if (this.order === SortOrder.Descending) {
            // manual reset
            this.order = SortOrder.NotSet;
        } else {
            this.order++;
        }
        this.updateSortDisplay();

        this.suppressSortChangedHandler = true;

        var sort = this.getSortState();
        sort.predicate = this.predicate;
        sort.order = this.order;

        this.table.pipe();
        this.suppressSortChangedHandler = false;
    }
}