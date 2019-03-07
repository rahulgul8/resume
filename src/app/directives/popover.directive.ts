import { Directive, Input, ElementRef, ComponentRef, HostBinding, HostListener, OnChanges, ViewContainerRef } from '@angular/core';
import { DomService } from '../services/dom.service';
import { PopoverComponent } from '../components/popover/popover.component';
import { defaultOptions } from '../modules/tooltip/options';

@Directive({
  selector: '[popover]'
})
export class PopoverDirective implements OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['popover']) {
      if (changes['popover'].currentValue === true || changes['popover'].currentValue == 'true') {
        this.addPopover();
      }
      else {
        this.removePopover();
      }
    }
  }

  @Input()
  mode: 'hover' | 'click' = 'click';

  popoverComp: ComponentRef<PopoverComponent>;

  constructor(private container: ViewContainerRef, private dom: DomService, private element: ElementRef) { }

  @Input()
  popover: boolean = false;

  @HostListener('mouseover')
  mouseOver() {
    if (this.mode == 'hover') { this.addPopover(); }
  }

  @HostListener('mouseout')
  mouseout() {
    if (this.mode == 'hover') { this.removePopover(); }
  }

  addPopover() {
    setTimeout(() => {
      this.popoverComp = this.dom.appendComponentToBody(PopoverComponent, 'data',
        {
          element: this.element.nativeElement,
          options: defaultOptions
        });
    });
  }

  removePopover() {
    setTimeout(() => {
      if (this.popoverComp)
        this.dom.removeComponentFromBody(this.popoverComp);
    });
  }


}
