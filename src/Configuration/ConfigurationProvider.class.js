"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DefaultConfiguration_class_1 = require("./DefaultConfiguration.class");
var ConfigurationProvider = (function () {
    function ConfigurationProvider() {
        this.globalConfigurationChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(ConfigurationProvider.prototype, "globalConfiguration", {
        get: function () {
            if (!this._globalConfiguration) {
                this._globalConfiguration = DefaultConfiguration_class_1.DefaultConfiguration.create();
                this.registerListener();
            }
            return this._globalConfiguration;
        },
        set: function (config) {
            if (this.unsubscribeObject && this.unsubscribeObject.unsubscribe)
                this.unsubscribeObject.unsubscribe();
            var original = this._globalConfiguration;
            this._globalConfiguration = config;
            if (original !== this._globalConfiguration && this._globalConfiguration) {
                this.registerListener();
                this.globalConfigurationChanged.emit(this._globalConfiguration);
            }
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationProvider.prototype.registerListener = function () {
        var _this = this;
        this.unsubscribeObject = this._globalConfiguration.changed.subscribe(function () {
            _this.globalConfigurationChanged.emit(_this._globalConfiguration);
        });
    };
    return ConfigurationProvider;
}());
ConfigurationProvider = __decorate([
    core_1.Injectable()
], ConfigurationProvider);
exports.ConfigurationProvider = ConfigurationProvider;
//# sourceMappingURL=ConfigurationProvider.class.js.map