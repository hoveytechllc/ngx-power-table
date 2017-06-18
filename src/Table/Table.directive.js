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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ConfigurationProvider_class_1 = require("./../Configuration/ConfigurationProvider.class");
var TableDirective = (function () {
    function TableDirective(changeDetectorRef, injector, configurationProvider) {
        var _this = this;
        this.changeDetectorRef = changeDetectorRef;
        this.injector = injector;
        this.configurationProvider = configurationProvider;
        this.tableInitialized = false;
        this.subscribedToTableState = false;
        this.displayArrayChange = new core_1.EventEmitter();
        /*
            Event for custom data-pipe implemented by component.
            Only used if observer is present. Otherwise a IDataPipeService
            is resolved from the injector.
        */
        this.dataPipe = new core_1.EventEmitter();
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
        if (this.tableState) {
            this.tableStateChange.emit(this.tableState);
        }
        this.getTableState();
        if (!this.tableInitialized) {
            this.pipe();
            this.tableInitialized = true;
        }
    };
    TableDirective.prototype.ngOnChanges = function (changes) {
        var callPipe = false;
        if (changes['tableState'] && this.tableState) {
            this.subscribeToTableStateChanges();
        }
        if (changes['dataPipe']) {
            callPipe = true;
        }
        if (changes['originalArray']) {
            callPipe = true;
        }
        if (changes['configurationOverride']) {
            this.dataPipeService = null;
            this.currentConfiguration = null;
            callPipe = true;
        }
        if (this.tableInitialized && callPipe) {
            this.pipe();
        }
    };
    TableDirective.prototype.getTableState = function () {
        if (!this.tableState) {
            var config = this.getConfiguration();
            this.tableState = new config.tableStateType();
            this.subscribeToTableStateChanges();
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    };
    TableDirective.prototype.subscribeToTableStateChanges = function () {
        var _this = this;
        if (this.tableStateSubscription) {
            this.tableStateSubscription.unsubscribe();
        }
        this.tableStateChange.emit(this.tableState);
        this.tableStateSubscription = this.tableState.changed.subscribe(function () {
            _this.pipe();
        });
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
        var _this = this;
        var state = this.getTableState();
        var config = this.getConfiguration();
        if (this.dataPipe.observers.length > 0) {
            this.dataPipe.emit([state, config]);
            return;
        }
        if (!this.dataPipeService)
            this.dataPipeService = this.injector.get(config.pipeServiceType);
        this.dataPipeService.pipe(this.originalArray, state, config)
            .then(function (array) {
            _this.displayArray = array;
            _this.displayArrayChange.emit(_this.displayArray);
            _this.changeDetectorRef.detectChanges();
        });
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
    core_1.Output('ptDataPipe'),
    __metadata("design:type", core_1.EventEmitter)
], TableDirective.prototype, "dataPipe", void 0);
__decorate([
    core_1.Input('ptTableState'),
    __metadata("design:type", Object)
], TableDirective.prototype, "tableState", void 0);
__decorate([
    core_1.Output('ptTableStateChange'),
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