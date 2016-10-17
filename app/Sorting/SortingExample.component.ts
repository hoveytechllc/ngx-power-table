
import { Component, OnInit } from '@angular/core';
import { Person } from './../MockData/Person.class';

@Component({
    moduleId: module.id,
    selector: 'sorting-example',
    templateUrl: './SortingExample.component.html'
})
export class SortingExampleComponent {
   public allPeople: Array<Person>;
    public people: Array<Person>;

    constructor() {
        this.allPeople = [];

        for (var i = 0;i< 6;i++){
            this.allPeople.push(Person.create());
        }
    }
}