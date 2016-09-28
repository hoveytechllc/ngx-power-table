import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PowerTableModule, TableDirective, SortDirective } from 'ng2-power-table';
import { NavigationComponent } from './Navigation/Navigation.component';

import { BasicUsageComponent } from './BasicUsage/BasicUsage.component';
import { BasicSampleComponent } from './BasicUsage/BasicSample.component';
import { SortingComponent } from './Sorting/Sorting.component';

import { routing, appRoutingProviders } from './app.routes';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { HttpModule, JsonpModule } from '@angular/http';

import { CodeExampleComponent } from './BasicUsage/CodeViews/CodeView.component';

@NgModule({
  imports: [ BrowserModule, PowerTableModule, routing , Ng2BootstrapModule, HttpModule, JsonpModule ],
  declarations: [AppComponent, NavigationComponent, BasicUsageComponent, SortingComponent, CodeExampleComponent, BasicSampleComponent ],
  bootstrap: [AppComponent ],
  providers: [ appRoutingProviders ]
})
export class AppModule { }
