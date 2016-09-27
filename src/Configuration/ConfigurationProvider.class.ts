import { EventEmitter, Injectable } from "@angular/core";
import { DefaultConfiguration } from "./DefaultConfiguration.class";
import { IConfiguration } from "./IConfiguration.interface";

@Injectable()
export class ConfigurationProvider {

    public globalConfigurationChanged: EventEmitter<IConfiguration> = new EventEmitter<IConfiguration>();
    private unsubscribeObject: any;

    private _globalConfiguration: IConfiguration;
    get globalConfiguration(): IConfiguration {
        if (!this._globalConfiguration) {
            this._globalConfiguration = DefaultConfiguration.create();
            this.registerListener();
        }

        return this._globalConfiguration;
    }
    set globalConfiguration(config: IConfiguration) {
        if (this.unsubscribeObject && this.unsubscribeObject.unsubscribe)
            this.unsubscribeObject.unsubscribe();

        var original = this._globalConfiguration;
        this._globalConfiguration = config;

        if (original !== this._globalConfiguration && this._globalConfiguration) {
            this.registerListener();
            this.globalConfigurationChanged.emit(this._globalConfiguration);
        }
    }

    private registerListener() {
        this.unsubscribeObject = this._globalConfiguration.changed.subscribe(() => {
            this.globalConfigurationChanged.emit(this._globalConfiguration);
        })
    }

}