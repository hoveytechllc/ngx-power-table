import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import components / directives for the module
import { TableDirective } from './Table/Table.directive';

import { SortDirective } from './Sort/Sort.directive';

import { DefaultDataPipeService } from './Pipe/DefaultDataPipeService.class';

import { PaginationComponent } from './Pagination/Pagination.component';

import { ConfigurationProvider } from './Configuration/ConfigurationProvider.class';

// export for any consumers of module
export { TableDirective } from './Table/Table.directive';

export { SortOrder } from './Sort/SortOrder.enum';
export { SortDirective } from './Sort/Sort.directive';
export { SortState } from './Sort/SortState.class';
export { ISortState } from './Sort/ISortState.interface';

export { ITableState } from './TableState/ITableState.interface';
export { IDefaultTableState, IDefaultTableStatePagination, IDefaultTableStateSort } from './TableState/IDefaultTableState.interface';
export { DefaultTableState } from './TableState/DefaultTableState.class';

export { DefaultDataPipeService } from './Pipe/DefaultDataPipeService.class';
export { IDataPipeService } from './Pipe/IDataPipeService.interface';

export { PaginationComponent } from './Pagination/Pagination.component';
export { PaginationState } from './Pagination/PaginationState.class';
export { IPaginationState } from './Pagination/IPaginationState.interface';

export { ConfigurationProvider } from './Configuration/ConfigurationProvider.class';
export { IConfiguration } from './Configuration/IConfiguration.interface';
export { DefaultConfiguration } from './Configuration/DefaultConfiguration.class';

var declarations =[
        TableDirective,
        SortDirective,
        PaginationComponent
    ]; 

@NgModule({
    exports:declarations,
    declarations: [declarations],
    imports: [CommonModule],
    providers: [DefaultDataPipeService, ConfigurationProvider]
})
export class PowerTableModule {

}
