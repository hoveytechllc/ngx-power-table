System.registerDynamic("ng2-power-table/src/Sort/Sort.directive", ["@angular/core", "ng2-power-table/src/Table/Table.directive", "ng2-power-table/src/Sort/SortOrder.enum"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var Table_directive_1 = $__require("ng2-power-table/src/Table/Table.directive");
    var SortOrder_enum_1 = $__require("ng2-power-table/src/Sort/SortOrder.enum");
    var SortDirective = function () {
        /**
         *
         */
        function SortDirective(table, element, renderer) {
            var _this = this;
            this.table = table;
            this.element = element;
            this.renderer = renderer;
            this.order = SortOrder_enum_1.SortOrder.NotSet;
            this.suppressSortChangedHandler = false;
            this.removeClickListener = this.renderer.listen(this.element.nativeElement, 'click', function (ev) {
                _this.onClicked(ev);
            });
            this.removeTableStateListener = this.table.tableStateChange.subscribe(function (tableState) {
                _this.onTableStateChanged(tableState);
            });
        }
        SortDirective.prototype.ngOnDestroy = function () {
            if (this.removeClickListener) this.removeClickListener();
            if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe) this.removeTableStateListener.unsubscribe();
            this.unsubscribeToSortListener();
        };
        SortDirective.prototype.unsubscribeToSortListener = function () {
            if (this.removeSortListener && this.removeSortListener.unsubscribe) this.removeSortListener.unsubscribe();
        };
        SortDirective.prototype.resolveTableState = function () {
            if (this.suppressSortChangedHandler) {
                // this directive is causing the callback   
                return;
            }
            var sort = this.getSortState();
            if (!sort) return;
            if ((!sort.predicate || sort.predicate !== this.predicate) && this.order !== SortOrder_enum_1.SortOrder.NotSet) {
                // tableState has no predicate set, everything should be clear
                this.order = SortOrder_enum_1.SortOrder.NotSet;
                this.updateSortDisplay();
                // fix css classes
                return;
            }
            if (!sort.predicate) return;
            if (sort.predicate === this.predicate && sort.order !== this.order) {
                // since suppressSortChangedHandler was not set, we can safely assume
                // we need to trigger sort.
                this.order = sort.order;
                this.updateSortDisplay();
                this.table.pipe();
                // fix css classes
                return;
            }
        };
        SortDirective.prototype.onTableStateChanged = function (tableState) {
            var _this = this;
            this.unsubscribeToSortListener();
            this.resolveTableState();
            var sort = this.getSortState();
            if (sort) {
                this.removeSortListener = sort.changed.subscribe(function () {
                    _this.resolveTableState();
                });
            }
        };
        SortDirective.prototype.updateSortDisplay = function () {
            var config = this.table.getConfiguration();
            var addAscending = this.order === SortOrder_enum_1.SortOrder.Ascending;
            var addDescending = this.order === SortOrder_enum_1.SortOrder.Descending;
            if (!addDescending && addAscending) {
                this.setElementClass(config.descendingCssClass, addDescending);
                this.setElementClass(config.ascendingCssClass, addAscending);
            } else {
                this.setElementClass(config.ascendingCssClass, addAscending);
                this.setElementClass(config.descendingCssClass, addDescending);
            }
        };
        SortDirective.prototype.setElementClass = function (classValue, add) {
            var classes = classValue.split(' ');
            for (var i = 0; i < classes.length; i++) {
                var value = classes[i];
                this.renderer.setElementClass(this.element.nativeElement, value, add);
            }
        };
        SortDirective.prototype.getSortState = function () {
            var tableState = this.table.tableState;
            if (!tableState || !tableState.sort) {
                return null;
            }
            return tableState.sort;
        };
        SortDirective.prototype.onClicked = function (ev) {
            if (this.order === SortOrder_enum_1.SortOrder.Descending) {
                // manual reset
                this.order = SortOrder_enum_1.SortOrder.NotSet;
            } else {
                this.order++;
            }
            this.updateSortDisplay();
            this.suppressSortChangedHandler = true;
            var sort = this.getSortState();
            sort.predicate = this.predicate;
            sort.order = this.order;
            this.table.pipe();
            this.suppressSortChangedHandler = false;
        };
        return SortDirective;
    }();
    __decorate([core_1.Input("ptSort"), __metadata("design:type", String)], SortDirective.prototype, "predicate", void 0);
    SortDirective = __decorate([core_1.Directive({
        selector: "[ptSort]"
    }), __metadata("design:paramtypes", [Table_directive_1.TableDirective, core_1.ElementRef, core_1.Renderer])], SortDirective);
    exports.SortDirective = SortDirective;
    
});
System.registerDynamic("ng2-power-table/src/Table/Table.directive", ["@angular/core", "ng2-power-table/src/Configuration/ConfigurationProvider.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var ConfigurationProvider_class_1 = $__require("ng2-power-table/src/Configuration/ConfigurationProvider.class");
    var TableDirective = function () {
        function TableDirective(changeDetectorRef, injector, configurationProvider) {
            var _this = this;
            this.changeDetectorRef = changeDetectorRef;
            this.injector = injector;
            this.configurationProvider = configurationProvider;
            this.tableInitialized = false;
            this.displayArrayChange = new core_1.EventEmitter();
            /*
                Event for custom data-pipe implemented by component.
                Only used if observer is present. Otherwise a IDataPipeService
                is resolved from the injector.
            */
            this.dataPipe = new core_1.EventEmitter();
            this.tableStateChange = new core_1.EventEmitter();
            console.log('Table: constructor()');
            this.removeConfigListener = this.configurationProvider.globalConfigurationChanged.subscribe(function (config) {
                _this.currentConfiguration = null;
                _this.pipe();
            });
        }
        TableDirective.prototype.ngOnDestroy = function () {
            if (this.removeConfigListener && this.removeConfigListener.unsubscribe) this.removeConfigListener.unsubscribe();
        };
        TableDirective.prototype.ngOnInit = function () {
            console.log('Table: ngOnInit()');
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
            console.log('Table: Changes: ' + changes);
            var callPipe = false;
            if (changes['tableState'] && this.tableState) {
                this.tableStateChange.emit(this.tableState);
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
                this.tableStateChange.emit(this.tableState);
                this.changeDetectorRef.detectChanges();
            }
            return this.tableState;
        };
        TableDirective.prototype.getConfiguration = function () {
            if (this.currentConfiguration) return this.currentConfiguration;
            if (this.configurationOverride) {
                this.currentConfiguration = this.configurationOverride;
            } else {
                this.currentConfiguration = this.configurationProvider.globalConfiguration;
            }
            return this.currentConfiguration;
        };
        // public updateDisplayArray(results: Array<any>, totalItemCount: number): void {
        //     this.tableState.pagination.totalItemCount = totalItemCount;
        //     this.displayArray = results;
        //     this.displayArrayChange.emit(this.displayArray);
        // }
        TableDirective.prototype.pipe = function () {
            var _this = this;
            var state = this.getTableState();
            var config = this.getConfiguration();
            console.log('Table: pipe()');
            if (this.dataPipe.observers.length > 0) {
                this.dataPipe.emit([state, config]);
                return;
            }
            if (!this.dataPipeService) this.dataPipeService = this.injector.get(config.pipeServiceType);
            this.dataPipeService.pipe(this.originalArray, state, config).then(function (array) {
                _this.displayArray = array;
                _this.displayArrayChange.emit(_this.displayArray);
                _this.changeDetectorRef.detectChanges();
            });
        };
        ;
        return TableDirective;
    }();
    __decorate([core_1.Input('ptTable'), __metadata("design:type", Array)], TableDirective.prototype, "originalArray", void 0);
    __decorate([core_1.Input('ptDisplayArray'), __metadata("design:type", Array)], TableDirective.prototype, "displayArray", void 0);
    __decorate([core_1.Output('ptDisplayArrayChange'), __metadata("design:type", core_1.EventEmitter)], TableDirective.prototype, "displayArrayChange", void 0);
    __decorate([core_1.Output('ptDataPipe'), __metadata("design:type", core_1.EventEmitter)], TableDirective.prototype, "dataPipe", void 0);
    __decorate([core_1.Input('ptTableState'), __metadata("design:type", Object)], TableDirective.prototype, "tableState", void 0);
    __decorate([core_1.Output('ptTableStateChange'), __metadata("design:type", core_1.EventEmitter)], TableDirective.prototype, "tableStateChange", void 0);
    __decorate([core_1.Input('ptConfiguration'), __metadata("design:type", Object)], TableDirective.prototype, "configurationOverride", void 0);
    TableDirective = __decorate([core_1.Directive({
        selector: "[ptTable]"
    }), __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.Injector, ConfigurationProvider_class_1.ConfigurationProvider])], TableDirective);
    exports.TableDirective = TableDirective;
    
});
System.registerDynamic("ng2-power-table/src/Pagination/Pagination.component", ["@angular/core", "ng2-power-table/src/Table/Table.directive"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var Table_directive_1 = $__require("ng2-power-table/src/Table/Table.directive");
    var paginationTemplate = "\n<div class=\"btn-group\" role=\"group\">\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage === 1\"\n    [ngClass]=\"{ 'disabled' : currentPage === 1}\"\n     (click)=\"goToFirstPage()\"><i class=\"fa fa-angle-double-left\"></i></button>\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==1\"\n    [ngClass]=\"{ 'disabled' : currentPage === 1}\" \n    (click)=\"goToPreviousPage()\"><i class=\"fa fa-angle-left\"></i></button>\n\n  <button *ngFor=\"let page of pages\" type=\"button\" class=\"btn btn-default\" \n    [ngClass]=\"{ 'active' : page === currentPage}\"\n    (click)=\"selectPage(page)\">\n    {{page}}\n  </button>\n\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==numPages\" \n    [ngClass]=\"{ 'disabled' : currentPage === numPages}\"\n    (click)=\"goToNextPage()\"><i class=\"fa fa-angle-right\"></i></button>\n  <button type=\"button\" class=\"btn btn-default\" [disabled]=\"currentPage==numPages\" \n    [ngClass]=\"{ 'disabled' : currentPage === numPages}\"\n    (click)=\"goToLastPage()\"><i class=\"fa fa-angle-double-right\"></i></button>\n</div>";
    var PaginationComponent = function () {
        /**
         *
         */
        function PaginationComponent(table) {
            var _this = this;
            this.table = table;
            this.displayedPagesCount = 5;
            this.onTableStateChanged(this.table.tableState);
            this.removeTableStateListener = this.table.tableStateChange.subscribe(function (tableState) {
                _this.onTableStateChanged(tableState);
            });
        }
        PaginationComponent.prototype.ngOnInit = function () {
            this.rebuildPagination();
        };
        PaginationComponent.prototype.ngOnDestroy = function () {
            if (this.removeTableStateListener && this.removeTableStateListener.unsubscribe) this.removeTableStateListener.unsubscribe();
            this.unsubscribeToPagination();
        };
        PaginationComponent.prototype.unsubscribeToPagination = function () {
            if (this.removePaginationListener && this.removePaginationListener.unsubscribe) this.removePaginationListener.unsubscribe();
        };
        PaginationComponent.prototype.rebuildPagination = function () {
            var start = 1;
            var end;
            var i;
            var pagination = this.getPaginationState();
            if (!pagination) return;
            this.numPages = Math.max(1, Math.ceil(pagination.totalItemCount / pagination.pageSize));
            this.currentPage = Math.floor(pagination.start / pagination.pageSize) + 1;
            start = Math.max(start, this.currentPage - Math.abs(Math.floor(this.displayedPagesCount / 2)));
            end = start + this.displayedPagesCount;
            if (end > this.numPages) {
                end = this.numPages + 1;
                start = Math.max(1, end - this.displayedPagesCount);
            }
            this.pages = [];
            for (i = start; i < end; i++) {
                this.pages.push(i);
            }
        };
        PaginationComponent.prototype.goToFirstPage = function () {
            this.selectPage(1);
        };
        PaginationComponent.prototype.goToPreviousPage = function () {
            this.selectPage(this.currentPage - 1);
        };
        PaginationComponent.prototype.goToNextPage = function () {
            this.selectPage(this.currentPage + 1);
        };
        PaginationComponent.prototype.goToLastPage = function () {
            this.selectPage(this.numPages);
        };
        PaginationComponent.prototype.selectPage = function (page) {
            if (page > 0 && page <= this.numPages) {
                var pageSize = this.getPaginationState().pageSize;
                this.triggerPaging((page - 1) * pageSize);
            }
        };
        PaginationComponent.prototype.triggerPaging = function (start) {
            this.getPaginationState().start = start;
        };
        PaginationComponent.prototype.getPaginationState = function () {
            var tableState = this.table.tableState;
            if (!tableState || !tableState.pagination) {
                return null;
            }
            return tableState.pagination;
        };
        PaginationComponent.prototype.onTableStateChanged = function (tableState) {
            var _this = this;
            this.unsubscribeToPagination();
            this.rebuildPagination();
            var pagination = this.getPaginationState();
            if (pagination && pagination.changed) {
                this.removePaginationListener = pagination.changed.subscribe(function () {
                    _this.rebuildPagination();
                });
            }
        };
        return PaginationComponent;
    }();
    PaginationComponent = __decorate([core_1.Component({
        selector: 'pt-pagination',
        template: paginationTemplate
    }), __metadata("design:paramtypes", [Table_directive_1.TableDirective])], PaginationComponent);
    exports.PaginationComponent = PaginationComponent;
    
});
System.registerDynamic("ng2-power-table/src/Configuration/ConfigurationProvider.class", ["@angular/core", "ng2-power-table/src/Configuration/DefaultConfiguration.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var DefaultConfiguration_class_1 = $__require("ng2-power-table/src/Configuration/DefaultConfiguration.class");
    var ConfigurationProvider = function () {
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
                if (this.unsubscribeObject && this.unsubscribeObject.unsubscribe) this.unsubscribeObject.unsubscribe();
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
    }();
    ConfigurationProvider = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [])], ConfigurationProvider);
    exports.ConfigurationProvider = ConfigurationProvider;
    
});
System.registerDynamic("ng2-power-table/src/Pipe/DefaultDataPipeService.class", ["@angular/core", "ng2-power-table/src/Sort/SortOrder.enum", "ng2-power-table/src/Pagination/PaginationState.class", "ng2-power-table/src/Sort/SortState.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var SortOrder_enum_1 = $__require("ng2-power-table/src/Sort/SortOrder.enum");
    var PaginationState_class_1 = $__require("ng2-power-table/src/Pagination/PaginationState.class");
    var SortState_class_1 = $__require("ng2-power-table/src/Sort/SortState.class");
    var DefaultDataPipeService = function () {
        function DefaultDataPipeService() {}
        DefaultDataPipeService.prototype.pipe = function (data, tableState, configuration) {
            if (!data || !Array.isArray(data)) {
                return Promise.resolve(undefined);
            }
            var resultArray = [].concat(data);
            resultArray = this.filter(resultArray, tableState, configuration);
            resultArray = this.sort(resultArray, tableState, configuration);
            resultArray = this.page(resultArray, tableState, configuration);
            return Promise.resolve(resultArray);
        };
        DefaultDataPipeService.prototype.sort = function (data, tableState, configuration) {
            var tableStateAny = tableState;
            if (!tableStateAny.sort || !(tableStateAny.sort instanceof SortState_class_1.SortState)) return data;
            var sort = tableStateAny.sort;
            if (sort.order === SortOrder_enum_1.SortOrder.NotSet) return data;
            return data.sort(function (a, b) {
                // TODO: Implement configuration setting to help with aggresive minification by consumer
                var aValue = a[sort.predicate];
                var bValue = b[sort.predicate];
                // null or undefined values should be first
                if (!aValue) return 1;
                var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                // Descending order only if items not equal, and descending selected.
                if (sort.order === SortOrder_enum_1.SortOrder.Descending && filter !== 0) {
                    filter = filter * -1;
                }
                ;
                return filter;
            });
        };
        DefaultDataPipeService.prototype.filter = function (data, tableState, configuration) {
            // TODO: Implement filtering
            return data;
        };
        DefaultDataPipeService.prototype.page = function (data, tableState, configuration) {
            var tableStateAny = tableState;
            if (!tableStateAny.pagination || !(tableStateAny.pagination instanceof PaginationState_class_1.PaginationState)) return data;
            var pagination = tableStateAny.pagination;
            pagination.totalItemCount = data.length;
            return data.slice(pagination.start, pagination.start + pagination.pageSize);
        };
        return DefaultDataPipeService;
    }();
    DefaultDataPipeService = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [])], DefaultDataPipeService);
    exports.DefaultDataPipeService = DefaultDataPipeService;
    
});
System.registerDynamic("ng2-power-table/src/Pagination/PaginationState.class", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var PaginationState = function () {
        function PaginationState() {
            this.changed = new core_1.EventEmitter();
            this.start = 0;
            this.pageSize = 10;
            this.totalItemCount = 0;
        }
        Object.defineProperty(PaginationState.prototype, "start", {
            get: function () {
                return this._start;
            },
            set: function (value) {
                var original = this._start;
                this._start = value;
                this.boundsCheck();
                if (original !== this._start) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaginationState.prototype, "pageSize", {
            get: function () {
                return this._pageSize;
            },
            set: function (value) {
                var original = this._pageSize;
                this._pageSize = value;
                if (original !== this._pageSize) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaginationState.prototype, "totalItemCount", {
            get: function () {
                return this._totalItemCount;
            },
            set: function (value) {
                var original = this._totalItemCount;
                this._totalItemCount = value;
                this.boundsCheck();
                if (original !== this._totalItemCount) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        PaginationState.prototype.boundsCheck = function () {
            if (this._start >= this._totalItemCount) {
                var numPages = Math.max(1, Math.ceil(this._totalItemCount / this._pageSize));
                this._start = (numPages - 1) * this._pageSize;
            }
        };
        return PaginationState;
    }();
    exports.PaginationState = PaginationState;
    
});
System.registerDynamic("ng2-power-table/src/Sort/SortOrder.enum", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    (function (SortOrder) {
        SortOrder[SortOrder["NotSet"] = 0] = "NotSet";
        SortOrder[SortOrder["Ascending"] = 1] = "Ascending";
        SortOrder[SortOrder["Descending"] = 2] = "Descending";
    })(exports.SortOrder || (exports.SortOrder = {}));
    var SortOrder = exports.SortOrder;
    
});
System.registerDynamic("ng2-power-table/src/Sort/SortState.class", ["@angular/core", "ng2-power-table/src/Sort/SortOrder.enum"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var SortOrder_enum_1 = $__require("ng2-power-table/src/Sort/SortOrder.enum");
    var SortState = function () {
        function SortState() {
            this.changed = new core_1.EventEmitter();
            this._order = SortOrder_enum_1.SortOrder.NotSet;
            this._predicate = null;
        }
        Object.defineProperty(SortState.prototype, "order", {
            get: function () {
                return this._order;
            },
            set: function (order) {
                var original = this._order;
                this._order = order;
                if (original !== this._order) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SortState.prototype, "predicate", {
            get: function () {
                return this._predicate;
            },
            set: function (predicate) {
                var original = this._predicate;
                this._predicate = predicate;
                if (original !== this._predicate) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        return SortState;
    }();
    exports.SortState = SortState;
    
});
System.registerDynamic("ng2-power-table/src/TableState/DefaultTableState.class", ["@angular/core", "ng2-power-table/src/Pagination/PaginationState.class", "ng2-power-table/src/Sort/SortState.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var PaginationState_class_1 = $__require("ng2-power-table/src/Pagination/PaginationState.class");
    var SortState_class_1 = $__require("ng2-power-table/src/Sort/SortState.class");
    var DefaultTableState = function () {
        function DefaultTableState() {
            this.changed = new core_1.EventEmitter();
            this.sort = new SortState_class_1.SortState();
            this.pagination = new PaginationState_class_1.PaginationState();
        }
        DefaultTableState.prototype.updateWithoutEmitting = function (action) {
            DefaultTableState.PreventEmitting = true;
            action();
            DefaultTableState.PreventEmitting = false;
        };
        DefaultTableState.prototype.tryEmit = function () {
            if (DefaultTableState.PreventEmitting) return;
            this.changed.emit();
        };
        Object.defineProperty(DefaultTableState.prototype, "sort", {
            get: function () {
                return this._sort;
            },
            set: function (order) {
                var _this = this;
                var original = this._sort;
                this._sort = order;
                if (original !== this._sort) {
                    this._sort.changed.subscribe(function () {
                        _this.tryEmit();
                    });
                    this.tryEmit();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultTableState.prototype, "pagination", {
            get: function () {
                return this._pagination;
            },
            set: function (order) {
                var _this = this;
                var original = this._pagination;
                this._pagination = order;
                if (original !== this._pagination) {
                    this._pagination.changed.subscribe(function () {
                        _this.tryEmit();
                    });
                    this.tryEmit();
                }
            },
            enumerable: true,
            configurable: true
        });
        return DefaultTableState;
    }();
    exports.DefaultTableState = DefaultTableState;
    
});
System.registerDynamic("ng2-power-table/src/Configuration/DefaultConfiguration.class", ["@angular/core", "ng2-power-table/src/Pipe/DefaultDataPipeService.class", "ng2-power-table/src/TableState/DefaultTableState.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var DefaultDataPipeService_class_1 = $__require("ng2-power-table/src/Pipe/DefaultDataPipeService.class");
    var DefaultTableState_class_1 = $__require("ng2-power-table/src/TableState/DefaultTableState.class");
    var DefaultConfiguration = function () {
        function DefaultConfiguration() {
            this.changed = new core_1.EventEmitter();
        }
        Object.defineProperty(DefaultConfiguration.prototype, "ascendingCssClass", {
            get: function () {
                return this._ascendingCssClass;
            },
            set: function (cssClass) {
                var original = this._ascendingCssClass;
                this._ascendingCssClass = cssClass;
                if (original !== this._ascendingCssClass) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultConfiguration.prototype, "descendingCssClass", {
            get: function () {
                return this._descendingCssClass;
            },
            set: function (cssClass) {
                var original = this._descendingCssClass;
                this._descendingCssClass = cssClass;
                if (original !== this._descendingCssClass) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultConfiguration.prototype, "pipeServiceType", {
            get: function () {
                return this._pipeServiceType;
            },
            set: function (t) {
                var original = this._pipeServiceType;
                this._pipeServiceType = t;
                if (original !== this._pipeServiceType) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DefaultConfiguration.prototype, "tableStateType", {
            get: function () {
                return this._tableStateType;
            },
            set: function (t) {
                var original = this._tableStateType;
                this._tableStateType = t;
                if (original !== this._tableStateType) this.changed.emit();
            },
            enumerable: true,
            configurable: true
        });
        DefaultConfiguration.create = function () {
            var config = new DefaultConfiguration();
            config.ascendingCssClass = 'pt-sort-asc';
            config.descendingCssClass = 'pt-sort-desc';
            config.pipeServiceType = DefaultDataPipeService_class_1.DefaultDataPipeService;
            config.tableStateType = DefaultTableState_class_1.DefaultTableState;
            return config;
        };
        DefaultConfiguration.prototype.copy = function () {
            var config = new DefaultConfiguration();
            config.ascendingCssClass = this.ascendingCssClass;
            config.descendingCssClass = this.descendingCssClass;
            config.pipeServiceType = this.pipeServiceType;
            config.tableStateType = this.tableStateType;
            return config;
        };
        return DefaultConfiguration;
    }();
    exports.DefaultConfiguration = DefaultConfiguration;
    
});
System.registerDynamic("ng2-power-table/ng2-power-table", ["@angular/core", "@angular/common", "ng2-power-table/src/Table/Table.directive", "ng2-power-table/src/Sort/Sort.directive", "ng2-power-table/src/Pipe/DefaultDataPipeService.class", "ng2-power-table/src/Pagination/Pagination.component", "ng2-power-table/src/Configuration/ConfigurationProvider.class", "ng2-power-table/src/Sort/SortOrder.enum", "ng2-power-table/src/Sort/SortState.class", "ng2-power-table/src/TableState/DefaultTableState.class", "ng2-power-table/src/Pagination/PaginationState.class", "ng2-power-table/src/Configuration/DefaultConfiguration.class"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
            d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = this && this.__metadata || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1 = $__require("@angular/core");
    var common_1 = $__require("@angular/common");
    // import components / directives for the module
    var Table_directive_1 = $__require("ng2-power-table/src/Table/Table.directive");
    var Sort_directive_1 = $__require("ng2-power-table/src/Sort/Sort.directive");
    var DefaultDataPipeService_class_1 = $__require("ng2-power-table/src/Pipe/DefaultDataPipeService.class");
    var Pagination_component_1 = $__require("ng2-power-table/src/Pagination/Pagination.component");
    var ConfigurationProvider_class_1 = $__require("ng2-power-table/src/Configuration/ConfigurationProvider.class");
    // export for any consumers of module
    var Table_directive_2 = $__require("ng2-power-table/src/Table/Table.directive");
    exports.TableDirective = Table_directive_2.TableDirective;
    var SortOrder_enum_1 = $__require("ng2-power-table/src/Sort/SortOrder.enum");
    exports.SortOrder = SortOrder_enum_1.SortOrder;
    var Sort_directive_2 = $__require("ng2-power-table/src/Sort/Sort.directive");
    exports.SortDirective = Sort_directive_2.SortDirective;
    var SortState_class_1 = $__require("ng2-power-table/src/Sort/SortState.class");
    exports.SortState = SortState_class_1.SortState;
    var DefaultTableState_class_1 = $__require("ng2-power-table/src/TableState/DefaultTableState.class");
    exports.DefaultTableState = DefaultTableState_class_1.DefaultTableState;
    var DefaultDataPipeService_class_2 = $__require("ng2-power-table/src/Pipe/DefaultDataPipeService.class");
    exports.DefaultDataPipeService = DefaultDataPipeService_class_2.DefaultDataPipeService;
    var Pagination_component_2 = $__require("ng2-power-table/src/Pagination/Pagination.component");
    exports.PaginationComponent = Pagination_component_2.PaginationComponent;
    var PaginationState_class_1 = $__require("ng2-power-table/src/Pagination/PaginationState.class");
    exports.PaginationState = PaginationState_class_1.PaginationState;
    var ConfigurationProvider_class_2 = $__require("ng2-power-table/src/Configuration/ConfigurationProvider.class");
    exports.ConfigurationProvider = ConfigurationProvider_class_2.ConfigurationProvider;
    var DefaultConfiguration_class_1 = $__require("ng2-power-table/src/Configuration/DefaultConfiguration.class");
    exports.DefaultConfiguration = DefaultConfiguration_class_1.DefaultConfiguration;
    var declarations = [Table_directive_1.TableDirective, Sort_directive_1.SortDirective, Pagination_component_1.PaginationComponent];
    var PowerTableModule = function () {
        function PowerTableModule() {}
        return PowerTableModule;
    }();
    PowerTableModule = __decorate([core_1.NgModule({
        exports: declarations,
        declarations: [declarations],
        imports: [common_1.CommonModule],
        providers: [DefaultDataPipeService_class_1.DefaultDataPipeService, ConfigurationProvider_class_1.ConfigurationProvider]
    }), __metadata("design:paramtypes", [])], PowerTableModule);
    exports.PowerTableModule = PowerTableModule;
    
});
//# sourceMappingURL=ng2-power-table.js.map