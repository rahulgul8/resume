import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  @Input('appFocus') isFocused: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (this.isFocused) {
      this.hostElement.nativeElement.focus();
    }
  }

}
