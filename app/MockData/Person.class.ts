/// <reference path="./../typings/chance.d.ts" />

export class Person{
    public id: number;
    public firstName: string;
    public lastName: string;
    public age: number;

    public static create(): Person{
        var p = new Person();

        p.firstName = chance.first();
        p.lastName = chance.last();
        p.id = chance.natural({ min: 5000, max: 6000 });
        p.age = chance.age();

        return p;
    }
}