"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var TestComp = (function () {
    function TestComp() {
    }
    return TestComp;
}());
TestComp = __decorate([
    core_1.Component({ selector: 'root', template: '' })
], TestComp);
exports.TestComp = TestComp;
/*
If using templateUrl for any components included in TestBed module, TestComp or any
components that we are overriding template, need to setup before compileComponents is called.
 */
function createComponentFixtureAfterSetup(comp) {
    var fix = testing_1.TestBed.createComponent(comp);
    fix.detectChanges();
    return fix;
}
exports.createComponentFixtureAfterSetup = createComponentFixtureAfterSetup;
function SetupComponentFixture(template, providers, comp) {
    if (providers === void 0) { providers = null; }
    if (comp === void 0) { comp = null; }
    if (!comp) {
        comp = TestComp;
    }
    testing_1.TestBed.overrideComponent(comp, { set: { template: template } });
    if (providers && providers.length) {
        testing_1.TestBed.overrideComponent(comp, { add: { providers: providers } });
    }
}
exports.SetupComponentFixture = SetupComponentFixture;
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