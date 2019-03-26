import { Directive, Input, ElementRef, ComponentRef, HostBinding, HostListener, OnChanges, ViewContainerRef, TemplateRef, EmbeddedViewRef, EventEmitter, Output, Optional, Self, Host } from '@angular/core';
import { DomService } from '../services/dom.service';
import { PopoverComponent } from '../components/popover/popover.component';
import { defaultOptions } from '../modules/tooltip/options';
import { isBoolean } from 'util';

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

  @Output('pop')
  popEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  popoverMode: 'hover' | 'click' = 'click';


  @Input()
  popoverTemplates = [];

  popoverComp: ComponentRef<PopoverComponent>;

  constructor(private container: ViewContainerRef, private dom: DomService, private element: ElementRef) {

  }

  ngOnInit(): void {
  }
  @Input()
  isPopoverEnabled = false;

  @Input()
  set popover(popover: boolean) {

  }

  get popover(): boolean {
    return this.isPopoverEnabled;
  }

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



  @HostListener('directiveFocus', ['$event'])
  stateChange(event) {
    if (!event.appDisabled) {
      this.addPopover();
      setTimeout(() => {
        if (this.popoverComp) {
          this.popoverComp.instance.setPosition();
        }
      });
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
    if (this.popoverComp == undefined && this.popover) {
      setTimeout(() => {
        this.popoverComp = this.dom.appendChild(this.container, PopoverComponent, 'data',
          {
            element: this.element.nativeElement,
            placement: 'top',
            templates: this.popoverTemplates
          });

        this.popoverComp.instance.popEvent.subscribe((event) => {
          this.popEvent.emit(event);
          if (event.name == 'delete') {
            this.removePopover();
          }
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
