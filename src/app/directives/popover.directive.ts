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
  addEvent: EventEmitter<ElementRef> = new EventEmitter<any>();

  @Output('selfdestroy')
  selfDestroy: EventEmitter<ElementRef> = new EventEmitter<any>();

  @Output('remove')
  removeEvent: EventEmitter<ElementRef> = new EventEmitter<any>();

  @Input()
  popoverMode: 'hover' | 'click' = 'click';

  popoverComp: ComponentRef<PopoverComponent>;

  constructor(private container: ViewContainerRef, private dom: DomService, private element: ElementRef) {

  }

  ngOnInit(): void {
  }

  @Input()
  popover: boolean = false;

  @Input()
  identifier: any = '';

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
      setTimeout(() => {
        this.removePopover();
      });

    }
    if (this.popoverComp) {
      this.popoverComp.instance.setPosition();
    }
  }


  addPopover() {
    if (this.popoverComp == undefined) {
      setTimeout(() => {
        this.popoverComp = this.dom.appendChild(this.container, PopoverComponent, 'data',
          {
            element: this.element.nativeElement,
            placement: 'top'
          });

        this.popoverComp.instance.addEvent.subscribe(() => {
          this.addEvent.emit(this.identifier);
        });


        this.popoverComp.instance.deleteEvent.subscribe(() => {
          this.removePopover();
          this.removeEvent.emit(this.identifier);
          this.selfDestroy.emit(this.identifier);
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
