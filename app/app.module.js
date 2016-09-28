"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var ng2_power_table_1 = require('ng2-power-table');
var Navigation_component_1 = require('./Navigation/Navigation.component');
var BasicUsage_component_1 = require('./BasicUsage/BasicUsage.component');
var BasicSample_component_1 = require('./BasicUsage/BasicSample.component');
var Sorting_component_1 = require('./Sorting/Sorting.component');
var app_routes_1 = require('./app.routes');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var http_1 = require('@angular/http');
var CodeView_component_1 = require('./BasicUsage/CodeViews/CodeView.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, ng2_power_table_1.PowerTableModule, app_routes_1.routing, ng2_bootstrap_1.Ng2BootstrapModule, http_1.HttpModule, http_1.JsonpModule],
            declarations: [app_component_1.AppComponent, Navigation_component_1.NavigationComponent, BasicUsage_component_1.BasicUsageComponent, Sorting_component_1.SortingComponent, CodeView_component_1.CodeExampleComponent, BasicSample_component_1.BasicSampleComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [app_routes_1.appRoutingProviders]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map