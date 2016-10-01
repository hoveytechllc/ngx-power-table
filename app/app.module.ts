// angular stuff
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// other dependencies
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

/*
  ======== IMPORT PowerTableModule
*/
import { PowerTableModule } from 'ng2-power-table';

// components for this app
import { AppComponent, Ng2PowerTableComponents } from './app.component';

// routing
import { routing, appRoutingProviders } from './app.routes';

enableProdMode();

@NgModule({
  /*
    ======== INCLUDE PowerTableModule in imports of your module    
  */
  imports: [BrowserModule, PowerTableModule, routing, Ng2BootstrapModule, HttpModule],
  declarations: [Ng2PowerTableComponents],
  bootstrap: [AppComponent],
  providers: [appRoutingProviders]
})
export class Ng2PowerTableDocumentationModule { 

}
