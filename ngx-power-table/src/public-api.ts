/*
 * Public API Surface of ngx-power-table
 */
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

export { PowerTableModule } from './ngx-power-table.module'
