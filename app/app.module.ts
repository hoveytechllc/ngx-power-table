import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PowerTableModule, TableDirective, SortDirective } from 'ng2-power-table';

@NgModule({
  imports: [ BrowserModule, PowerTableModule  ],
  declarations: [AppComponent ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
