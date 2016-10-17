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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var component_factory_1 = require("./component.factory");
describe('Sanity check', function () {
    it('should run a passing test', function () {
        expect(true).toEqual(true, 'should pass');
    });
});
var TestParentDirective = (function () {
    function TestParentDirective() {
    }
    TestParentDirective.prototype.ngOnInit = function () { };
    return TestParentDirective;
}());
TestParentDirective = __decorate([
    core_1.Directive({
        selector: '[parent-attr]'
    }),
    __metadata("design:paramtypes", [])
], TestParentDirective);
exports.TestParentDirective = TestParentDirective;
var TestChildComponent = (function () {
    function TestChildComponent(dependency) {
        this.dependency = dependency;
    }
    return TestChildComponent;
}());
TestChildComponent = __decorate([
    core_1.Component({
        selector: 'child-comp',
        template: '<div></div>'
    }),
    __param(0, core_1.Host()),
    __metadata("design:paramtypes", [TestParentDirective])
], TestChildComponent);
exports.TestChildComponent = TestChildComponent;
describe('Component directive relationships', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({ declarations: [component_factory_1.TestComp, TestChildComponent, TestParentDirective] }); });
    it('child component should be able to resolve parent directive', function () {
        var template = "<div parent-attr=\"\">\n                      <child-comp></child-comp>\n                  </div>";
        var fix = component_factory_1.createComponentFixture(template);
    });
});
//# sourceMappingURL=Sanity.spec.js.map