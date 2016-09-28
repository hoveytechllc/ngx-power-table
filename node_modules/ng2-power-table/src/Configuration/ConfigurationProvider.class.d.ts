import { EventEmitter } from "@angular/core";
import { IConfiguration } from "./IConfiguration.interface";
export declare class ConfigurationProvider {
    globalConfigurationChanged: EventEmitter<IConfiguration>;
    private unsubscribeObject;
    private _globalConfiguration;
    globalConfiguration: IConfiguration;
    private registerListener();
}
