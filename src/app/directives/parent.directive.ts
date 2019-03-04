import { Renderer2, ElementRef } from '@angular/core';

export class ParentDirective {
    
    constructor(renderer: Renderer2, hostElement: ElementRef, classes: string[]) {
        for (let classs of classes) {
            renderer.addClass(hostElement.nativeElement, classs);
        }
    }
}