import { EventEmitter } from "@angular/core";

import { DefaultDataPipeService } from "./../Pipe/DefaultDataPipeService.class";
import { IConfiguration } from "./IConfiguration.interface";

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

    public static create(): DefaultConfiguration{
        var config = new DefaultConfiguration();

        config.ascendingCssClass = 'fa fa-sort-asc'
        config.descendingCssClass = 'fa fa-sort-desc'
        config.pipeServiceType = DefaultDataPipeService;

        return config; 
    } 

    public copy() : DefaultConfiguration{
        var config = new DefaultConfiguration();

        config.ascendingCssClass = this.ascendingCssClass;
        config.descendingCssClass = this.descendingCssClass
        config.pipeServiceType = this.pipeServiceType;

        return config; 
    }
}