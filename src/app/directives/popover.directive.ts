import { Directive, Input, ElementRef, ComponentRef, HostBinding, HostListener, OnChanges, ViewContainerRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
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
    this.addedRef = this.container.createEmbeddedView(this.template);
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
    debugger;
    setTimeout(() => {
      this.popoverComp = this.dom.appendComponentToBody(PopoverComponent, 'data',
        {
          element: this.template.elementRef.nativeElement.parentElement,
          placement: 'top'
        });

      this.popoverComp.instance.addEvent.subscribe(() => {
        this.addedRef = this.template.createEmbeddedView({t:'t'});
        this.container.insert(this.addedRef);
      });
      this.popoverComp.instance.deleteEvent.subscribe(() => {
        this.addedRef.destroy();
        this.removePopover();
      });
    });
  }

  addedRef: EmbeddedViewRef<any>;

  removePopover() {
    setTimeout(() => {
      if (this.popoverComp)
        this.dom.removeComponentFromBody(this.popoverComp);
    });
  }


}
