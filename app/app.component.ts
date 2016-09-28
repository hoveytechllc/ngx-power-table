import { Component } from '@angular/core';
import { ITableState, TableDirective } from 'ng2-power-table';
import { NavigationComponent} from "./Navigation/Navigation.component";

class Customer {
    constructor(public id: number,
        public name: string) {

    }
}

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html',
    viewProviders:[NavigationComponent]
})
export class AppComponent {
    public allCustomers: Array<Customer>;
    public customers: Array<Customer>;
    public tableState: ITableState;

    constructor() {
        this.allCustomers = [
            new Customer(1, "ABC Tire"),
            new Customer(2, "XYZ Center")
        ];
    }

    showAlert()
    {
        alert('hello');
    }
}
