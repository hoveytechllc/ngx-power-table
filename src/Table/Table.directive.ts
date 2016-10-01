import { Directive, EventEmitter, Output, Input, SimpleChanges, OnChanges, ChangeDetectorRef, DoCheck, Injector } from "@angular/core";

import { ITableState } from "./../TableState/ITableState.interface";
import { DefaultTableState } from "./../TableState/DefaultTableState.class";
import { SortOrder } from './../Sort/SortOrder.enum';
import { ConfigurationProvider } from './../Configuration/ConfigurationProvider.class';
import { IConfiguration } from './../Configuration/IConfiguration.interface';
import { IDataPipeService } from './../Pipe/IDataPipeService.interface';

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
        two-way binding for ITableState
    */
    @Input()
    public tableState: ITableState;
    @Output()
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
        this.getTableState();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['originalArray']) {
            this.pipe();
        }
        if (changes['configurationOverride']) {
            this.dataPipeService = null;
            this.currentConfiguration = null;
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

    public doSearch(predicate: string, reverse: boolean) {
        // update table state
        // 

        this.pipe();
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

        if (!this.dataPipeService) {
            this.dataPipeService = this.injector.get(config.pipeServiceType);
        }

        this.displayArray = this.dataPipeService.pipe(this.originalArray, state, config);

        this.displayArrayChange.emit(this.displayArray);
        this.changeDetectorRef.detectChanges();
    };
}
