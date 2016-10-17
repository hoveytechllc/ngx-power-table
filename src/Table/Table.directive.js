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
var core_1 = require("@angular/core");
var DefaultTableState_class_1 = require("./../TableState/DefaultTableState.class");
var ConfigurationProvider_class_1 = require("./../Configuration/ConfigurationProvider.class");
var TableDirective = (function () {
    function TableDirective(changeDetectorRef, injector, configurationProvider) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.injector = injector;
        this.configurationProvider = configurationProvider;
        this.displayArrayChange = new core_1.EventEmitter();
        this.tableStateChange = new core_1.EventEmitter();
        this.removeConfigListener = this.configurationProvider.globalConfigurationChanged.subscribe(function (config) {
            _this.currentConfiguration = null;
            _this.pipe();
        });
    }
    TableDirective.prototype.ngOnDestroy = function () {
        if (this.removeConfigListener && this.removeConfigListener.unsubscribe)
            this.removeConfigListener.unsubscribe();
    };
    TableDirective.prototype.ngOnInit = function () {
        this.getTableState();
    };
    TableDirective.prototype.ngOnChanges = function (changes) {
        if (changes['originalArray']) {
            this.pipe();
        }
        if (changes['configurationOverride']) {
            this.dataPipeService = null;
            this.currentConfiguration = null;
            this.pipe();
        }
    };
    TableDirective.prototype.getTableState = function () {
        if (!this.tableState) {
            this.tableState = new DefaultTableState_class_1.DefaultTableState();
            this.tableStateChange.emit(this.tableState);
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    };
    TableDirective.prototype.doSearch = function (predicate, reverse) {
        // update table state
        // 
        this.pipe();
    };
    TableDirective.prototype.getConfiguration = function () {
        if (this.currentConfiguration)
            return this.currentConfiguration;
        if (this.configurationOverride) {
            this.currentConfiguration = this.configurationOverride;
        }
        else {
            this.currentConfiguration = this.configurationProvider.globalConfiguration;
        }
        return this.currentConfiguration;
    };
    TableDirective.prototype.pipe = function () {
        var state = this.getTableState();
        var config = this.getConfiguration();
        if (!this.dataPipeService) {
            this.dataPipeService = this.injector.get(config.pipeServiceType);
        }
        this.displayArray = this.dataPipeService.pipe(this.originalArray, state, config);
        this.displayArrayChange.emit(this.displayArray);
        this.changeDetectorRef.detectChanges();
    };
    ;
    return TableDirective;
}());
__decorate([
    core_1.Input('ptTable'),
    __metadata("design:type", Array)
], TableDirective.prototype, "originalArray", void 0);
__decorate([
    core_1.Input('ptDisplayArray'),
    __metadata("design:type", Array)
], TableDirective.prototype, "displayArray", void 0);
__decorate([
    core_1.Output('ptDisplayArrayChange'),
    __metadata("design:type", core_1.EventEmitter)
], TableDirective.prototype, "displayArrayChange", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TableDirective.prototype, "tableState", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TableDirective.prototype, "tableStateChange", void 0);
__decorate([
    core_1.Input('ptConfiguration'),
    __metadata("design:type", Object)
], TableDirective.prototype, "configurationOverride", void 0);
TableDirective = __decorate([
    core_1.Directive({
        selector: "[ptTable]"
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_1.Injector,
        ConfigurationProvider_class_1.ConfigurationProvider])
], TableDirective);
exports.TableDirective = TableDirective;
//# sourceMappingURL=Table.directive.js.map