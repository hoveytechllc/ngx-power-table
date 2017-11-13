import { Component, ElementRef, Renderer } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'loading-frame-handler',
    templateUrl: './LoadingFrame.component.html'
})
export class LoadingFrameComponent {

    constructor(private renderer: Renderer,
        private elementRef: ElementRef) {

        var wrapper = document.getElementById('wrapper');
        if (!wrapper)
            return;
        var elements = wrapper.getElementsByClassName('loading-frame');
        if (elements && elements[0]) {
            var loadingFrame = elements[0];
            loadingFrame.classList.add('fadeOut');
            loadingFrame.classList.add('animated');

            setTimeout(() => {
                wrapper.removeChild(loadingFrame);
            }, 1000);
        }
    }

}
