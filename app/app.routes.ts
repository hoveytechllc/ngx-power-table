import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicComponent } from './Basics/Basic.component';
import { SortingComponent } from './Sorting/Sorting.component';
import { PagingComponent } from './Paging/Paging.component';
import { ServerComponent } from './Server/Server.component';


const appRoutes: Routes = [
  { path: '', component: BasicComponent },
  { path: 'sorting', component: SortingComponent },
  { path: 'paging', component: PagingComponent },
  { path: 'server', component: ServerComponent }

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});