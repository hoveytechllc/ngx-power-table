import { EventEmitter, SimpleChanges, ChangeDetectorRef, Injector } from "@angular/core";
import { ITableState } from "./../TableState/ITableState.interface";
import { ConfigurationProvider } from './../Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../Configuration/IConfiguration.interface';
export declare class TableDirective {
    private changeDetectorRef;
    private injector;
    private configurationProvider;
    private dataPipeService;
    private currentConfiguration;
    private removeConfigListener;
    originalArray: Array<any>;
    displayArray: Array<any>;
    displayArrayChange: EventEmitter<Array<any>>;
    dataPipe: EventEmitter<any>;
    tableState: ITableState;
    tableStateChange: EventEmitter<ITableState>;
    configurationOverride: IConfiguration;
    constructor(changeDetectorRef: ChangeDetectorRef, injector: Injector, configurationProvider: ConfigurationProvider);
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private getTableState();
    getConfiguration(): IConfiguration;
    updateDisplayArray(results: Array<any>, totalItemCount: number): void;
    pipe(): void;
}
