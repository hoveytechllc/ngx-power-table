import { Component, OnInit } from '@angular/core';
import { ITableState, TableDirective } from 'ng2-power-table';
import { Person } from './../MockData/Person.class';

@Component({
    moduleId: module.id,
    selector: 'basic-sample',
    templateUrl: './BasicSample.component.html'
})
export class BasicSampleComponent {
   public allPeople: Array<Person>;
    public people: Array<Person>;
    public tableState: ITableState;

    constructor() {
        this.allPeople = [];
        var count = chance.natural({ min: 50, max: 100});

        for (var i = 0;i< count;i++){
            this.allPeople.push(Person.create());
        }
    }
}