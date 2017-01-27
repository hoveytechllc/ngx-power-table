import { Component, ElementRef, Renderer } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {

}

import { NavigationComponent } from './Navigation/Navigation.component';
import { LoadingFrameComponent } from './Navigation/LoadingFrame.component';
import { CodeExampleComponent } from './CodeViews/CodeView.component';

import { BasicComponent } from './Basics/Basic.component';
import { BasicExampleComponent } from './Basics/BasicExample.component';
import { SortingComponent } from './Sorting/Sorting.component';
import { SortingExampleComponent } from './Sorting/SortingExample.component';
import { PagingComponent } from './Paging/Paging.component';
import { PagingExampleComponent } from './Paging/PagingExample.component';
import { ServerComponent } from './Server/Server.component';
import { ServerExampleComponent } from './Server/ServerExample.component';


export var Ng2PowerTableComponents : Array<any> = [
    CodeExampleComponent,
    NavigationComponent,

    BasicComponent,
    BasicExampleComponent,
    SortingComponent,
    SortingExampleComponent,
    PagingComponent,
    PagingExampleComponent,
    ServerComponent,
    ServerExampleComponent,

    AppComponent,
    LoadingFrameComponent
];
