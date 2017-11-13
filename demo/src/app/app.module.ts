// angular stuff
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// other dependencies
import { TabsModule } from '../assets/ngx-bootstrap';

/*
  ======== IMPORT PowerTableModule
*/
import { PowerTableModule } from 'ng2-power-table';

// components for this app
import { AppComponent, Ng2PowerTableComponents } from './app.component';

// routing
import { routing, appRoutingProviders } from './app.routes';


@NgModule({
  /*
    ======== INCLUDE PowerTableModule in imports of your module    
  */
  imports: [
    BrowserModule, 
    PowerTableModule, 
    routing, 
    TabsModule.forRoot(), 
    HttpModule
  ],
  declarations: [
    Ng2PowerTableComponents
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    appRoutingProviders
  ]
})
export class Ng2PowerTableDocumentationModule { 

}
