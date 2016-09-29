import { NgModule, enableProdMode }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { PowerTableModule } from 'ng2-power-table';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }  from './app.component';
import { routing, appRoutingProviders } from './app.routes';

import { CodeExampleComponent } from './BasicUsage/CodeViews/CodeView.component';

import { NavigationComponent } from './Navigation/Navigation.component';
import { BasicUsageComponent } from './BasicUsage/BasicUsage.component';
import { BasicSampleComponent } from './BasicUsage/BasicSample.component';
import { SortingComponent } from './Sorting/Sorting.component';

enableProdMode();

@NgModule({
  imports: [ BrowserModule, PowerTableModule, routing , Ng2BootstrapModule, HttpModule ],
  declarations: [AppComponent, NavigationComponent, BasicUsageComponent, SortingComponent, CodeExampleComponent, BasicSampleComponent ],
  bootstrap: [AppComponent ],
  providers: [ appRoutingProviders ]
})
export class AppModule { }
