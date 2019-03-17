import { Renderer2, ElementRef, OnInit, Input } from '@angular/core';

export class ParentDirective {

    isEnabled: boolean = true;

    ngOnInit(): void {
        this.implement();
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        this.implement();
    }

    implement(): void {
        if (this.isEnabled) {
            for (let classs of this.addClasses) {
                this.renderer.addClass(this.hostElement.nativeElement, classs);
            }
        } else {
            for (let classs of this.addClasses) {
                this.renderer.removeClass(this.hostElement.nativeElement, classs);
            }
        }
    }

    constructor(public renderer: Renderer2, public hostElement: ElementRef, public addClasses: string[], public removeClasses?: string[]) {
    }


}