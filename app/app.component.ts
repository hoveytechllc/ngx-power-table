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
import { BasicUsageComponent } from './BasicUsage/BasicUsage.component';
import { BasicSampleComponent } from './BasicUsage/BasicSample.component';
import { SortingComponent } from './Sorting/Sorting.component';

import { CodeExampleComponent } from './BasicUsage/CodeViews/CodeView.component';

export var Ng2PowerTableComponents : Array<any> = [
    CodeExampleComponent,

    NavigationComponent,
    BasicUsageComponent,
    BasicSampleComponent,
    SortingComponent,
    AppComponent,
    LoadingFrameComponent
];
