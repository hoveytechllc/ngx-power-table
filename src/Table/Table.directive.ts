import { Directive, EventEmitter, Output, Input, SimpleChange, OnChanges, ChangeDetectorRef, DoCheck } from "@angular/core";

import { ITableState } from "./../TableState/ITableState.interface";
import { DefaultTableState } from "./../TableState/DefaultTableState.class";
import { PropertyValueSelectorEvent } from './../Sort/PropertyValueSelectorEvent.class';
import { SortOrder } from './../Sort/SortOrder.enum';

@Directive({
    selector: "[ptTable]"
})
export class TableDirective {
    public customPipe: Function;

    @Input('ptTable')
    public originalArray: Array<any>;

    @Input('ptDisplayArray')
    public displayArray: Array<any>;
    @Output('ptDisplayArrayChange')
    displayArrayChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    /*
        two-way binding for ITableState
    */
    @Input()
    public tableState: ITableState;
    @Output()
    tableStateChange: EventEmitter<ITableState> = new EventEmitter<ITableState>();

    /*
        if consumer would like to leverage aggresive minification for their
        project they can leverage this callback to select property value
        internally it will be used to sort
    */
    @Output()
    propertySelector: EventEmitter<PropertyValueSelectorEvent> = new EventEmitter<PropertyValueSelectorEvent>();

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.customPipe = null;
    }

    ngOnInit() {
        this.getTableState();
    }

    public preventRefreshDataEvent() {

    }

    private getTableState() {
        if (!this.tableState) {
            this.tableState = new DefaultTableState();
            this.tableStateChange.emit(this.tableState);
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    }

    public doSort(predicate: string, order: SortOrder) {
        var state = this.getTableState();
        state.sort.predicate = predicate;
        state.sort.order = order;

        this.pipe();
    }

    public doSearch(predicate: string, reverse: boolean) {
        // update table state
        // 

        this.pipe();
    }

    public overridePipe(func: Function) {
        this.customPipe = func;
        this.pipe();
    }

    private getPropertyValue(row: any): any {
        if (!row) return undefined;

        var state = this.getTableState();

        if (this.propertySelector.observers.length > 0) {
            var msg = new PropertyValueSelectorEvent();
            msg.row = row;
            msg.propertyName = state.sort.predicate;
            this.propertySelector.emit(msg);
            return msg.value;
        }

        return row[state.sort.predicate];
    }

    public pipe() {
        if (this.customPipe) {
            this.customPipe();
            return;
        }

        if (!this.originalArray)
            return;

        var state = this.getTableState();

        // 1. filter array by possible search predicate

        // 2. sort array if predicate
        if (state.sort.predicate) {
            var newArray: Array<any> = new Array<any>();

            newArray = this.originalArray.sort((a, b) => {
                var aValue = this.getPropertyValue(a);
                var bValue = this.getPropertyValue(b);

                // null or undefined values should be first
                if (!aValue) return 1;

                var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;

                // Descending order only if items not equal, and descending selected.
                if (state.sort.order === SortOrder.Descending
                    && filter !== 0) {
                    filter = filter * -1
                };

                return filter;
            });

            this.displayArray = newArray;
            this.displayArrayChange.emit(this.displayArray);
        }

        // 3. splice array by pageSize if applicable
    };
}
