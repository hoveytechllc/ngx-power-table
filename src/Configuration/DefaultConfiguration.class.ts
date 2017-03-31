import { EventEmitter } from "@angular/core";

import { DefaultDataPipeService } from "./../Pipe/DefaultDataPipeService.class";
import { IConfiguration } from "./IConfiguration.interface";
import { DefaultTableState } from './../TableState/DefaultTableState.class';

export class DefaultConfiguration implements IConfiguration {
    public changed: EventEmitter<void> = new EventEmitter<void>();
    
    private _ascendingCssClass: string;
    get ascendingCssClass(): string {
        return this._ascendingCssClass;
    }
    set ascendingCssClass(cssClass: string) {
        var original = this._ascendingCssClass;
        this._ascendingCssClass = cssClass;

        if (original !== this._ascendingCssClass) 
            this.changed.emit();
    }

    private _descendingCssClass: string;
    get descendingCssClass(): string {
        return this._descendingCssClass;
    }
    set descendingCssClass(cssClass: string) {
        var original = this._descendingCssClass;
        this._descendingCssClass = cssClass;

        if (original !== this._descendingCssClass) 
            this.changed.emit();
    }

    private _pipeServiceType: any;
    get pipeServiceType(): any {
        return this._pipeServiceType;
    }
    set pipeServiceType(t: any) {
        var original = this._pipeServiceType;
        this._pipeServiceType = t;

        if (original !== this._pipeServiceType) 
            this.changed.emit();
    }

    private _tableStateType: any;
    get tableStateType(): any {
        return this._tableStateType;
    }
    set tableStateType(t: any) {
        var original = this._tableStateType;
        this._tableStateType = t;

        if (original !== this._tableStateType) 
            this.changed.emit();
    }

    public static create(): DefaultConfiguration{
        var config = new DefaultConfiguration();

        config.ascendingCssClass = 'pt-sort-asc'
        config.descendingCssClass = 'pt-sort-desc'
        config.pipeServiceType = DefaultDataPipeService;
        config.tableStateType = DefaultTableState;

        return config; 
    } 

    public copy() : DefaultConfiguration{
        var config = new DefaultConfiguration();

        config.ascendingCssClass = this.ascendingCssClass;
        config.descendingCssClass = this.descendingCssClass
        config.pipeServiceType = this.pipeServiceType;
        config.tableStateType = this.tableStateType;

        return config; 
    }
}