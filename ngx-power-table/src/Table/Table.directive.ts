import { Directive, EventEmitter, Output, Input, SimpleChanges, OnChanges, ChangeDetectorRef, DoCheck, Injector } from "@angular/core";
import { Subscription } from 'rxjs';

import { ITableState } from "./../TableState/ITableState.interface";
import { DefaultTableState } from "./../TableState/DefaultTableState.class";
import { SortOrder } from './../Sort/SortOrder.enum';
import { ConfigurationProvider } from './../Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../Configuration/IConfiguration.interface';
import { IDataPipeService, IDataPipeFunction } from './../Pipe/IDataPipeService.interface';
import { IDefaultTableStatePagination } from "../TableState/IDefaultTableState.interface";

@Directive({
    selector: "[ptTable]"
})
export class TableDirective {
    private dataPipeService: IDataPipeService;
    private currentConfiguration: IConfiguration;
    private removeConfigListener: any;
    private tableInitialized: boolean = false;
    private subscribedToTableState: boolean = false;
    private tableStateSubscription: Subscription;

    /*
        one-way binding, consumer provides originalArray
    */
    @Input('ptTable')
    public originalArray: Array<any>;

    /*
        two-way binding for ptDisplayArray
    */
    @Input('ptDisplayArray')
    public displayArray: Array<any>;
    @Output('ptDisplayArrayChange')
    displayArrayChange: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

    /*
        Event for custom data-pipe implemented by component.
        Only used if observer is present. Otherwise a IDataPipeService
        is resolved from the injector.
    */
    @Output('ptDataPipe')
    public dataPipe: EventEmitter<any> = new EventEmitter<any>();

    /*
        two-way binding for ITableState
    */
    @Input('ptTableState')
    public tableState: ITableState;
    @Output('ptTableStateChange')
    tableStateChange: EventEmitter<ITableState> = new EventEmitter<ITableState>();

    /*
        one-way binding, consumer can override configuration vs using globalConfiguration
    */
    @Input('ptConfiguration')
    public configurationOverride: IConfiguration;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private injector: Injector,
        private configurationProvider: ConfigurationProvider) {

        this.removeConfigListener = this.configurationProvider.globalConfigurationChanged.subscribe((config: IConfiguration) => {
            this.currentConfiguration = null;
            this.pipe();
        });
    }

    ngOnDestroy() {
        if (this.removeConfigListener && this.removeConfigListener.unsubscribe)
            this.removeConfigListener.unsubscribe();
    }

    ngOnInit() {
        if (this.tableState) {
            this.tableStateChange.emit(this.tableState);
        }

        this.getTableState();
        
        if (!this.tableInitialized) {
            this.pipe();
            this.tableInitialized = true;
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        var callPipe: boolean = false;

        if (changes['tableState'] && this.tableState) {
            this.subscribeToTableStateChanges();
        }
        if (changes['dataPipe']) {
            callPipe = true;
        }
        if (changes['originalArray']) {
            callPipe = true;
        }
        if (changes['configurationOverride']) {
            this.dataPipeService = null;
            this.currentConfiguration = null;
            callPipe = true;
        }

        if (this.tableInitialized && callPipe) {
            this.pipe();
        }
    }

    private getTableState() {
        if (!this.tableState) {
            var config = this.getConfiguration();
            this.tableState = new config.tableStateType();
            this.subscribeToTableStateChanges();
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    }

    private subscribeToTableStateChanges() {
        if (this.tableStateSubscription){
            this.tableStateSubscription.unsubscribe();
        }

        this.tableStateChange.emit(this.tableState);
        this.tableStateSubscription = this.tableState.changed.subscribe(() => {
            this.pipe();
        });
    }

    public getConfiguration(): IConfiguration {
        if (this.currentConfiguration)
            return this.currentConfiguration;

        if (this.configurationOverride) {
            this.currentConfiguration = this.configurationOverride;
        } else {
            this.currentConfiguration = this.configurationProvider.globalConfiguration;
        }

        return this.currentConfiguration;
    }

    public pipe() {
        var state = this.getTableState();
        var config = this.getConfiguration();

        if (this.dataPipe.observers.length > 0) {
            this.dataPipe.emit([state, config]);
            return;
        }

        if (!this.dataPipeService)
            this.dataPipeService = this.injector.get(config.pipeServiceType);

        (<IDataPipeService>this.dataPipeService).pipe(this.originalArray, state, config)
            .then((array: Array<any>) => {
                this.displayArray = array;
                this.displayArrayChange.emit(this.displayArray);
                this.changeDetectorRef.detectChanges();
            });
    };
}
