
import { Component, OnInit } from '@angular/core';
import { Person } from './../MockData/Person.class';
import { IConfiguration, DefaultConfiguration } from 'ng2-power-table';

@Component({
    moduleId: module.id,
    selector: 'customize-example',
    templateUrl: './CustomizeExample.component.html',
    styleUrls: ['./CustomizeExample.css']
})
export class CustomizeExampleComponent {
    public allPeople: Array<Person>;
    public people: Array<Person>;
    public configuration: IConfiguration;

    constructor() {
        this.configuration = DefaultConfiguration.create();
        this.configuration.ascendingCssClass = 'pt-sort-asc-custom';
        this.configuration.descendingCssClass = 'pt-sort-desc-custom';

        this.allPeople = [];

        for (var i = 1; i < 101; i++) {
            var person = Person.create();
            person.id = i;
            this.allPeople.push(person);
        }
    }
}