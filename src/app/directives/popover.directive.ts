import { Directive, Input, ElementRef, ComponentRef, HostBinding, HostListener, OnChanges, ViewContainerRef, TemplateRef } from '@angular/core';
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
  popoverMode: 'hover' | 'click' = 'click';

  popoverComp: ComponentRef<PopoverComponent>;

  constructor(private container: ViewContainerRef, private template: TemplateRef<any>, private dom: DomService, private element: ElementRef) { }

  ngOnInit(): void {
    this.container.createEmbeddedView(this.template);
  }

  @Input()
  popover: boolean = false;

  @HostListener('mouseover')
  mouseOver() {
    if (this.popoverMode == 'hover') { this.addPopover(); }
  }

  @HostListener('mouseout')
  mouseout() {
    if (this.popoverMode == 'hover') { this.removePopover(); }
  }

  addPopover() {
    setTimeout(() => {
      this.popoverComp = this.dom.appendComponentToBody(PopoverComponent, 'data',
        {
          element: this.template.elementRef.nativeElement.parentElement,
          placement: 'top'
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
