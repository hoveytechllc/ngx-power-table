import { TestObject } from '../TestHelpers/TestObject.class';
import { Component } from '@angular/core';

import { ITableState } from './../../src/TableState/ITableState.interface';
import { IConfiguration } from './../../src/Configuration/IConfiguration.interface';
import { IDefaultTableState } from './../../src/TableState/IDefaultTableState.interface';
import { DefaultTableState } from './../../src/TableState/DefaultTableState.class';

@Component({
    selector: 'my-test-component',
    template: "<div></div>"
})
export class TestTableComponent {
    public originalData: Array<TestObject>;
    public displayData: Array<TestObject>;
    public tableState: ITableState;
    public tableConfiguration: IConfiguration;

    /**
     *
     */
    constructor() {
        this.originalData = new Array<TestObject>();
        this.displayData = new Array<TestObject>();
    }
}

@Component({
    selector: 'my-test-component',
    template: "<div></div>"
})
export class TableWithCustomDataPipeFunction {
    public tableState: CustomTableState = new CustomTableState();
    public displayArray: Array<TestObject>;
    public pipeCount: number = 0;

    public pipe(tableState: IDefaultTableState, config: IConfiguration): void {
        var self = this;
        this.pipeCount++;

        setTimeout(function () {
            tableState.updateWithoutEmitting(() => {
                tableState.pagination.totalItemCount = 3;
                self.displayArray = [
                    new TestObject(1, "ng2"),
                    new TestObject(1, "power"),
                    new TestObject(1, "table")
                ];
            });
        });
    }
}

export class CustomTableState extends DefaultTableState {
    public customProperty: string = "custom table state";
}

@Component({
    selector: 'my-test-component',
    template: "<div></div>"
})
export class TableWithCustomStateComponent {
    public originalData: Array<TestObject> = new Array<TestObject>();
    public tableState: CustomTableState = new CustomTableState();

    /**
     *
     */
    constructor() {

    }
}
