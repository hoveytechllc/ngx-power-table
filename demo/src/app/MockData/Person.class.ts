
import * as chance from "../../assets/chance";

export class Person {
    public id: number;
    public firstName: string;
    public lastName: string;
    public age: number;

    public static create(): Person{
        var p = new Person();
        var c = chance();

        p.firstName = c.first();
        p.lastName = c.last();
        p.id = c.natural({ min: 5000, max: 6000 });
        p.age = c.age();

        return p;
    }
}