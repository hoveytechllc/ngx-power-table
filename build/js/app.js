System.registerDynamic("app/Navigation/Navigation.component.js", ["npm:@angular/core/bundles/core.umd.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var NavigationComponent = function () {
        function NavigationComponent() {}
        NavigationComponent.prototype.ngOnInit = function () {};
        return NavigationComponent;
    }();
    NavigationComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'pt-navigation',
        templateUrl: './Navigation.component.html'
    }), __metadata("design:paramtypes", [])], NavigationComponent);
    exports.NavigationComponent = NavigationComponent;
    

    return module.exports;
});
System.registerDynamic("app/Navigation/LoadingFrame.component.js", ["npm:@angular/core/bundles/core.umd.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var LoadingFrameComponent = function () {
        function LoadingFrameComponent(renderer, elementRef) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            var wrapper = document.getElementById('wrapper');
            if (!wrapper) return;
            var elements = wrapper.getElementsByClassName('loading-frame');
            if (elements && elements[0]) {
                var loadingFrame = elements[0];
                loadingFrame.classList.add('fadeOut');
                loadingFrame.classList.add('animated');
                setTimeout(function () {
                    wrapper.removeChild(loadingFrame);
                }, 1000);
            }
        }
        return LoadingFrameComponent;
    }();
    LoadingFrameComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'loading-frame-handler',
        templateUrl: './LoadingFrame.component.html'
    }), __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])], LoadingFrameComponent);
    exports.LoadingFrameComponent = LoadingFrameComponent;
    

    return module.exports;
});
System.registerDynamic("app/CodeViews/CodeView.component.js", ["npm:@angular/core/bundles/core.umd.js", "npm:@angular/http/bundles/http.umd.js", "rxjs/add/operator/toPromise"], true, function ($__require, exports, module) {
    /// <reference path="../../typings/globals/lodash/index.d.ts" />
    /// <reference path="../../typings-custom/pretty-print/index.d.ts" />
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var http_1 = $__require("npm:@angular/http/bundles/http.umd.js");
    $__require("rxjs/add/operator/toPromise");
    var CodeExampleComponent = function () {
        function CodeExampleComponent(http, element, renderer) {
            this.http = http;
            this.element = element;
            this.renderer = renderer;
        }
        CodeExampleComponent.prototype.ngOnInit = function () {
            this.resolveContent();
        };
        CodeExampleComponent.prototype.getContentPromise = function () {
            var _this = this;
            return this.http.get(this.contentUrl).map(function (result) {
                return result.text();
            }).toPromise().catch(function () {
                return Promise.resolve('Could not load content at "' + _this.contentUrl + '"');
            });
        };
        CodeExampleComponent.prototype.resolveContent = function () {
            var _this = this;
            this.getContentPromise().then(function (content) {
                content = _.escape(content);
                var preElement = _this.element.nativeElement.children[0];
                preElement.innerHTML = content;
                if (_this.language) {
                    _this.renderer.setElementClass(preElement, _this.language, true);
                }
                prettyPrint(null, _this.element.nativeElement);
            });
        };
        return CodeExampleComponent;
    }();
    __decorate([core_1.Input('content-url'), __metadata("design:type", String)], CodeExampleComponent.prototype, "contentUrl", void 0);
    __decorate([core_1.Input('lang'), __metadata("design:type", String)], CodeExampleComponent.prototype, "language", void 0);
    CodeExampleComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'code-example',
        templateUrl: './CodeView.component.html'
    }), __metadata("design:paramtypes", [http_1.Http, core_1.ElementRef, core_1.Renderer])], CodeExampleComponent);
    exports.CodeExampleComponent = CodeExampleComponent;
    

    return module.exports;
});
System.registerDynamic("app/Basics/BasicExample.component.js", ["npm:@angular/core/bundles/core.umd.js", "app/MockData/Person.class.js"], true, function ($__require, exports, module) {
    /// <reference path="./../../typings/globals/chance/index.d.ts" />
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var Person_class_1 = $__require("app/MockData/Person.class.js");
    var BasicExampleComponent = function () {
        function BasicExampleComponent() {
            this.allPeople = [];
            var count = chance.natural({ min: 50, max: 100 });
            for (var i = 0; i < count; i++) {
                this.allPeople.push(Person_class_1.Person.create());
            }
        }
        return BasicExampleComponent;
    }();
    BasicExampleComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'basic-sample',
        templateUrl: './BasicExample.component.html'
    }), __metadata("design:paramtypes", [])], BasicExampleComponent);
    exports.BasicExampleComponent = BasicExampleComponent;
    

    return module.exports;
});
System.registerDynamic("app/Sorting/SortingExample.component.js", ["npm:@angular/core/bundles/core.umd.js", "app/MockData/Person.class.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var Person_class_1 = $__require("app/MockData/Person.class.js");
    var SortingExampleComponent = function () {
        function SortingExampleComponent() {
            this.allPeople = [];
            for (var i = 0; i < 6; i++) {
                this.allPeople.push(Person_class_1.Person.create());
            }
        }
        return SortingExampleComponent;
    }();
    SortingExampleComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'sorting-example',
        templateUrl: './SortingExample.component.html'
    }), __metadata("design:paramtypes", [])], SortingExampleComponent);
    exports.SortingExampleComponent = SortingExampleComponent;
    

    return module.exports;
});
System.registerDynamic("app/MockData/Person.class.js", [], true, function ($__require, exports, module) {
    /// <reference path="./../../typings/globals/chance/index.d.ts" />
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var Person = function () {
        function Person() {}
        Person.create = function () {
            var p = new Person();
            p.firstName = chance.first();
            p.lastName = chance.last();
            p.id = chance.natural({ min: 5000, max: 6000 });
            p.age = chance.age();
            return p;
        };
        return Person;
    }();
    exports.Person = Person;
    

    return module.exports;
});
System.registerDynamic("app/Paging/PagingExample.component.js", ["npm:@angular/core/bundles/core.umd.js", "app/MockData/Person.class.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var Person_class_1 = $__require("app/MockData/Person.class.js");
    var PagingExampleComponent = function () {
        function PagingExampleComponent() {
            this.allPeople = [];
            for (var i = 1; i < 101; i++) {
                var person = Person_class_1.Person.create();
                person.id = i;
                this.allPeople.push(person);
            }
        }
        return PagingExampleComponent;
    }();
    PagingExampleComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'paging-example',
        templateUrl: './PagingExample.component.html'
    }), __metadata("design:paramtypes", [])], PagingExampleComponent);
    exports.PagingExampleComponent = PagingExampleComponent;
    

    return module.exports;
});
System.registerDynamic("app/app.component.js", ["npm:@angular/core/bundles/core.umd.js", "app/Navigation/Navigation.component.js", "app/Navigation/LoadingFrame.component.js", "app/CodeViews/CodeView.component.js", "app/Basics/Basic.component.js", "app/Basics/BasicExample.component.js", "app/Sorting/Sorting.component.js", "app/Sorting/SortingExample.component.js", "app/Paging/Paging.component.js", "app/Paging/PagingExample.component.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var AppComponent = function () {
        function AppComponent() {}
        return AppComponent;
    }();
    AppComponent = __decorate([core_1.Component({
        moduleId: module.id,
        selector: 'my-app',
        templateUrl: './app.component.html'
    }), __metadata("design:paramtypes", [])], AppComponent);
    exports.AppComponent = AppComponent;
    var Navigation_component_1 = $__require("app/Navigation/Navigation.component.js");
    var LoadingFrame_component_1 = $__require("app/Navigation/LoadingFrame.component.js");
    var CodeView_component_1 = $__require("app/CodeViews/CodeView.component.js");
    var Basic_component_1 = $__require("app/Basics/Basic.component.js");
    var BasicExample_component_1 = $__require("app/Basics/BasicExample.component.js");
    var Sorting_component_1 = $__require("app/Sorting/Sorting.component.js");
    var SortingExample_component_1 = $__require("app/Sorting/SortingExample.component.js");
    var Paging_component_1 = $__require("app/Paging/Paging.component.js");
    var PagingExample_component_1 = $__require("app/Paging/PagingExample.component.js");
    exports.Ng2PowerTableComponents = [CodeView_component_1.CodeExampleComponent, Navigation_component_1.NavigationComponent, Basic_component_1.BasicComponent, BasicExample_component_1.BasicExampleComponent, Sorting_component_1.SortingComponent, SortingExample_component_1.SortingExampleComponent, Paging_component_1.PagingComponent, PagingExample_component_1.PagingExampleComponent, AppComponent, LoadingFrame_component_1.LoadingFrameComponent];
    

    return module.exports;
});
System.registerDynamic("app/Basics/Basic.component.js", ["npm:@angular/core/bundles/core.umd.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var BasicComponent = function () {
        function BasicComponent() {}
        return BasicComponent;
    }();
    BasicComponent = __decorate([core_1.Component({
        moduleId: module.id,
        templateUrl: './Basic.component.html'
    }), __metadata("design:paramtypes", [])], BasicComponent);
    exports.BasicComponent = BasicComponent;
    

    return module.exports;
});
System.registerDynamic("app/Sorting/Sorting.component.js", ["npm:@angular/core/bundles/core.umd.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var SortingComponent = function () {
        function SortingComponent() {}
        SortingComponent.prototype.ngOnInit = function () {};
        return SortingComponent;
    }();
    SortingComponent = __decorate([core_1.Component({
        moduleId: module.id,
        templateUrl: './Sorting.component.html'
    }), __metadata("design:paramtypes", [])], SortingComponent);
    exports.SortingComponent = SortingComponent;
    

    return module.exports;
});
System.registerDynamic("app/Paging/Paging.component.js", ["npm:@angular/core/bundles/core.umd.js"], true, function ($__require, exports, module) {
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
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var PagingComponent = function () {
        function PagingComponent() {}
        PagingComponent.prototype.ngOnInit = function () {};
        return PagingComponent;
    }();
    PagingComponent = __decorate([core_1.Component({
        moduleId: module.id,
        templateUrl: './Paging.component.html'
    }), __metadata("design:paramtypes", [])], PagingComponent);
    exports.PagingComponent = PagingComponent;
    

    return module.exports;
});
System.registerDynamic("app/app.routes.js", ["npm:@angular/router/bundles/router.umd.js", "app/Basics/Basic.component.js", "app/Sorting/Sorting.component.js", "app/Paging/Paging.component.js"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var router_1 = $__require("npm:@angular/router/bundles/router.umd.js");
    var Basic_component_1 = $__require("app/Basics/Basic.component.js");
    var Sorting_component_1 = $__require("app/Sorting/Sorting.component.js");
    var Paging_component_1 = $__require("app/Paging/Paging.component.js");
    var appRoutes = [{ path: '', component: Basic_component_1.BasicComponent }, { path: 'sorting', component: Sorting_component_1.SortingComponent }, { path: 'paging', component: Paging_component_1.PagingComponent }];
    exports.appRoutingProviders = [];
    exports.routing = router_1.RouterModule.forRoot(appRoutes);
    

    return module.exports;
});
System.registerDynamic("app/app.module.js", ["npm:@angular/core/bundles/core.umd.js", "npm:@angular/platform-browser/bundles/platform-browser.umd.js", "npm:@angular/http/bundles/http.umd.js", "ng2-bootstrap/ng2-bootstrap", "ng2-power-table/ng2-power-table", "app/app.component.js", "app/app.routes.js"], true, function ($__require, exports, module) {
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
    // angular stuff
    var core_1 = $__require("npm:@angular/core/bundles/core.umd.js");
    var platform_browser_1 = $__require("npm:@angular/platform-browser/bundles/platform-browser.umd.js");
    var http_1 = $__require("npm:@angular/http/bundles/http.umd.js");
    // other dependencies
    var ng2_bootstrap_1 = $__require("ng2-bootstrap/ng2-bootstrap");
    /*
      ======== IMPORT PowerTableModule
    */
    var ng2_power_table_1 = $__require("ng2-power-table/ng2-power-table");
    // components for this app
    var app_component_1 = $__require("app/app.component.js");
    // routing
    var app_routes_1 = $__require("app/app.routes.js");
    core_1.enableProdMode();
    var Ng2PowerTableDocumentationModule = function () {
        function Ng2PowerTableDocumentationModule() {}
        return Ng2PowerTableDocumentationModule;
    }();
    Ng2PowerTableDocumentationModule = __decorate([core_1.NgModule({
        /*
          ======== INCLUDE PowerTableModule in imports of your module
        */
        imports: [platform_browser_1.BrowserModule, ng2_power_table_1.PowerTableModule, app_routes_1.routing, ng2_bootstrap_1.Ng2BootstrapModule, http_1.HttpModule],
        declarations: [app_component_1.Ng2PowerTableComponents],
        bootstrap: [app_component_1.AppComponent],
        providers: [app_routes_1.appRoutingProviders]
    }), __metadata("design:paramtypes", [])], Ng2PowerTableDocumentationModule);
    exports.Ng2PowerTableDocumentationModule = Ng2PowerTableDocumentationModule;
    

    return module.exports;
});
System.registerDynamic("app/main.js", ["npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js", "app/app.module.js"], true, function ($__require, exports, module) {
  "use strict";

  var define,
      global = this || self,
      GLOBAL = global;
  var platform_browser_dynamic_1 = $__require("npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js");
  var app_module_1 = $__require("app/app.module.js");
  platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.Ng2PowerTableDocumentationModule);
  

  return module.exports;
});
//# sourceMappingURL=app.js.map