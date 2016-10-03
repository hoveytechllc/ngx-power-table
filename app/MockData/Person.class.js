/// <reference path="./../../typings/globals/chance/index.d.ts" />
"use strict";
var Person = (function () {
    function Person() {
    }
    Person.create = function () {
        var p = new Person();
        p.firstName = chance.first();
        p.lastName = chance.last();
        p.id = chance.natural({ min: 5000, max: 6000 });
        p.age = chance.age();
        return p;
    };
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=Person.class.js.map