import { Directive, EventEmitter, Output, Input, SimpleChanges, OnChanges, ChangeDetectorRef, DoCheck, Injector } from "@angular/core";

import { ITableState } from "./../TableState/ITableState.interface";
import { DefaultTableState } from "./../TableState/DefaultTableState.class";
import { SortOrder } from './../Sort/SortOrder.enum';
import { ConfigurationProvider } from './../Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../Configuration/IConfiguration.interface';
import { IDataPipeService, IDataPipeFunction } from './../Pipe/IDataPipeService.interface';

@Directive({
    selector: "[ptTable]"
})
export class TableDirective {
    private dataPipeService: IDataPipeService;
    private currentConfiguration: IConfiguration;
    private removeConfigListener: any;

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
        if (this.removeConfigListener && this.removeConfigListener.unsubscribe) this.removeConfigListener.unsubscribe();
    }

    ngOnInit() {
        if (this.tableState) {
            this.tableStateChange.emit(this.tableState);
        }

        this.getTableState();

        if (this.dataPipe.observers.length > 0){
            this.pipe();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        var callPipe: boolean = false;

        if (changes['tableState'] && this.tableState) {
            this.tableStateChange.emit(this.tableState);
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

        if (callPipe) {
            this.pipe();
        }
    }

    private getTableState() {
        if (!this.tableState) {
            this.tableState = new DefaultTableState();
            this.tableStateChange.emit(this.tableState);
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
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

    public updateDisplayArray(results: Array<any>, totalItemCount: number): void {
        this.tableState.pagination.totalItemCount = totalItemCount;

        this.displayArray = results;
        this.displayArrayChange.emit(this.displayArray);
    }

    public pipe() {
        var state = this.getTableState();
        var config = this.getConfiguration();
        var pipeResult: Promise<Array<any>>;

        if (this.dataPipe.observers.length > 0) {
            this.dataPipe.emit([this, state, config]);
            return;
        }

        if (!this.dataPipeService)
            this.dataPipeService = this.injector.get(config.pipeServiceType);

        this.dataPipeService.pipe(this.originalArray, state, config)
            .then((array: Array<any>) => {
                this.displayArray = array;
                this.displayArrayChange.emit(this.displayArray);
                this.changeDetectorRef.detectChanges();
            });
    };
}
