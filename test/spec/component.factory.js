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
var testing_1 = require('@angular/core/testing');
var TestComp = (function () {
    function TestComp() {
    }
    TestComp = __decorate([
        core_1.Component({ selector: 'root', template: '' }), 
        __metadata('design:paramtypes', [])
    ], TestComp);
    return TestComp;
}());
exports.TestComp = TestComp;
function createComponentFixture(template, providers, comp) {
    if (providers === void 0) { providers = null; }
    if (comp === void 0) { comp = null; }
    if (!comp) {
        comp = TestComp;
    }
    testing_1.TestBed.overrideComponent(comp, { set: { template: template } });
    if (providers && providers.length) {
        testing_1.TestBed.overrideComponent(comp, { add: { providers: providers } });
    }
    var fix = testing_1.TestBed.createComponent(comp);
    fix.detectChanges();
    return fix;
}
exports.createComponentFixture = createComponentFixture;
function createComponent(template, providers, comp) {
    if (providers === void 0) { providers = null; }
    if (comp === void 0) { comp = null; }
    var fixture = createComponentFixture(template, providers, comp);
    //fixture.detectChanges();
    return fixture.debugElement;
}
exports.createComponent = createComponent;
//# sourceMappingURL=component.factory.js.map