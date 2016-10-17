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
// angular stuff
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
// other dependencies
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
/*
  ======== IMPORT PowerTableModule
*/
var ng2_power_table_1 = require("ng2-power-table");
// components for this app
var app_component_1 = require("./app.component");
// routing
var app_routes_1 = require("./app.routes");
core_1.enableProdMode();
var Ng2PowerTableDocumentationModule = (function () {
    function Ng2PowerTableDocumentationModule() {
    }
    return Ng2PowerTableDocumentationModule;
}());
Ng2PowerTableDocumentationModule = __decorate([
    core_1.NgModule({
        /*
          ======== INCLUDE PowerTableModule in imports of your module
        */
        imports: [platform_browser_1.BrowserModule, ng2_power_table_1.PowerTableModule, app_routes_1.routing, ng2_bootstrap_1.Ng2BootstrapModule, http_1.HttpModule],
        declarations: [app_component_1.Ng2PowerTableComponents],
        bootstrap: [app_component_1.AppComponent],
        providers: [app_routes_1.appRoutingProviders]
    }),
    __metadata("design:paramtypes", [])
], Ng2PowerTableDocumentationModule);
exports.Ng2PowerTableDocumentationModule = Ng2PowerTableDocumentationModule;
//# sourceMappingURL=app.module.js.map