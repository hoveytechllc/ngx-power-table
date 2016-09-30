import { EventEmitter } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { TestComp, createComponent, createComponentFixture } from './component.factory';

import { IDataPipeService } from "./../../src/Pipe/IDataPipeService.interface";
import { DefaultDataPipeService } from "./../../src/Pipe/DefaultDataPipeService.class";
import { SortOrder } from "./../../src/Sort/SortOrder.enum";
import { ITableState } from "./../../src/TableState/ITableState.interface";
import { DefaultTableState } from "./../../src/TableState/DefaultTableState.class";
import { IConfiguration } from "./../../src/Configuration/IConfiguration.interface";

describe('DefaultDataPipeService tests', function () {
  var sut: IDataPipeService;

  beforeEach(() => {
    sut = new DefaultDataPipeService();
  });

  it('pipe should not sort if predicate or order not provided', () => {
    var state = new DefaultTableState();
    state.sort.order = SortOrder.NotSet;
    state.sort.predicate = "id";

    var config = {};

    var data = [
      { id: 3, name: "David" },
      { id: 2, name: "Bill" },
      { id: 1, name: "Stacey" }
    ];

    var result = sut.pipe(data, state, <IConfiguration>config);

    expect(data[0].id).toBe(3, "expected data to not be modified");
    expect(data[1].id).toBe(2, "expected data to not be modified");
    expect(data[2].id).toBe(1, "expected data to not be modified");
    expect(result[0].id).toBe(3, "expected result to be sorted");
    expect(result[1].id).toBe(2, "expected result to be sorted");
    expect(result[2].id).toBe(1, "expected result to be sorted");
    
  });

  it('pipe should not modify original array', () => {
    var state = new DefaultTableState();
    state.sort.order = SortOrder.Ascending;
    state.sort.predicate = "id";

    var config = {};

    var data = [
      { id: 3, name: "David" },
      { id: 2, name: "Bill" },
      { id: 1, name: "Stacey" }
    ];

    var result = sut.pipe(data, state, <IConfiguration>config);

    expect(data[0].id).toBe(3, "expected data to not be modified");
    expect(data[1].id).toBe(2, "expected data to not be modified");
    expect(data[2].id).toBe(1, "expected data to not be modified");
    expect(result[0].id).toBe(1, "expected result to be sorted");
    expect(result[1].id).toBe(2, "expected result to be sorted");
    expect(result[2].id).toBe(3, "expected result to be sorted");

  });
});
