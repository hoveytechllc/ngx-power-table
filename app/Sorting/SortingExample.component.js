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
var Person_class_1 = require("./../MockData/Person.class");
var SortingExampleComponent = (function () {
    function SortingExampleComponent() {
        this.allPeople = [];
        for (var i = 0; i < 6; i++) {
            this.allPeople.push(Person_class_1.Person.create());
        }
    }
    return SortingExampleComponent;
}());
SortingExampleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sorting-example',
        templateUrl: './SortingExample.component.html'
    }),
    __metadata("design:paramtypes", [])
], SortingExampleComponent);
exports.SortingExampleComponent = SortingExampleComponent;
//# sourceMappingURL=SortingExample.component.js.map