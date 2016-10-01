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
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: './app.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var Navigation_component_1 = require('./Navigation/Navigation.component');
var LoadingFrame_component_1 = require('./Navigation/LoadingFrame.component');
var BasicUsage_component_1 = require('./BasicUsage/BasicUsage.component');
var BasicSample_component_1 = require('./BasicUsage/BasicSample.component');
var Sorting_component_1 = require('./Sorting/Sorting.component');
var CodeView_component_1 = require('./BasicUsage/CodeViews/CodeView.component');
exports.Ng2PowerTableComponents = [
    CodeView_component_1.CodeExampleComponent,
    Navigation_component_1.NavigationComponent,
    BasicUsage_component_1.BasicUsageComponent,
    BasicSample_component_1.BasicSampleComponent,
    Sorting_component_1.SortingComponent,
    AppComponent,
    LoadingFrame_component_1.LoadingFrameComponent
];
//# sourceMappingURL=app.component.js.map