import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasicUsageComponent } from './BasicUsage/BasicUsage.component';
import { SortingComponent } from './Sorting/Sorting.component';

const appRoutes: Routes = [
  { path: '', component: BasicUsageComponent },
  { path: 'sorting', component: SortingComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);