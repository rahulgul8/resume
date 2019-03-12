import { Directive, Input, ElementRef, ComponentRef, HostBinding, HostListener, OnChanges, ViewContainerRef, TemplateRef, EmbeddedViewRef, EventEmitter, Output, Optional, Self, Host } from '@angular/core';
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

  @Output('add')
  addEvent: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @Output('remove')
  removeEvent: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @Input()
  popoverMode: 'hover' | 'click' = 'click';

  popoverComp: ComponentRef<PopoverComponent>;

  constructor(private container: ViewContainerRef, private dom: DomService, private element: ElementRef) { }

  ngOnInit(): void {
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

  @HostListener('disabledChange', ['$event'])
  stateChange(event) {
    if (!event) {
      this.addPopover();
    }
    else {
      this.removePopover();
    }
  }

  

  // // @HostListener('click')
  // focusin() {
  //   { this.addPopover(); }
  // }

  // // @HostListener('focusout', ['$event'])
  // focusout(event) {
  //   if (!this.element.nativeElement.parentElement.contains(event.relatedTarget)) {
  //     this.removePopover();
  //   }
  // }


  addPopover() {
    if (this.popoverComp == undefined) {
      setTimeout(() => {
        this.popoverComp = this.dom.appendComponentToBody(PopoverComponent, 'data',
          {
            element: this.element.nativeElement,
            placement: 'top'
          });

        this.popoverComp.instance.addEvent.subscribe(() => {
          this.addEvent.emit(this.element);
        });


        this.popoverComp.instance.deleteEvent.subscribe(() => {
          this.container.clear();
          this.container.remove();
          this.removePopover();
          this.removeEvent.emit(this.element);
        });
      });
    }
  }


  removePopover() {
    setTimeout(() => {
      if (this.popoverComp) {
        this.dom.removeComponentFromBody(this.popoverComp);
        this.popoverComp = undefined;
      }
    });
  }


}
