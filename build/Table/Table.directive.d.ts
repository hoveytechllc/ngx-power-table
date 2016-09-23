import { EventEmitter, ChangeDetectorRef } from "@angular/core";
import { ITableState } from "./../TableState/ITableState.interface";
import { PropertyValueSelectorEvent } from './../Sort/PropertyValueSelectorEvent.class';
import { SortOrder } from './../Sort/SortOrder.enum';
export declare class TableDirective {
    private changeDetectorRef;
    customPipe: Function;
    originalArray: Array<any>;
    displayArray: Array<any>;
    displayArrayChange: EventEmitter<Array<any>>;
    tableState: ITableState;
    tableStateChange: EventEmitter<ITableState>;
    propertySelector: EventEmitter<PropertyValueSelectorEvent>;
    constructor(changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    preventRefreshDataEvent(): void;
    private getTableState();
    doSort(predicate: string, order: SortOrder): void;
    doSearch(predicate: string, reverse: boolean): void;
    overridePipe(func: Function): void;
    private getPropertyValue(row);
    pipe(): void;
}
