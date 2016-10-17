import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import components / directives for the module
import { TableDirective } from './src/Table/Table.directive';

import { SortDirective } from './src/Sort/Sort.directive';

import { DefaultDataPipeService } from './src/Pipe/DefaultDataPipeService.class';

import { PaginationComponent } from './src/Pagination/Pagination.component';

import { ConfigurationProvider } from './src/Configuration/ConfigurationProvider.class';

// export for any consumers of module
export { TableDirective } from './src/Table/Table.directive';

export { SortOrder } from './src/Sort/SortOrder.enum';
export { SortDirective } from './src/Sort/Sort.directive';

export { ITableState } from './src/TableState/ITableState.interface';
export { DefaultTableState, DefaultTableStatePagination, DefaultTableStateSearch, DefaultTableStateSort } from './src/TableState/DefaultTableState.class';

export { DefaultDataPipeService } from './src/Pipe/DefaultDataPipeService.class';
export { IDataPipeService } from './src/Pipe/IDataPipeService.interface';

export { PaginationComponent } from './src/Pagination/Pagination.component';

export { ConfigurationProvider } from './src/Configuration/ConfigurationProvider.class';
export { IConfiguration } from './src/Configuration/IConfiguration.interface';
export { DefaultConfiguration } from './src/Configuration/DefaultConfiguration.class';

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
