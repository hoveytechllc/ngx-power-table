System.registerDynamic("ng2-power-table/src/Sort/Sort.directive", ["@angular/core", "ng2-power-table/src/Table/Table.directive", "ng2-power-table/src/Sort/SortOrder.enum"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
            if ((!this.table.tableState.sort.predicate || this.table.tableState.sort.predicate !== this.predicate) && this.order !== SortOrder_enum_1.SortOrder.NotSet) {
                // tableState has no predicate set, everything should be clear
                this.order = SortOrder_enum_1.SortOrder.NotSet;
                this.updateSortDisplay();
                // fix css classes
                return;
            }
            if (!this.table.tableState.sort.predicate) return;
            if (this.table.tableState.sort.predicate === this.predicate && this.table.tableState.sort.order !== this.order) {
                // since suppressSortChangedHandler was not set, we can safely assume
                // we need to trigger sort.
                this.order = this.table.tableState.sort.order;
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
            this.removeSortListener = tableState.sort.changed.subscribe(function () {
                _this.resolveTableState();
            });
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
        SortDirective.prototype.onClicked = function (ev) {
            if (this.order === SortOrder_enum_1.SortOrder.Descending) {
                // manual reset
                this.order = SortOrder_enum_1.SortOrder.NotSet;
            } else {
                this.order++;
            }
            this.updateSortDisplay();
            this.suppressSortChangedHandler = true;
            var state = this.table.tableState;
            state.sort.predicate = this.predicate;
            state.sort.order = this.order;
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
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Table/Table.directive", ["@angular/core", "ng2-power-table/src/TableState/DefaultTableState.class", "ng2-power-table/src/Configuration/ConfigurationProvider.class"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
    var DefaultTableState_class_1 = $__require("ng2-power-table/src/TableState/DefaultTableState.class");
    var ConfigurationProvider_class_1 = $__require("ng2-power-table/src/Configuration/ConfigurationProvider.class");
    var TableDirective = function () {
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
            if (this.removeConfigListener && this.removeConfigListener.unsubscribe) this.removeConfigListener.unsubscribe();
        };
        TableDirective.prototype.ngOnInit = function () {
            if (this.tableState) {
                this.tableStateChange.emit(this.tableState);
            }
            this.getTableState();
        };
        TableDirective.prototype.ngOnChanges = function (changes) {
            if (changes['tableState'] && this.tableState) {
                this.tableStateChange.emit(this.tableState);
            }
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
            if (this.currentConfiguration) return this.currentConfiguration;
            if (this.configurationOverride) {
                this.currentConfiguration = this.configurationOverride;
            } else {
                this.currentConfiguration = this.configurationProvider.globalConfiguration;
            }
            return this.currentConfiguration;
        };
        TableDirective.prototype.pipe = function () {
            var _this = this;
            var state = this.getTableState();
            var config = this.getConfiguration();
            if (!this.dataPipeService) {
                this.dataPipeService = this.injector.get(config.pipeServiceType);
            }
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
    __decorate([core_1.Input(), __metadata("design:type", Object)], TableDirective.prototype, "tableState", void 0);
    __decorate([core_1.Output(), __metadata("design:type", core_1.EventEmitter)], TableDirective.prototype, "tableStateChange", void 0);
    __decorate([core_1.Input('ptConfiguration'), __metadata("design:type", Object)], TableDirective.prototype, "configurationOverride", void 0);
    TableDirective = __decorate([core_1.Directive({
        selector: "[ptTable]"
    }), __metadata("design:paramtypes", [core_1.ChangeDetectorRef, core_1.Injector, ConfigurationProvider_class_1.ConfigurationProvider])], TableDirective);
    exports.TableDirective = TableDirective;
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Pagination/Pagination.component", ["@angular/core", "ng2-power-table/src/Table/Table.directive"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
            if (!this.table.tableState || !this.table.tableState.pagination) return;
            var pagination = this.table.tableState.pagination;
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
                var pageSize = this.table.tableState.pagination.pageSize;
                this.triggerPaging((page - 1) * pageSize);
            }
        };
        PaginationComponent.prototype.triggerPaging = function (start) {
            this.table.tableState.pagination.start = start;
            this.table.pipe();
        };
        PaginationComponent.prototype.onTableStateChanged = function (tableState) {
            var _this = this;
            this.unsubscribeToPagination();
            this.rebuildPagination();
            if (tableState && tableState.pagination && tableState.pagination.changed) {
                this.removePaginationListener = tableState.pagination.changed.subscribe(function () {
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
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Configuration/ConfigurationProvider.class", ["@angular/core", "ng2-power-table/src/Configuration/DefaultConfiguration.class"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/TableState/DefaultTableState.class", ["@angular/core", "ng2-power-table/src/Sort/SortOrder.enum"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var SortOrder_enum_1 = $__require("ng2-power-table/src/Sort/SortOrder.enum");
    var DefaultTableStateSearch = function () {
        function DefaultTableStateSearch() {}
        return DefaultTableStateSearch;
    }();
    exports.DefaultTableStateSearch = DefaultTableStateSearch;
    var DefaultTableStatePagination = function () {
        function DefaultTableStatePagination() {
            this.changed = new core_1.EventEmitter();
            this.start = 0;
            this.pageSize = 10;
            this.totalItemCount = 0;
        }
        Object.defineProperty(DefaultTableStatePagination.prototype, "start", {
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
        Object.defineProperty(DefaultTableStatePagination.prototype, "pageSize", {
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
        Object.defineProperty(DefaultTableStatePagination.prototype, "totalItemCount", {
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
        DefaultTableStatePagination.prototype.boundsCheck = function () {
            if (this._start >= this._totalItemCount) {
                var numPages = Math.max(1, Math.ceil(this._totalItemCount / this._pageSize));
                this._start = (numPages - 1) * this._pageSize;
            }
        };
        return DefaultTableStatePagination;
    }();
    exports.DefaultTableStatePagination = DefaultTableStatePagination;
    var DefaultTableStateSort = function () {
        function DefaultTableStateSort() {
            this.changed = new core_1.EventEmitter();
            this._order = SortOrder_enum_1.SortOrder.NotSet;
            this._predicate = null;
        }
        Object.defineProperty(DefaultTableStateSort.prototype, "order", {
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
        Object.defineProperty(DefaultTableStateSort.prototype, "predicate", {
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
        return DefaultTableStateSort;
    }();
    exports.DefaultTableStateSort = DefaultTableStateSort;
    var DefaultTableState = function () {
        function DefaultTableState() {
            this.sort = new DefaultTableStateSort();
            this.pagination = new DefaultTableStatePagination();
            this.search = new DefaultTableStateSearch();
        }
        return DefaultTableState;
    }();
    exports.DefaultTableState = DefaultTableState;
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Sort/SortOrder.enum", [], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    (function (SortOrder) {
        SortOrder[SortOrder["NotSet"] = 0] = "NotSet";
        SortOrder[SortOrder["Ascending"] = 1] = "Ascending";
        SortOrder[SortOrder["Descending"] = 2] = "Descending";
    })(exports.SortOrder || (exports.SortOrder = {}));
    var SortOrder = exports.SortOrder;
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Pipe/DefaultDataPipeService.class", ["@angular/core", "ng2-power-table/src/Sort/SortOrder.enum"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
            if (!tableState.sort || !tableState.sort.predicate || tableState.sort.order === SortOrder_enum_1.SortOrder.NotSet) return data;
            return data.sort(function (a, b) {
                // TODO: Implement configuration setting to help with aggresive minification by consumer
                var aValue = a[tableState.sort.predicate];
                var bValue = b[tableState.sort.predicate];
                // null or undefined values should be first
                if (!aValue) return 1;
                var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                // Descending order only if items not equal, and descending selected.
                if (tableState.sort.order === SortOrder_enum_1.SortOrder.Descending && filter !== 0) {
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
            if (!tableState.pagination || !tableState.pagination.pageSize) return data;
            tableState.pagination.totalItemCount = data.length;
            return data.slice(tableState.pagination.start, tableState.pagination.start + tableState.pagination.pageSize);
        };
        return DefaultDataPipeService;
    }();
    DefaultDataPipeService = __decorate([core_1.Injectable(), __metadata("design:paramtypes", [])], DefaultDataPipeService);
    exports.DefaultDataPipeService = DefaultDataPipeService;
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/src/Configuration/DefaultConfiguration.class", ["@angular/core", "ng2-power-table/src/Pipe/DefaultDataPipeService.class"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var DefaultDataPipeService_class_1 = $__require("ng2-power-table/src/Pipe/DefaultDataPipeService.class");
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
        DefaultConfiguration.create = function () {
            var config = new DefaultConfiguration();
            config.ascendingCssClass = 'pt-sort-asc';
            config.descendingCssClass = 'pt-sort-desc';
            config.pipeServiceType = DefaultDataPipeService_class_1.DefaultDataPipeService;
            return config;
        };
        DefaultConfiguration.prototype.copy = function () {
            var config = new DefaultConfiguration();
            config.ascendingCssClass = this.ascendingCssClass;
            config.descendingCssClass = this.descendingCssClass;
            config.pipeServiceType = this.pipeServiceType;
            return config;
        };
        return DefaultConfiguration;
    }();
    exports.DefaultConfiguration = DefaultConfiguration;
    

    return module.exports;
});
System.registerDynamic("ng2-power-table/ng2-power-table", ["@angular/core", "@angular/common", "ng2-power-table/src/Table/Table.directive", "ng2-power-table/src/Sort/Sort.directive", "ng2-power-table/src/Pipe/DefaultDataPipeService.class", "ng2-power-table/src/Pagination/Pagination.component", "ng2-power-table/src/Configuration/ConfigurationProvider.class", "ng2-power-table/src/Sort/SortOrder.enum", "ng2-power-table/src/TableState/DefaultTableState.class", "ng2-power-table/src/Configuration/DefaultConfiguration.class"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
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
    var DefaultTableState_class_1 = $__require("ng2-power-table/src/TableState/DefaultTableState.class");
    exports.DefaultTableState = DefaultTableState_class_1.DefaultTableState;
    exports.DefaultTableStatePagination = DefaultTableState_class_1.DefaultTableStatePagination;
    exports.DefaultTableStateSearch = DefaultTableState_class_1.DefaultTableStateSearch;
    exports.DefaultTableStateSort = DefaultTableState_class_1.DefaultTableStateSort;
    var DefaultDataPipeService_class_2 = $__require("ng2-power-table/src/Pipe/DefaultDataPipeService.class");
    exports.DefaultDataPipeService = DefaultDataPipeService_class_2.DefaultDataPipeService;
    var Pagination_component_2 = $__require("ng2-power-table/src/Pagination/Pagination.component");
    exports.PaginationComponent = Pagination_component_2.PaginationComponent;
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
    

    return module.exports;
});
//# sourceMappingURL=ng2-power-table.js.map