/// <reference path="./../../../typings/globals/lodash/index.d.ts" />

import { Component, OnInit, Input, ElementRef, Renderer } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'code-example',
    templateUrl: './CodeView.component.html'
})
export class CodeExampleComponent implements OnInit {

    @Input('content-url')
    public contentUrl: string;

    @Input('lang')
    public language: string;

    constructor(private http: Http,
        private element: ElementRef,
        private renderer: Renderer) {

    }

    ngOnInit() {
        this.resolveContent();

        
    }

    private getContentPromise(): Promise<string> {
        return this.http.get(this.contentUrl)
            .map(result => {
                return result.text();
            })
            .toPromise()
            .catch(() => {
                return Promise.resolve('Could not load content at "' + this.contentUrl + '"')
            });
    }

    private resolveContent() {
        this.getContentPromise().then(content => {
            content = _.escape(content);
           
            var preElement = this.element.nativeElement.children[0];
            preElement.innerHTML = content;
            
if (this.language){
    this.renderer.setElementClass(preElement, this.language, true);
}

            prettyPrint(null, this.element.nativeElement);
        });
    }
}