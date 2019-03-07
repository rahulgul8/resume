import { Component, OnInit, Output, ElementRef, HostListener, EventEmitter, HostBinding } from '@angular/core';
import { DomService } from 'src/app/services/dom.service';
import { ComponentRef } from '@angular/core/src/render3';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {


  @HostBinding('style.top') hostStyleTop: string;
  @HostBinding('style.left') hostStyleLeft: string;

  data: any;
  tooltipOffset: any = 10;

  ngOnInit(): void {
    this.setPosition();
  }

  private parentNode: any;

  closeEventEmmit: EventEmitter<string> = new EventEmitter();

  get placement() {
    return this.data.options.placement;
  }

  get element() {
    return this.data.element;
  }

  get elementPosition() {
    return this.data.element.getBoundingClientRect();
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    // this.parentNode = this.element.nativeElement.parentNode;
  }

  setPosition(): void {
    debugger;
    const isSvg = this.element instanceof SVGElement;
    const tooltip = this.elementRef.nativeElement;

    const elementHeight = isSvg ? this.element.getBBox().height : this.element.offsetHeight;
    const elementWidth = isSvg ? this.element.getBBox().width : this.element.offsetWidth;
    const tooltipHeight = tooltip.clientHeight;
    const tooltipWidth = tooltip.clientWidth;
    const scrollY = window.pageYOffset;

    if (this.placement === 'top') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) - (tooltipHeight + this.tooltipOffset) + 'px';
    }

    if (this.placement === 'bottom') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) + elementHeight + this.tooltipOffset + 'px';
    }

    if (this.placement === 'top' || this.placement === 'bottom') {
      this.hostStyleLeft = (this.elementPosition.left + elementWidth / 2) - tooltipWidth / 2 + 'px';
    }

    if (this.placement === 'left') {
      this.hostStyleLeft = this.elementPosition.left - tooltipWidth - this.tooltipOffset + 'px';
    }

    if (this.placement === 'right') {
      this.hostStyleLeft = this.elementPosition.left + elementWidth + this.tooltipOffset + 'px';
    }

    if (this.placement === 'left' || this.placement === 'right') {
      this.hostStyleTop = (this.elementPosition.top + scrollY) + elementHeight / 2 - tooltip.clientHeight / 2 + 'px';
    }
  }

  onClickOutside(event) {
    this.closeEventEmmit.emit('close');
  }


  @HostListener('window:resize', ['$event'])
  resize(event) {
    if (this.element && this.elementRef) {
      this.setPosition();
    }
  }

}
