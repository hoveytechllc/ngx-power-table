import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigurationProvider } from './Configuration/ConfigurationProvider.class';
import { PaginationComponent } from './Pagination/Pagination.component';
import { DefaultDataPipeService } from './Pipe/DefaultDataPipeService.class';
import { SortDirective } from './Sort/Sort.directive';
import { TableDirective } from './Table/Table.directive';

@NgModule({
  exports: [
    TableDirective,
    SortDirective,
    PaginationComponent
  ],
  declarations: [
    TableDirective,
    SortDirective,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DefaultDataPipeService,
    ConfigurationProvider
  ]
})
export class PowerTableModule { }

