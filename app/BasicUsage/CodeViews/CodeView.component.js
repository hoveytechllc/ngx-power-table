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
var http_1 = require("@angular/http");
require('rxjs/add/operator/toPromise');
var CodeExampleComponent = (function () {
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
        return this.http.get(this.contentUrl)
            .map(function (result) {
            return result.text();
        })
            .toPromise()
            .catch(function () {
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
    __decorate([
        core_1.Input('content-url'), 
        __metadata('design:type', String)
    ], CodeExampleComponent.prototype, "contentUrl", void 0);
    __decorate([
        core_1.Input('lang'), 
        __metadata('design:type', String)
    ], CodeExampleComponent.prototype, "language", void 0);
    CodeExampleComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'code-example',
            templateUrl: './CodeView.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, core_1.ElementRef, core_1.Renderer])
    ], CodeExampleComponent);
    return CodeExampleComponent;
}());
exports.CodeExampleComponent = CodeExampleComponent;
//# sourceMappingURL=CodeView.component.js.map