import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ParentDirective } from './parent.directive';

@Directive({
  selector: '[subheading]'
})
export class SubHeadingDirective extends ParentDirective {


  constructor(private renderer: Renderer2, hostElement: ElementRef) {
    super(renderer, hostElement, ['subheading'])
  }
}
