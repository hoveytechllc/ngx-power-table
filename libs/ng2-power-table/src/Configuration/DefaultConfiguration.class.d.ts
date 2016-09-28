import { EventEmitter } from "@angular/core";
import { IConfiguration } from "./IConfiguration.interface";
export declare class DefaultConfiguration implements IConfiguration {
    changed: EventEmitter<void>;
    private _ascendingCssClass;
    ascendingCssClass: string;
    private _descendingCssClass;
    descendingCssClass: string;
    private _pipeServiceType;
    pipeServiceType: any;
    static create(): DefaultConfiguration;
    copy(): DefaultConfiguration;
}
